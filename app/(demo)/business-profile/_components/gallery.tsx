import { Button } from "@/components/ui/button";
import { CaretRight, PencilSimple } from "@phosphor-icons/react/dist/ssr";

export default function Gallery() {
  return (
    <div className="space-y-6 pt-6 pb-4">
      <div className="flex justify-between items-center">
        <p className="font-semibold">Gallery</p>
        <div className='flex items-center gap-x-2'>
          <Button size="icon" variant="secondary">
            <CaretRight size={20}/>
          </Button>
          <Button size="icon" variant="ghost">
            <PencilSimple size={20}/>
          </Button>
        </div>
      </div>

      <div className="flex gap-x-4 oveflow-x-auto">
        {Array.from({length: 5}).map((_, idx) => (
          <div
            key={idx}
          > 
          
            <div className='bg-gray-200 w-36 h-24'>
            </div>
        
          </div>
        ))}
      </div>
    </div>
  )
}