'use client';

import React from 'react';
import { startupDetailsSchema } from '@/schemas';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';

import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Combobox } from '../Combobox';
import {
  industries as industriesList,
  trlLevels as trlLevelsList,
} from '@/constants';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

const StartupDetailsForm = () => {
  const onSubmit = (values: z.infer<typeof startupDetailsSchema>) => {
    console.log(values);
  };

  const session = useSession();

  const user = session?.data?.user;

  const form = useForm<z.infer<typeof startupDetailsSchema>>({
    resolver: zodResolver(startupDetailsSchema),
    defaultValues: {
      name: '',
      image: '',
      description: '',
      registeredName: '',
      registrationDate: '',
      dpiitRecognized: false,
      websiteUrl: '',
      productStage: '',
      fundingStage: '',
      idea: '',
      problem: '',
      marketSize: '',
      twoMajorCompetitors: '',
      demoVideoUrl: '',
      pitchDeckUrl: '',
      foundersDetail: '',
      teamSize: '',
      noOfFte: '',
      noOfInterns: '',
      contactNumber: '',
      industry: '',
      industryOthers: '',
      trlLevel: '',
      email: '',
    },
  });

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold">Startup Details</h1>
        <p className="text-sm text-neutrals-700">
          Your profile won&apos;t be publicly listed, but shareable. Fill
          details to customize your experience
        </p>
      </div>
      <div>
        <div>
          <div className="mt-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <h2 className="font-semibold mt-8">Basic Details</h2>
                  <div className="flex justify-center border rounded-lg py-2">
                    {session.status === 'loading' && (
                      <div className="w-[150px] h-[150px] rounded-full animate-pulse bg-neutrals-300"></div>
                    )}
                    {session.status === 'authenticated' && (
                      <Image
                        src={user?.startup?.image || ''}
                        alt="Startup Logo"
                        width={150}
                        height={150}
                        className="cursor-pointer rounded-full"
                      />
                    )}
                  </div>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-neutrals-700">
                          Startup Name*
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="text-neutrals-700 mt-1"
                            placeholder=""
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-neutrals-700">
                          Description (In 50 characters)*
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="text-neutrals-700 mt-1"
                            placeholder=""
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="registeredName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-neutrals-700">
                          Company Registered Name (if applicable)*
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="text-neutrals-700 mt-1"
                            placeholder=""
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="registrationDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-neutrals-700">
                          Company Registration Date (if applicable)*
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="text-neutrals-700 mt-1"
                            placeholder=""
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="dpiitRecognized"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center border p-4 rounded-lg">
                          <div className="flex flex-col">
                            <FormLabel className="text-neutrals-700">
                              DPIIT Recognized?*
                            </FormLabel>
                            <FormDescription className="w-3/4">
                              Is your your startup recognized by DPIIT
                              (Department for Promotion of Industry and Internal
                              Trade) ?
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="industry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-neutrals-700">
                          Industry*
                        </FormLabel>
                        <FormControl>
                          <div className="mt-1">
                            <Combobox
                              value={field.value}
                              data={industriesList}
                              placeHolder="Select Category"
                              noResultText="No category found"
                              onChange={(value) => field.onChange(value)}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="websiteUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-neutrals-700">
                          Website URL
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="text-neutrals-700 mt-1"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-4">
                  <h2 className="font-semibold mt-8">Progress</h2>
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="fundingStage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-neutrals-700">
                            Startup Funding Stage*
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="text-neutrals-700 mt-1"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="productStage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-neutrals-700">
                            Startup Product Stage*
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="text-neutrals-700 mt-1"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="trlLevel"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-neutrals-700">
                            TRL Level*
                          </FormLabel>
                          <FormControl>
                            <div className="mt-1">
                              <Combobox
                                value={field.value}
                                placeHolder="TRL Level"
                                noResultText="No TRL level found"
                                data={trlLevelsList}
                                onChange={(value) => field.onChange(value)}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <h2 className="font-semibold mt-8">Progress</h2>
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="idea"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-neutrals-700">
                            Idea (Max 100-150 words)*
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="text-neutrals-700 mt-1"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="problem"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-neutrals-700">
                            What is the problem you are trying to solve? (Max
                            200-300 words)*
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="text-neutrals-700 mt-1"
                              placeholder=""
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="marketSize"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-neutrals-700">
                            Market Size/ Potential Market Opportunity*
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="text-neutrals-700 mt-1"
                              placeholder=""
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="twoMajorCompetitors"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-neutrals-700">
                            2 Major Competitors (Name, Description in 2
                            sentences)*
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="text-neutrals-700 mt-1"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="demoVideoUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-neutrals-700">
                            Demo Video
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="text-neutrals-700 mt-1"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="pitchDeckUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-neutrals-700">
                            Pitch Deck
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="text-neutrals-700 mt-1"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <h2 className="font-semibold mt-8">Team</h2>
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="websiteUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-neutrals-700">
                            Founder&apos;s Details (Name, Role, About, LinkedIn
                            URL)*
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="text-neutrals-700 mt-1"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="teamSize"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-neutrals-700">
                            Team Size (including both part-time and full-time)*
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="text-neutrals-700 mt-1"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="noOfFte"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-neutrals-700">
                            Number of full-time members*
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="text-neutrals-700 mt-1"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="noOfInterns"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-neutrals-700">
                            Number of part-time members (write 0 if not
                            applicable)*
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="text-neutrals-700 mt-1"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <h2 className="font-semibold mt-8">Contact</h2>
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="contactNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-neutrals-700">
                            Contact Number*
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="text-neutrals-700 mt-1"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-neutrals-700">
                            Contact Email Id*
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="text-neutrals-700 mt-1"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="flex justify-center">
                  <Button type="submit">Save Changes</Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartupDetailsForm;
