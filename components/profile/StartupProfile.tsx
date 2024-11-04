import React from 'react';

import {
  ShareNetwork,
  MapPin,
  HandCoins,
} from '@phosphor-icons/react/dist/ssr';
import { Button } from '../ui/button';
import Image from 'next/image';
import { Cross2Icon } from '@radix-ui/react-icons';
import CreateStartupResume from '../popups/CreateStartupResume';
import StartupResume from '../StartupResume';
import Link from 'next/link';

const StartupProfile = ({ user }) => {
  const date = new Date(user.createdAt);

  const formattedDate = `${date.getDate()} ${date.toLocaleString('default', {
    month: 'long',
  })}, ${date.getFullYear()}`;

  return (
    <div className="">
      <div className="text-lg">My Profile</div>
      <div className="flex gap-2 items-center mt-2">
        <div className="cursor-pointer">
          <ShareNetwork />
        </div>
        <Button
          className="bg-secondary-100 text-neutrals-1000 border-2 border-neutrals-200 shadow-none hover:shadow-md hover:bg-secondary-100 rounded-full"
          size="sm"
        >
          Promote
        </Button>
        <Button
          className="text-neutrals-1000 hover:bg-neutrals-100 rounded-full"
          variant="outline"
          size="sm"
        >
          Edit
        </Button>
      </div>
      <div className="mt-8">
        <div className="flex items-center gap-4">
          <div>
            <Image
              src={user.image || ''}
              alt="Profile Photo"
              width={72}
              height={72}
              className="rounded-full"
            />
          </div>
          <div>
            <p className="font-semibold">{user.name}</p>
            <div className="flex gap-x-2 items-center">
              <MapPin />
              <p>{user.startup.location || 'Location'}</p>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex flex-col md:flex-row text-neutrals-700 gap-2 md:gap-20">
            <div>
              <p className="font-semibold">Email/ Phone</p>
              <p className="text-sm">{user.email || user.phoneNumber}</p>
            </div>
            <div>
              <p className="font-semibold">Date Joined</p>
              <p className="text-sm">{formattedDate}</p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-neutrals-700 font-semibold">Preferences</p>
            <div className="flex items-center flex-wrap gap-2 mt-2">
              {user.preferences.map((preference: string) => (
                <div
                  key={preference}
                  className="border rounded-full px-4 py-1 flex items-center gap-2"
                >
                  <p>{preference}</p>
                  <div className="cursor-pointer">
                    <Cross2Icon className="w-4 h-4" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="md:w-[500px] w-[300px] flex items-center gap-x-4 border rounded-lg py-2 px-4 mt-4">
          <div className="space-y-2 md:space-y-0 md:flex md:items-center">
            <div className="flex items-center gap-x-2">
              <div className="w-10 h-10 p-2 flex justify-center items-center bg-base-success text-white rounded-full border">
                <HandCoins className="w-6 h-6" />
              </div>
              <p className="font-semibold leading-tight">
                Add Preferences to get personalized recommendations
              </p>
            </div>
            <Button size="sm" variant="outline" className="rounded-full">
              Add Preferences
            </Button>
          </div>
          <div className="md:hidden cursor-pointer">
            <Cross2Icon className="w-5 h-5" />
          </div>
        </div>
        <div className="flex gap-x-4 justify-center w-full px-4 py-4 shadow-lg rounded-lg mt-8">
          <CreateStartupResume />
          <div className="cursor-pointer text-neutrals-700">
            <Cross2Icon className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-10">
          <div className="flex items-center gap-2 justify-end">
            <div className="cursor-pointer">
              <ShareNetwork />
            </div>
            <Button
              className="bg-secondary-100 text-neutrals-1000 border-2 border-neutrals-200 shadow-none hover:shadow-md hover:bg-secondary-100 rounded-full"
              size="sm"
            >
              Download
            </Button>
            <Button
              className="text-neutrals-1000 hover:bg-neutrals-100 rounded-full"
              variant="outline"
              size="sm"
            >
              <Link href="/startup-details">Edit</Link>
            </Button>
          </div>
          <div className="">
            <StartupResume />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartupProfile;
