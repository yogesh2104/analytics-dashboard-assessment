import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';


interface Metrics {
  total_vehicles: number;
  electric_avg_range: number;
  eligible_vehicles: number;
}

export async function GET() {

  const filePath = path.join(process.cwd(), 'data-to-visualize', 'Electric_Vehicle_Population_Data.csv');
  
  const file = fs.readFileSync(filePath, 'utf8');

  try {
    let metrics: Metrics = {
      total_vehicles: 0,
      electric_avg_range: 0,
      eligible_vehicles: 0,
    };

    Papa.parse(file, {
      header: true,
      complete: (results) => {
        const data = results.data;
        const totalVehicles = data.length;

        const totalRange = data.reduce((sum: number, vehicle: any) => {
          return sum + parseInt(vehicle['Electric Range'] || '0', 10);
        }, 0);


        const avgRange = totalVehicles > 0 ? totalRange / totalVehicles : 0;

        const eligibleVehicles = data.filter(
          (vehicle: any) =>
            vehicle['Clean Alternative Fuel Vehicle (CAFV) Eligibility'] === 'Clean Alternative Fuel Vehicle Eligible'
        ).length;

        metrics = {
          total_vehicles: totalVehicles,
          electric_avg_range: avgRange,
          eligible_vehicles: eligibleVehicles,
        };
      },
      error: (error: any) => {
        console.error('Error parsing CSV:', error);
        return NextResponse.json({ message: 'Error parsing CSV file', data: [] }, { status: 500 });
      },
    });

    // Return the calculated metrics as the API response
    return NextResponse.json({ message: 'Vehicle metrics', data: metrics }, { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ message: 'Error processing request', data: [] }, { status: 500 });
  }
}
