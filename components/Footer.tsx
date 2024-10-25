import React from 'react';
import Image from 'next/image';
import { Separator } from './ui/separator';

import {
  Phone,
  Envelope,
  WhatsappLogo,
  YoutubeLogo,
  LinkedinLogo,
} from '@phosphor-icons/react/dist/ssr';

const Footer = () => {
  return (
    <div className="flex flex-col bg-neutrals-100 rounded-3xl px-8 py-4">
      <div className="flex flex-col gap-y-4 items-center justify-center">
        <Image src="/logo-black.png" width={160} height={73} alt="visey logo" />
        <p className="text-base-black">
          All rights reserved Visey | Designed and built with love - Copyright©
          2024
        </p>
      </div>

      <Separator className="border border-[#e70763] mt-4 mb-8" />

      <div className="flex flex-wrap gap-2 justify-between">
        <div className="flex flex-col gap-2">
          <p className="font-semibold">Community</p>
          <div className="flex flex-col gap-1 text-neutrals-800">
            <p>About</p>
            <p>Products</p>
            <p>Pricing</p>
            <p>Team</p>
            <p>Free Business Listing</p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-semibold">Legal</p>
          <div className="flex flex-col gap-1 text-neutrals-800">
            <p>Terms & Conditions</p>
            <p>Cookie Policy</p>
            <p>Privacy Policy</p>
            <p>Investor Relation</p>
          </div>
        </div>
        <div className="flex flex-col">
          <p className="font-semibold">Contact Us</p>
          <div className="flex gap-1 items-center">
            <Phone className="w-8 h-8" />
            <p className="text-neutrals-800">+91 78275 86754</p>
          </div>
          <div className="flex gap-1 items-center">
            <div>
              <Envelope className="w-8 h-8" />
            </div>
            <p className="underline text-neutrals-800">contact@visey.co.in</p>
          </div>
          <p className="text-neutrals-800">Partner with us</p>
          <div className="flex flex-col mt-4">
            <p className="font-semibold">Community</p>
            <p className="text-neutrals-800">Whatsapp</p>
          </div>
        </div>
        <div className="flex flex-col">
          <p className="font-semibold">Social Links</p>
          <div className="flex gap-1">
            <div>
              <WhatsappLogo className="w-8 h-8" />
            </div>
            <div>
              <YoutubeLogo className="w-8 h-8" />
            </div>
            <div>
              <LinkedinLogo className="w-8 h-8" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
