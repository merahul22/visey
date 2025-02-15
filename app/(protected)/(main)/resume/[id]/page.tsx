import { getStartupById } from "@/actions/get-startup-by-id";
import StartupResume from "@/components/StartupResume";

async function Page({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;

  const response = await getStartupById(id);

  if (response?.error) {
    return (
      <div className="mt-10 max-w-[1200px] mx-auto mb-20">
        <div className="text-red-500">Error: {response.error}</div>
      </div>
    );
  }

  if (!response?.success || !response.startup) {
    return (
      <div className="mt-10 max-w-[1200px] mx-auto mb-20">
        <div>Startup not found</div>
      </div>
    );
  }

  const startup = response.startup;

  return <StartupResume startup={startup} />;
}

export default Page;
