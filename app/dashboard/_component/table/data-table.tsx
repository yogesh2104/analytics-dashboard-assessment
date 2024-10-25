"use client"

import * as React from "react"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import ViewDetails from "./view-details"


type vehicleType = {
    "VIN (1-10)": string,
    "County": string,
    "City": string,
    "State": string,
    "Postal Code": string,
    "Model Year": string,
    "Make": string,
    "Model": string,
    "Electric Vehicle Type": string,
    "Clean Alternative Fuel Vehicle (CAFV) Eligibility":string,
    "Electric Range": string,
    "Base MSRP": string,
    "Legislative District": string,
    "DOL Vehicle ID": string,
    "Vehicle Location": string,
    "Electric Utility": string,
    "2020 Census Tract": string
}

const columns: ColumnDef<vehicleType>[]= [
  {
    accessorKey: "DOL Vehicle ID",
    header: ({ column }) => {
      return (
        <div className="flex m-auto gap-3 justify-center cursor-pointer group/header">
          <p>Vehicle ID</p>
        </div>
      )
    },
    cell: ({ row }) => {
      const data = row.original
      return (
        <div className="flex justify-center text-center items-center m-auto">
          {data?.["DOL Vehicle ID"]}
        </div>
      )
    },
  },
  {
    accessorKey: "VIN (1-10)",
    header: ({ column }) => {
      return (
        <div className="text-sm flex justify-center text-center items-center m-auto">
          <p>VIN</p>
        </div>
      )
    },
    cell: ({ row }) => {
      const data = row.original
      return (
        <div className="flex items-center">          
          {data?.["VIN (1-10)"]}
        </div>
      )
    },
  },
  {
    accessorKey: "Model Year",
    header: ({ column }) => {
      return (
        <div className="flex m-auto w-20 gap-3 justify-center cursor-pointer group/header">
          <p>Model Year</p>
        </div>
      )
    },
    cell: ({ row }) => {
      const data = row.original
      return (
        <div className="text-sm flex justify-center text-center items-center m-auto">
          {data?.["Model Year"]}
        </div>
      )
    },
    size:100
  },
  {
    accessorKey: "Make",
    header: ({ column }) => {
      return (
        <div className="flex m-auto gap-3 justify-center cursor-pointer group/header">
          <p>Maker</p>
        </div>
      )
    },
    cell: ({ row }) => {
      const data = row.original
      return (
        <div className="flex justify-center text-center items-center m-auto">
          {data?.Make}
        </div>
      )
    },
  },
  {
    accessorKey: "Electric Range",
    header: ({ column }) => {
      return (
        <div className="flex m-auto w-24 gap-3 justify-center cursor-pointer group/header">
          <p>Range</p>
        </div>
      )
    },
    cell: ({ row }) => {
      const data = row.original
      return (
        <div className="flex justify-center text-center items-center m-auto">
         {data?.["Electric Range"]}
        </div>
      )
    },
  },
  {
    accessorKey: "Electric Vehicle Type",
    header: ({ column }) => {
      return (
        <div className="flex m-auto gap-3 justify-center cursor-pointer group/header">
          <p>Vehicle Type</p>
        </div>
      )
    },
    cell: ({ row }) => {
      const data = row.original
      return (
        <div className="flex justify-center text-center items-center m-auto">
         {data?.["Electric Vehicle Type"]}
        </div>
      )
    },
  },
  {
    accessorKey: "Electric Utility",
    header: ({ column }) => {
      return (
        <div className="flex m-auto gap-3 justify-center cursor-pointer group/header">
          <p>Electric Utility</p>
        </div>
      )
    },
    cell: ({ row }) => {
      const data = row.original
      const UtilityArr = data?.["Electric Utility"].split("|").filter(item => item !== '')
      return (
        <div className="flex justify-center text-center items-center m-auto">
          <ul>
            {UtilityArr?.map((ut)=>{
              return(
                <li>{ut}</li>
              )
            })}
          </ul>
        </div>
      )
    },
  },
  {
    accessorKey: "null",
    header: ({ column }) => {
      return (
        <div className="flex m-auto gap-3 justify-center cursor-pointer group/header">
          <p>Details</p>
        </div>
      )
    },
    cell: ({ row }) => {
      const data = row.original
      return (
        <div className="flex justify-center text-center items-center m-auto">
          <ViewDetails id={data?.["DOL Vehicle ID"]}/>
        </div>
      )
    },
  },
]


export function DashboardVehicleTable() {

  const [data, setData] = React.useState([]);
  const [pagination, setPagination] = React.useState({ currentPage: 1, totalPages: 1, limit: 20 , totalVehicle:0 });
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchData(pagination.currentPage);
  }, [pagination.currentPage]);

  const fetchData = async (page:number) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/all-vehicle?page=${page}&limit=${pagination.limit}`);
      const result = await response.json();
      setData(result.data || []);
      setPagination((prev) => ({
        ...prev,
        totalPages: result.pagination.totalPages,
        currentPage: result.pagination.currentPage,
        totalVehicle:result.pagination.totalItems
      }));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };


  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  })

  const columnCount = table.getAllColumns().length;
  const skeletons = Array.from({ length:10 }, (x, i) => i);

  return (
    <div className="mb-3">
      <Card>
        <CardHeader>
          <CardTitle>Vehicle Model data</CardTitle>
        </CardHeader>
        <CardContent>
          <Table className="text-xs border-t border-l border-b rounded-lg sm:text-sm lg:text-sm ">
            
            <TableHeader >
                {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} >
                  {headerGroup.headers.map((header) => {
                    const { column } = header
                      return (
                        <TableHead key={header.id} className="border-r">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </TableHead>
                      )
                  })}
                </TableRow>
                ))}
            </TableHeader>

            <TableBody>
                {table.getRowModel().rows?.length > 0  && !loading ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                      >
                      {row.getVisibleCells().map((cell) => {
                        return(
                          <TableCell key={cell.id} className="border-r">
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </TableCell>
                        )
                      })}
                    </TableRow>
                  ))
                ) : (
                  <>{loading ? 
                    <>{skeletons.map((skeleton) => (
                      <TableRow key={skeleton}>
                        {Array.from({ length: columnCount }, (x, i) => i).map(
                          (elm) => (
                            <TableCell key={elm} className="text-center border">
                              <Skeleton className="w-full h-[20px] rounded-none"/>
                            </TableCell>
                          )
                        )}
                      </TableRow>
                        ))}
                    </>:
                    <TableRow> 
                        <TableCell colSpan={columns.length} className="h-24 text-center">No results.</TableCell>
                    </TableRow>
                    } 
                </>
                )}
            </TableBody>

          </Table> 
        </CardContent>
        <CardFooter>
        <div className="flex items-center justify-end space-x-2 py-4">
            <div className="flex-1 text-sm text-muted-foreground">
              Total Vehicle Data: <span className="font-bold">{pagination?.totalVehicle}</span>
            </div>
            <div className="space-x-2">
              <Button
                variant="outline"
                size="lg"
                onClick={() => setPagination((prev) => ({ ...prev, currentPage: prev.currentPage - 1 }))}
                disabled={pagination.currentPage === 1}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => setPagination((prev) => ({ ...prev, currentPage: prev.currentPage + 1 }))}
                disabled={pagination.currentPage === pagination.totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

