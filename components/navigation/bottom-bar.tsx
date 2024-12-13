import { BellIcon, ChartBar, HomeIcon } from "lucide-react"
import Link from 'next/link';

export function BottomBar() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full flex bg-base-white border-t justify-between px-4 py-5 ">
      <Link href="/home">
        <HomeIcon />
      </Link>
      <ChartBar />
      <BellIcon />
    </div>
  )
}