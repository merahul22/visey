import { BellIcon, ChartBar, HomeIcon } from "lucide-react"

function BottomBar() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full flex  bg-[#fafafa] border-t justify-between px-4 py-5 ">
      <HomeIcon />
      <ChartBar />
      <BellIcon />
    </div>
  )
}
export default BottomBar