import { MapPin } from "@phosphor-icons/react/dist/ssr";
import EditAboutBusinessModal from "@/components/modal-windows/EditAboutBusinessModal";

interface AboutProps {
  location: string | undefined;
  description: string | null | undefined;
  isPublic: boolean;
}

export default function About({ location, description, isPublic }: AboutProps) {
  return (
    <div className="space-y-6 pt-6 pb-4">
      <div className="flex justify-between items-center">
        <p className="font-semibold">About</p>
        {!isPublic && (
          <EditAboutBusinessModal
            location={location as string}
            description={description as string}
          />
        )}
      </div>

      <div className="space-y-4">
        <div className="flex gap-x-1 items-center">
          <MapPin size={16} />
          <span>{location || "Location"}</span>
        </div>
        <p>{description || "Business Description"}</p>
      </div>
    </div>
  );
}
