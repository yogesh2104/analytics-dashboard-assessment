import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import DashboardHeader from "./_component/dashboard-header"
import { NavUser } from "@/components/nav-user"
import DashboardMakerChart from "./_component/dashboard-maker-chart"
import DashboardModelChart from "./_component/dashboard-model-chart"
import { DashboardVehicleTable } from "./_component/table/data-table"
import DashboardTrendChart from "./_component/dashboard-trend-chart"


const userData = {
  user: {
    name: "Yogesh Singh",
    email: "singhyogesh2104@gmail.com",
  }
}

// async function getVehicleMakerandModel() {
//   try {
//     const response = await (await fetch(`${process.env.BASE_URL}/api/vehicle-model-make`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       cache: 'force-cache'
//     })).json();
//     return response;
//   } catch (error) {
//     throw new Error("Failed to fetch");
//   }
// }

// async function gettrends() {
//   try {
//     const response = await (await fetch(`${process.env.BASE_URL}/api/predict-vehicle-trends`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       cache: 'force-cache'
//     })).json();
//     return response;
//   } catch (error) {
//     throw new Error("Failed to fetch");
//   }
// }

// async function getmetrics() {
//   try {
//     const response = await (await fetch(`${process.env.BASE_URL}/api/vehicle-metrics`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       cache: 'force-cache'
//     })).json();
//     return response;
//   } catch (error) {
//     throw new Error("Failed to fetch");
//   }
// }

export default async function Page() {
  // const data=await getVehicleMakerandModel()
  // const trendData= await gettrends()
  // const matricsData = await getmetrics()
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>

        <header className="flex h-14 px-3 shrink-0 items-center gap-2">
          <div className="flex flex-1 items-center gap-2">
            <SidebarTrigger />
          </div>
          <div className="flex items-center gap-2 text-sm">
            <NavUser user={userData.user} fromWhere="dashboard"/>
        </div>
        </header>

        <div className="space-y-3 px-3">
          {/* <DashboardHeader data={matricsData?.data || {}}/>
          <DashboardMakerChart chartData={data?.data?.formatedMaker || []}/>
          <DashboardTrendChart chartData={trendData?.data || []}/>
          <DashboardModelChart chartData={data?.data?.formatedModel || []}/>
          <DashboardVehicleTable />   */}
        </div>

      </SidebarInset>
    </SidebarProvider>
  )
}
