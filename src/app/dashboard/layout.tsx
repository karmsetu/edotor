import { SidebarProvider } from "@/components/ui/sidebar";
import { getAllPlaygroundForUser } from "@/module/dashboard/actions";
import { DashboardSidebar } from "@/module/dashboard/components/DashBoardSideBar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

    const playgroundData = await getAllPlaygroundForUser();
    if(!playgroundData) throw new Error('505 SERVER ERROR')

    console.log("playgroundData", playgroundData);

  const technologyIconMap: Record<string, string> = {
    REACT: "Zap",
    NEXTJS: "Lightbulb",
    EXPRESS: "Database",
    VUE: "Compass",
    HONO: "FlameIcon",
    ANGULAR: "Terminal",
  }

  const formattedPlaygroundData = playgroundData?.map((item)=>({
    id:item.id,
    name:item.title,
    starred:item.Starmark?.[0]?.isMarked || false,
    icon:technologyIconMap[item.template] || "Code2"
  }))


  return (

  <SidebarProvider>
    
    <div className="flex min-h-screen w-full overflow-x-hidden">
      {/* Dashboard Sidebar */}
      <DashboardSidebar initialPlaygroundData={formattedPlaygroundData}/>
      <main className="flex-1">{children}</main>
    </div>
  </SidebarProvider>
  )

}
