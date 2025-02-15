"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { categories } from "@/constants";
import { CheckIcon } from "@radix-ui/react-icons";
import { useState, useTransition } from "react";
import { useSession } from "next-auth/react";
import { listPreferences } from "@/actions/list-preferences";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const preferencesList = categories.map((category) => category.value);
preferencesList.pop();

export function AddPreferencesModal({
  userPreferences,
}: {
  userPreferences: string[] | undefined;
}) {
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>(
    userPreferences as string[],
  );
  const [loading, startTransition] = useTransition();
  const { update } = useSession();
  const router = useRouter();

  const handlePreferenceClick = (preference: string) => {
    setSelectedPreferences((prev) =>
      prev.includes(preference)
        ? prev.filter((item) => item !== preference)
        : [...prev, preference],
    );
  };

  const isSelected = (preference: string) =>
    selectedPreferences.includes(preference);

  const onSubmit = () => {
    startTransition(async () => {
      const res = await listPreferences(selectedPreferences);

      if (res.error) {
        toast.error(res.error);
      }

      if (res.success) {
        toast.success("Preferences added successfully.");
        update();
        router.refresh();
      }
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="rounded-full">
          Add Preferences
        </Button>
      </DialogTrigger>
      <DialogContent className="p-4">
        <DialogHeader>
          <DialogTitle>What are you finding?</DialogTitle>
          <DialogDescription>
            Select at least 3 things to continue.
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[400px] flex flex-wrap gap-x-2 space-y-2 items-center justify-center overflow-scroll mb-10">
          {preferencesList.map((preference) => (
            <div
              key={preference}
              className={`border rounded-full px-4 py-2 flex items-center gap-x-1 cursor-pointer
                ${
                  isSelected(preference)
                    ? "bg-neutrals-200 shadow-inner"
                    : "hover:bg-neutrals-200 hover:shadow-inner"
                }`}
              onClick={() => handlePreferenceClick(preference)}
            >
              <div className="font-normal">
                <CheckIcon className="w-6 h-6" />
              </div>

              <p>{preference}</p>
            </div>
          ))}
        </div>
        <DialogFooter>
          <div className="mt-8 fixed bottom-2 left-0 w-full">
            <Button className="w-full" disabled={loading} onClick={onSubmit}>
              Done
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
