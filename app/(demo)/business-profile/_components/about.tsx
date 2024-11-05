import { PencilSimple, MapPin } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";

export default function About() {
  return (
    <div className="space-y-6 pt-6 pb-4">
      <div className="flex justify-between items-center">
        <p className="font-semibold">About</p>
        <Button size="icon" variant="ghost">
          <PencilSimple size={20} />
        </Button>
      </div>

      <div className="space-y-4">
        <div className="flex gap-x-1 items-center">
          <MapPin size={16} />
          <span>Delhi, India</span>
        </div>
        <p>
          TechABC is an innovative startup focused on developing cutting-edge
          technology solutions to streamline business processes. Specializing in
          AI-driven software, TechABC aims to enhance productivity, improve data
          analytics, and provide scalable solutions for companies of all sizes.
          Their dedicated team of experts is committed to driving technological
          advancements and fostering digital transformation.
        </p>
      </div>
    </div>
  );
}
