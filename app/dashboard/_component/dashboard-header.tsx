import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Battery, Car, CheckCircle } from "lucide-react"


const DashboardHeader=({data}:{data:{
    total_vehicles: number,
    electric_avg_range: number,
    eligible_vehicles: number
}})=>{
    return(
        <>
            <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
                <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">
                    Total Vehicles
                    </CardTitle>
                    <Car className="h-5 w-5 text-blue-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold text-gray-800">{data?.total_vehicles.toLocaleString()}</div>
                    <p className="text-xs text-gray-500 mt-1">
                    Registered in the system
                    </p>
                </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">
                    Electric Avg Range
                    </CardTitle>
                    <Battery className="h-5 w-5 text-green-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold text-gray-800">{data.electric_avg_range.toFixed(2)} mi</div>
                    <p className="text-xs text-gray-500 mt-1">
                    Average range for electric vehicles
                    </p>
                </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">
                    Eligible Vehicles
                    </CardTitle>
                    <CheckCircle className="h-5 w-5 text-purple-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold text-gray-800">{data.eligible_vehicles.toLocaleString()}</div>
                    <p className="text-xs text-gray-500 mt-1">
                    {((data.eligible_vehicles / data.total_vehicles) * 100).toFixed(1)}% of total vehicles
                    </p>
                </CardContent>
                </Card>
            </div>
        </>
    )
}

export default DashboardHeader