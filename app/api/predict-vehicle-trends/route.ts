import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';

export async function GET() {

  const filePath = path.join(process.cwd(), 'data-to-visualize', 'Electric_Vehicle_Population_Data.csv');
  
  const file = fs.readFileSync(filePath, 'utf8');

  try {
    let trendsData:any
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        const data = results.data;

        trendsData = data.reduce((acc:any, vehicle:any) => {
            const year = parseInt(vehicle['Model Year'], 10);
            if (year) {
              acc[year] = (acc[year] || 0) + 1;
            }
            return acc;
        }, {});

        
      },
      error: (error: any) => {
        console.error('Error parsing CSV:', error);
        return NextResponse.json({ message: 'Error parsing CSV file', data: [] }, { status: 500 });
      },
    });

    const formatedValue = Object.keys(trendsData)?.map((td)=>({
      lable:td,
      value:trendsData[td]
    }))

    return NextResponse.json({ message: 'Vehicle trends', data: formatedValue }, { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ message: 'Error processing request', data: [] }, { status: 500 });
  }
}
