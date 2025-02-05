import { Achievement } from "@prisma/client";

import AddAchievementsModal from "@/components/modal-windows/AddAchievementModal";

export default function Achievements({
  achievements,
  isPublic,
}: {
  achievements: Achievement[];
  isPublic: boolean;
}) {
  return (
    <div className="space-y-6 pt-6 pb-4">
      <div className="flex justify-between items-center">
        <p className="font-semibold">Achievements</p>
        {!isPublic && <AddAchievementsModal />}
      </div>

      <div className="space-y-3 md:flex md:flex-wrap md:gap-4 md:space-y-0">
        {(!achievements || achievements?.length === 0) && (
          <div>
            <p className="text-sm">No achievements added yet</p>
          </div>
        )}

        {achievements &&
          achievements?.map((achievement, idx) => (
            <div
              key={idx}
              className="rounded-xl border px-2.5 py-4 md:px-3 shrink-0"
            >
              <div className="space-y-1">
                <p className="font-semibold">{achievement.name}</p>
                <p className="text-sm">{achievement.organization}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
