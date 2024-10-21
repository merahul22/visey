import React from 'react';

import { ShareNetwork, MapPin } from '@phosphor-icons/react/dist/ssr';
import { Button } from '../ui/button';
import Image from 'next/image';

const StartupProfile = ({ user }) => {
  const date = new Date(user.createdAt);

  const formattedDate = `${date.getDate()} ${date.toLocaleString('default', {
    month: 'long',
  })}, ${date.getFullYear()}`;

  return (
    <div>
      <div>My Profile</div>
      <div>
        <ShareNetwork />
        <Button
          className="bg-secondary-100 text-neutrals-1000 border-2 border-neutrals-200 shadow-none hover:shadow-md hover:bg-secondary-100"
          size="sm"
        >
          Promote
        </Button>
        <Button className="text-neutrals-1000" variant="link" size="sm">
          Edit
        </Button>
      </div>
      <div className="mt-8">
        <Image
          src={user.image || ''}
          alt="Profile Photo"
          width={72}
          height={72}
        />
        <p>{user.name}</p>
        <div className="flex gap-x-2 items-center">
          <MapPin />
          <p>Location</p>
        </div>
        <div>
          <div>
            <p>Email/ Phone</p>
            <p>{user.email || user.phoneNumber}</p>
          </div>
          <div>
            <p>Date Joined</p>
            <p>{formattedDate}</p>
          </div>
          <div>
            <p>Preferences</p>
            {user.preferences.map((preference: string) => (
              <p key={preference}>{preference}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartupProfile;
