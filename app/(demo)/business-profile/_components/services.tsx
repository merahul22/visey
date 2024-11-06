import { PencilSimple } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";

export default function Services() {
  return (
    <div className="space-y-6 pt-6 pb-4">
      <div className="flex justify-between items-center">
        <p className="font-semibold">Services</p>
        <Button size="icon" variant="ghost">
          <PencilSimple size={20} />
        </Button>
      </div>

      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, idx) => (
          <div
            key={idx}
            className="rounded-xl border flex justify-between items-center px-2.5 py-4"
          >
            <div className="space-y-1">
              <p className="font-semibold">Category</p>
              <p className="text-sm">Category Name</p>
            </div>

            <Button size="sm" variant={"secondary"}>
              ₹498
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
