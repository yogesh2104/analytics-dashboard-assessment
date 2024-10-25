"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Loader2 } from "lucide-react"
import Image from "next/image"
import React, { useState } from "react"

type vehicleType = {
    "VIN (1-10)"?: string,
    "County"?: string,
    "City"?: string,
    "State"?: string,
    "Postal Code"?: string,
    "Model Year"?: string,
    "Make"?: string,
    "Model"?: string,
    "Electric Vehicle Type"?: string,
    "Clean Alternative Fuel Vehicle (CAFV) Eligibility"?: string,
    "Electric Range"?: string,
    "Base MSRP"?: string,
    "Legislative District"?: string,
    "DOL Vehicle ID"?: string,
    "Vehicle Location"?: string,
    "Electric Utility"?: string,
    "2020 Census Tract"?: string
};

const ViewDetails=({id}:{id:string})=>{
    const [isOpen, setIsOpen] = useState(false)
    const [loading,setLoading] = useState(true)
    const [data,setData] = useState<vehicleType>({});

    React.useEffect(() => {
        if(isOpen){
            fetchData();
        }
    }, [isOpen]);

    const fetchData = async () => {
        setLoading(true);

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "vehicleId": id
        });

        const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        };

        try {
          const response = await fetch(`/api/vehicle`,requestOptions);
          const result = await response.json();
          setData(result.data || {});
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
    };

    return(
        <div>    
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">View</Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl p-0">
                {loading ? <div className="h-72 flex justify-center items-center"><Loader2 className="animate-spin"/></div> :
                
                <Card className="w-full overflow-hidden border-0">
                    <div className="">
                    <div className="">
                        <Image
                            src="/model-3.webp"
                            alt="This is dummy image"
                            width={400}
                            height={400}
                            className="w-full h-full object-contain"
                        />
                    </div>
                    <div className="p-2">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold">{data?.["Model Year"]} {" "} {data?.Make} {data?.Model}</CardTitle>
                        </CardHeader>
                        <CardContent className="grid">
                            <div className="grid grid-cols-1 md:grid-cols-3 w-full">
                                <div>
                                    <h3 className="font-semibold text-lg">Vehicle Information</h3>
                                    <p>VIN (1-10): {data?.["VIN (1-10)"]}</p>
                                    <p>DOL Vehicle ID: {data?.["DOL Vehicle ID"]}</p>
                                    <p>Electric Range: {data?.["Electric Range"]} miles</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">Location</h3>
                                    <p>{data?.City} {data?.County} {data?.State} {data?.["Postal Code"]}</p>
                                    <p>Legislative District: {data?.["Legislative District"]}</p>
                                    <p>2020 Census Tract: {data?.["2020 Census Tract"]}</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">Additional Details</h3>
                                    <p>Electric Utility: {data?.["Electric Utility"]}</p>
                                    <p>CAFV Eligibility: {data?.["Clean Alternative Fuel Vehicle (CAFV) Eligibility"]}</p>
                                    <p>Base MSRP: $ {data?.["Base MSRP"]}</p>
                                </div>
                            </div>
                        </CardContent>
                    </div>
                    </div>
                </Card>
                }
            </DialogContent>
        </Dialog>
        
        </div>
    )
}

export default ViewDetails