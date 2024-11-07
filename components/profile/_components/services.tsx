import { PencilSimple } from '@phosphor-icons/react/dist/ssr';
import { Button } from '@/components/ui/button';
import { auth } from '@/auth';

export default async function Services() {
  const session = await auth();
  const user = session?.user;

  const business = user?.business;

  return (
    <div className="space-y-6 pt-6 pb-4">
      <div className="flex justify-between items-center">
        <p className="font-semibold">Services</p>
        <Button size="icon" variant="ghost" className="text-linkBlue">
          <PencilSimple size={20} />
        </Button>
      </div>

      <div className="space-y-3">
        {business?.services.length === 0 && (
          <div>
            <p className="text-sm">No services added yet</p>
          </div>
        )}
        {business?.services?.map((service, idx) => (
          <div
            key={idx}
            className="rounded-xl border flex justify-between items-center px-2.5 py-4"
          >
            <div className="space-y-1">
              <p className="font-semibold">Category</p>
              <p className="text-sm">{service.category}</p>
            </div>

            <Button size="sm" variant={'secondary'}>
              ₹{service.price}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
