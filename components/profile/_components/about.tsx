import { PencilSimple, MapPin } from '@phosphor-icons/react/dist/ssr';
import { Button } from '@/components/ui/button';

interface AboutProps {
  location: string | undefined;
  description: string | null | undefined;
}

export default function About({ location, description }: AboutProps) {
  return (
    <div className="space-y-6 pt-6 pb-4">
      <div className="flex justify-between items-center">
        <p className="font-semibold">About</p>
        <Button size="icon" variant="ghost" className="text-linkBlue">
          <PencilSimple size={20} />
        </Button>
      </div>

      <div className="space-y-4">
        <div className="flex gap-x-1 items-center">
          <MapPin size={16} />
          <span>{location || 'Location'}</span>
        </div>
        <p>{description || 'Business Description'}</p>
      </div>
    </div>
  );
}
