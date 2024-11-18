import Image from 'next/image';
import { LinkedinLogo } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';

interface ProfileCardProps {
  name: string;
  role: string;
  image: string;
  linkedIn: string;
}

const ProfileCard = ({profile}: { profile: ProfileCardProps }) => {
  return <div className="w-[324px] bg-gradient-to-b from-[#FC6E9C] to-[#DC5B84] rounded-xl">
    <div className="flex flex-col items-center">
      <div className="-mt-6">
        <Image
          src={`${profile.image}`}
          alt={"Profile Photo"}
          width={276}
          height={324}
          className="rounded-xl"
        />
        <div className="text-base-white flex items-center justify-between pt-2 pb-3">
          <div className="flex flex-col">
            <p>{profile.name}</p>
            <p className="text-sm">{profile.role}</p>
          </div>
          <Link href={`#`}>
            <LinkedinLogo className="w-6 h-6" />
          </Link>
        </div>
      </div>
    </div>
  </div>
}

export default ProfileCard;