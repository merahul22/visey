import Image from 'next/image';
import { Button } from '../ui/button';
import { Input } from '@/components/ui/input';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { auth } from '@/auth';
import { UserDropdown } from '@/components/UserDropdown';
import Link from 'next/link';

export async function Navbar() {
  const session = await auth();
  const user = session?.user;

  const userDropDownProps = {
    type: user?.type as 'BUSINESS' | 'STARTUP',
    image: user?.image,
    business: !!user?.business,
    startup: !!user?.startup,
    email: user?.email,
    phoneNumber: user?.phoneNumber,
    name: user?.name,
  };

  return (
    <header className="sticky top-0 z-30 bg-white px-4 py-2.5 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] w-full">
      <nav className="flex items-center justify-between">
        <div className="shrink-0 lg:w-48 cursor-pointer">
          <Link href="/home">
            <Image
              src="/logo-black.png"
              width={71}
              height={32}
              alt="visey logo"
            />
          </Link>
        </div>

        <div className="flex-1 px-8 flex justify-center">
          {user?.type === 'BUSINESS' && !user.business && (
            <Link
              href="/list-business"
              className="text-center text-linkBlue md:hidden"
            >
              List Business Free
            </Link>
          )}
          {user?.type === 'BUSINESS' && user.business && (
            <p className="text-center text-linkBlue md:hidden">Promote</p>
          )}
          {user?.type === 'STARTUP' && !user.startup && (
            <Link
              href="/basic-startup-details"
              className="text-center text-linkBlue md:hidden"
            >
              Add Startup Details
            </Link>
          )}

          <div className="hidden lg:block w-8/12">
            <div className="relative shadow-inner w-full">
              <Input
                className="flex-1 pr-10 border-none py-6"
                type="text"
                placeholder="Type to Search.."
              />
              <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="w-5 h-5 text-gray-600" />
              </span>
            </div>
          </div>
        </div>

        <div className="flex gap-x-6 items-center">
          {user?.type === 'STARTUP' && !user.startup && (
            <Link href="/basic-startup-details">
              <Button
                variant="outline"
                size="sm"
                className="hidden md:block rounded-full"
              >
                Add Startup Details
              </Button>
            </Link>
          )}
          {user?.type === 'BUSINESS' && (
            <Link href="/promote">
              <Button
                variant="outline"
                size="sm"
                className="hidden md:block rounded-full"
              >
                Promote
              </Button>
            </Link>
          )}
          {user?.type === 'BUSINESS' && !user?.business && (
            <Link href="/list-business">
              <Button
                variant="outline"
                size="sm"
                className="hidden md:block rounded-full"
              >
                List Business Free
              </Button>
            </Link>
          )}

          <div>
            <UserDropdown user={userDropDownProps} />
          </div>
        </div>
      </nav>

      <div className="relative z-10 mt-4 shadow-inner lg:hidden">
        <Input
          className="flex-1 pr-10 border-none py-6"
          type="text"
          placeholder="Type to Search.."
        />
        <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-600" />
        </span>
      </div>
    </header>
  );
}
