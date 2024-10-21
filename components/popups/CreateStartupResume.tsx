import React from 'react';
import { Button } from '../ui/button';
import Image from 'next/image';

const CreateStartupResume = () => {
  return (
    <div className="w-[229px] flex flex-col items-center space-y-4">
      <div>
        <p className="font-semibold text-center">
          Take 2 mins to create a shareable Startup Resume
        </p>
      </div>
      <div>
        <Image
          src="/img/create-resume.png"
          height={180}
          width={135}
          alt="Create Resume Logo"
        />
      </div>
      <Button variant="default" size="sm">
        Create Startup Resume
      </Button>
    </div>
  );
};

export default CreateStartupResume;
