'use client';

import { useState, useTransition } from 'react';
import { CheckIcon } from '@radix-ui/react-icons';
import { Button } from '../ui/button';
import { listPreferences } from '@/actions/list-preferences';
import { useRouter } from 'next/navigation';

const preferencesList = [
  'Cost-effective',
  'High quality',
  'Fast delivery',
  'Eco-friendly',
  'Innovative',
  'Popular',
];

const SelectPreferences = () => {
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);
  const [loading, startTransition] = useTransition();
  const router = useRouter();

  const disabled = selectedPreferences.length < 3;

  const handlePreferenceClick = (preference: string) => {
    setSelectedPreferences(
      (prev) =>
        prev.includes(preference)
          ? prev.filter((item) => item !== preference) // Remove if already selected
          : [...prev, preference] // Add if not selected
    );
  };

  const isSelected = (preference: string) =>
    selectedPreferences.includes(preference);

  const onSubmit = () => {
    startTransition(async () => {
      const res = await listPreferences(selectedPreferences);

      if (res.error) {
      }

      if (res.success) {
        router.push('/home');
      }
    });
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="lg:w-[540px] w-[320px]">
        <div className="mb-8">
          <h1 className="text-xl font-semibold text-center">
            What are you finding?
          </h1>
          <p className="text-sm text-neutrals-600 text-center">
            Select atleast 3 things
          </p>
        </div>
        <div className="flex flex-wrap gap-x-2 space-y-2 items-center justify-center">
          {preferencesList.map((preference) => (
            <div
              key={preference}
              className={`border rounded-full px-4 py-2 flex items-center gap-x-1 cursor-pointer
                ${
                  isSelected(preference)
                    ? 'bg-neutrals-200 shadow-inner'
                    : 'hover:bg-neutrals-200 hover:shadow-inner'
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
        <div className="mt-8">
          <Button
            className="w-full"
            disabled={disabled || loading}
            onClick={onSubmit}
          >
            Done
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SelectPreferences;
