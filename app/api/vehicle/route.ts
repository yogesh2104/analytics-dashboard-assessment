import { NextRequest, NextResponse } from "next/server";
import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';


interface vehicleRequestBody {
    vehicleId: string;
}


export async function POST(req: NextRequest, ) {

    const { vehicleId }:vehicleRequestBody = await req.json();

    const filePath = path.join(process.cwd(), 'data-to-visualize', 'Electric_Vehicle_Population_Data.csv');
  
    const file = fs.readFileSync(filePath, 'utf8');

    try {
        let vehicle : any ={}
        Papa.parse(file, {
        header: true,
        complete: (results) => {
            const data = results.data;

            vehicle = data.find((car:any) => car['DOL Vehicle ID'].startsWith(vehicleId));

        },
        error: (error: any) => {
            console.error('Error parsing CSV:', error);
            return NextResponse.json({ message: 'Error parsing CSV file', data: [] }, { status: 500 });
        },
        });
        
        if (vehicle) {
            return NextResponse.json({ message: 'Vehicle Information.', data: vehicle }, { status: 200 }); 
        } else {
            return NextResponse.json({ message: `Vehicle with VIN ${vehicleId} not found` });
        }
        
    } catch (error) {
        return NextResponse.json({ message: 'Not able to find.' }, { status: 500 });
    }
}

