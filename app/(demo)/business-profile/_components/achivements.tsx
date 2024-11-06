import { PencilSimple } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";



export default function Achievements() {
  return (
    <div className="space-y-6 pt-6 pb-4">
      <div className="flex justify-between items-center">
        <p className="font-semibold">Achivements</p>
        <Button size="icon" variant="ghost">
            <PencilSimple size={20}/>
          </Button>
      </div>

      <div className="space-y-3 md:flex md:flex-wrap md:gap-4 md:space-y-0">
        {Array.from({length: 3}).map((_, idx) => (
          <div
            key={idx}
            className="rounded-xl border px-2.5 py-4 md:px-3 shrink-0"
          > 
          
            <div className='space-y-1'>
              <p className='font-semibold'>Achievement Name</p>
              <p className="text-sm">Name of the Organization - 2024</p>
            </div>
        
          </div>
        ))}
      </div>
    </div>
  )
}