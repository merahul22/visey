import { PencilSimple, MapPin } from '@phosphor-icons/react/dist/ssr';
import { Button } from '@/components/ui/button';
import { auth } from '@/auth';

export default async function About() {
  const session = await auth();
  const user = session?.user;

  const business = user?.business;

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
          <span>{business?.location || 'Location'}</span>
        </div>
        <p>{business?.description || 'Business Description'}</p>
      </div>
    </div>
  );
}
