import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { Startup } from "@prisma/client";
import Link from "next/link";

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
          src="/img/create-resume.webp"
          height={180}
          width={135}
          alt="Create Resume Logo"
        />
      </div>
      <Link href="/startup-details">
        <Button variant="default" size="sm">
          Create Startup Resume
        </Button>
      </Link>
    </div>
  );
};

export default CreateStartupResume;
