'use client';

import React, { useState } from 'react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '../ui/button';
import ResetPasswordForm from '../form/ResetPasswordForm';
import PermanentDeleteWarning from '../popups/PermanentDeleteWarning';
import { Cross2Icon } from '@radix-ui/react-icons';
import IdentifierChangeForm from '../form/IdentifierChangeForm';

interface User {
  id: string | undefined;
  email: string;
  phoneNumber: string;
}

const StartupSettings = ({ user }: { user: User }) => {
  const [showWarning, setShowWarning] = useState(false);
  const [showIdentifierField, setShowIdentifierField] = useState(false);

  return (
    <div className="py-6 flex flex-col gap-4 relative">
      <div>
        <h1 className="text-xl">My Account</h1>
      </div>
      <div className="flex flex-col gap-4">
        <p className="font-semibold text-sm">Settings</p>
        <div>
          <Accordion type="multiple" className="max-w-[800px]">
            <div className="flex flex-col gap-4">
              <AccordionItem
                className="border border-neutrals-200 rounded-lg px-8 py-2"
                value="item-1"
              >
                <AccordionTrigger className="text-base font-normal">
                  Change Account Email/Phone Number
                </AccordionTrigger>
                <AccordionContent className="mt-4">
                  {!showIdentifierField && (
                    <div className="flex flex-col gap-4">
                      <div className="text-neutrals-700">
                        <h2 className="font-semibold">
                          Registered Email/ Phone Number
                        </h2>
                        <p>{user.email || user.phoneNumber}</p>
                      </div>
                      <div>
                        <Button
                          className="rounded-full font-semibold"
                          variant="outline"
                          size="lg"
                          onClick={() => setShowIdentifierField(true)}
                        >
                          Change
                        </Button>
                      </div>
                    </div>
                  )}
                  {showIdentifierField && (
                    <IdentifierChangeForm
                      onCancel={() => setShowIdentifierField(false)}
                    />
                  )}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem
                className="border border-neutrals-200 rounded-lg px-8 py-2"
                value="item-2"
              >
                <AccordionTrigger className="text-base font-normal">
                  Change Password
                </AccordionTrigger>
                <AccordionContent className="mt-4">
                  <ResetPasswordForm />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem
                className="border border-neutrals-200 rounded-lg px-8 py-2"
                value="item-3"
              >
                <AccordionTrigger className="text-base font-normal">
                  Accounts Center
                </AccordionTrigger>
                <AccordionContent className="mt-4">
                  <div className="flex flex-col gap-4">
                    <div>
                      <Button
                        className="rounded-full font-semibold text-base-error border border-base-error bg-base-white hover:bg-error-100 hover:text-base-error"
                        variant="outline"
                        size="lg"
                        onClick={() => setShowWarning(true)}
                      >
                        Delete Account
                      </Button>
                      <p className="text-neutrals-700 mt-4">
                        All your data including Profile, listings, interactions
                        on Visey would be permanently deleted and you will not
                        be able to get your account back, once deleted.
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </div>
          </Accordion>
          {showWarning && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
              <div className="relative max-w-fit bg-white rounded-lg shadow-lg px-8 py-4">
                <PermanentDeleteWarning
                  onCancel={() => setShowWarning(false)}
                  userId={user.id as string}
                />
                <div
                  className="absolute top-3 right-3 cursor-pointer text-neutrals-700"
                  onClick={() => setShowWarning(false)}
                >
                  <Cross2Icon className="w-5 h-5" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StartupSettings;
