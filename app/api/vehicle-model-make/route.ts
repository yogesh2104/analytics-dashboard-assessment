import { NextRequest, NextResponse } from "next/server";
import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';

export async function GET() {

    const filePath = path.join(process.cwd(), 'data-to-visualize', 'Electric_Vehicle_Population_Data.csv');
  
    const file = fs.readFileSync(filePath, 'utf8');

    try {
        let modelCounts: { [model: string]: number,} = {};
        let modelMaker: { [make: string]: number } = {};
    
        Papa.parse(file, {
          header: true,
          complete: (results) => {
            const data = results.data;
    
            data.forEach((vehicle: any) => {
              const model = vehicle['Model'];
              if (model) {
                if (!modelCounts[model]) {
                  modelCounts[model] = 1;
                } else {
                  modelCounts[model]++;
                }
              }
            });

            data.forEach((vehicle: any) => {
                const make = vehicle['Make'];
                if (make) {
                  if (!modelMaker[make]) {
                    modelMaker[make] = 1;
                  } else {
                    modelMaker[make]++;
                  }
                }
            });

          },
          error: (error: any) => {
            return NextResponse.json({ message: 'Failed to parse data', data: [] }, { status: 500 });
          }
        });

        const formatedModel = Object.keys(modelCounts).map((mc)=>({
            name:mc,
            value:modelCounts[mc]
        }))

        const formatedMaker = Object.keys(modelMaker).map((mm)=>({
            name:mm,
            value:modelMaker[mm]
        }))
    
        return NextResponse.json({ message: 'Vehicle distribution', data: { formatedModel,formatedMaker } }, { status: 200 });
      } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Error processing request', data: [] }, { status: 500 });
      }
}

