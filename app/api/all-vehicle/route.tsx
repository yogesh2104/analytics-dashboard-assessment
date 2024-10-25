import { NextRequest, NextResponse } from "next/server";
import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';


// for this api I have take help of claude.ai to implement pagination
export async function GET(req: NextRequest) {

    const searchParams = req.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '100');
    
    if (page < 1 || limit < 1 || limit > 1000) {
        return NextResponse.json(
            { message: 'Invalid pagination parameters' },
            { status: 400 }
        );
    }

    const filePath = path.join(process.cwd(), 'data-to-visualize', 'Electric_Vehicle_Population_Data.csv');

    try {
        const file = fs.readFileSync(filePath, 'utf8');
        
        return new Promise((resolve) => {
            Papa.parse(file, {
                header: true,
                complete: (results) => {
                    const totalItems = results.data.length;
                    const totalPages = Math.ceil(totalItems / limit);
                    
                    const startIndex = (page - 1) * limit;
                    const endIndex = startIndex + limit;
                    
                    const paginatedData = results.data.slice(startIndex, endIndex);
                    
                    resolve(NextResponse.json({
                        message: 'CSV file Data',
                        data: paginatedData,
                        pagination: {
                            totalItems,
                            totalPages,
                            currentPage: page,
                            limit,
                            hasNextPage: page < totalPages,
                            hasPrevPage: page > 1
                        }
                    }, { status: 200 }));
                },
                error: (error: any) => {
                    console.error('Error parsing CSV:', error);
                    resolve(NextResponse.json(
                        { message: 'Error parsing CSV file', data: [] },
                        { status: 500 }
                    ));
                },
            });
        });
        
    } catch (error) {
        return NextResponse.json(
            { message: 'Not able to find file or process request.' },
            { status: 500 }
        );
    }
}