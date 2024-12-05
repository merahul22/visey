'use client';

import React, { useState, useTransition } from 'react';
import {
  basicStartupFirstStepSchema,
  basicStartupSecondStepSchema,
  basicStartupDetailsSchema,
} from '@/schemas';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Combobox } from '../Combobox';
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

import {
  industries as industriesList,
  sectors as sectorsList,
  locations as locationsList,
  trlLevels as trlLevelsList,
} from '@/constants';

import { Stepper } from '../Stepper';
import { startupdetails } from '@/actions/startup-details';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';

const StartupDetailsBasicForm = () => {
  const { update } = useSession();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [loading, startTransition] = useTransition();
  const [formValues, setFormValues] = useState<
    z.infer<typeof basicStartupDetailsSchema>
  >({
    name: '',
    registeredName: '',
    websiteUrl: '',
    contactNumber: '',
    location: '',
    industry: '',
    industryOthers: '',
    sector: '',
    sectorOthers: '',
    trlLevel: '',
  });

  const router = useRouter();

  const schema =
    currentStep === 1
      ? basicStartupFirstStepSchema
      : basicStartupSecondStepSchema;

  const defaultValues =
    currentStep === 1
      ? {
          name: '',
          registeredName: '',
          websiteUrl: '',
          contactNumber: '',
          location: '',
        }
      : {
          industry: '',
          industryOthers: '',
          sector: '',
          sectorOthers: '',
          trlLevel: '',
        };

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });

  function onSubmit(values: z.infer<typeof schema>) {
    if (currentStep === 1) {
      setFormValues((prevValues) => ({ ...prevValues, ...values }));
      setCurrentStep(2);
    } else {
      setFormValues((prevValues) => ({ ...prevValues, ...values }));

      const finalValues = { ...formValues, ...values };

      startTransition(async () => {
        const res = await startupdetails(finalValues);

        if (res.success) {
          toast.success("Startup details added successfully.");
          await update();
          router.push(DEFAULT_LOGIN_REDIRECT);
          router.refresh();
        }
      });
    }
  }

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="lg:w-[540px] w-[320px]">
        <div className="mb-8 mt-2">
          <Stepper currentStep={currentStep} numberOfSteps={2} />
        </div>
        <div className="mb-8">
          <h1 className="text-xl font-semibold text-center">Startup Details</h1>
          <p className="text-sm text-neutrals-600 text-center">
            Your profile won&apos;t be publicly listed, but shareable. Fill
            details to customize your experience.
          </p>
        </div>

        {currentStep === 1 && (
          <Form {...form}>
            <div className="flex flex-col gap-4">
              {/* <FormError message="No account found with this email/ phone number" />
              <FormError message="Incorrect Password" /> */}
            </div>

            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-4 space-y-4"
            >
              <div className="space-y-4 mb-10">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <div className="flex justify-between">
                          <p className="text-neutrals-600 font-semibold">
                            Startup Name*
                          </p>
                        </div>
                      </FormLabel>
                      <FormControl>
                        <Input className="mt-1" {...field} disabled={loading} />
                      </FormControl>
                      <FormMessage />
                      <FormDescription className="text-neutrals-500">
                        This is your profile display name
                      </FormDescription>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="registeredName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <div className="flex justify-between">
                          <p className="text-neutrals-600 font-semibold">
                            Company Registered Name
                          </p>
                        </div>
                      </FormLabel>
                      <FormControl>
                        <Input className="mt-1" {...field} disabled={loading} />
                      </FormControl>
                      <FormMessage />
                      <FormDescription className="text-neutrals-500">
                        <span className="block">
                          If business is registered as a company in India
                        </span>
                        <span>
                          Official name as on Certificate of Incorporation
                        </span>
                      </FormDescription>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="websiteUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <div className="flex justify-between">
                          <p className="text-neutrals-600 font-semibold">
                            Website URL
                          </p>
                        </div>
                      </FormLabel>
                      <FormControl>
                        <Input className="mt-1" {...field} disabled={loading} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contactNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <div className="flex justify-between">
                          <p className="text-neutrals-600 font-semibold">
                            Contact Number*
                          </p>
                        </div>
                      </FormLabel>
                      <FormControl>
                        <Input className="mt-1" {...field} disabled={loading} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <div className="flex justify-between">
                          <p className="text-neutrals-600 font-semibold">
                            Location*
                          </p>
                        </div>
                      </FormLabel>
                      <FormControl>
                        <div className="mt-1">
                          <Combobox
                            value={field.value}
                            placeHolder="Select Location"
                            noResultText="No location found"
                            data={locationsList}
                            onChange={(value) => field.onChange(value)}
                            disabled={loading}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="">
                <Button
                  className="w-full rounded-full font-semibold"
                  type="submit"
                >
                  Next
                </Button>
              </div>
            </form>
          </Form>
        )}
        {currentStep === 2 && (
          <Form {...form}>
            <div className="flex flex-col gap-4"></div>

            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-4 space-y-4"
            >
              <div className="space-y-4 mb-10">
                <FormField
                  control={form.control}
                  name="industry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <div className="flex justify-between">
                          <p className="text-neutrals-600 font-semibold">
                            Industry*
                          </p>
                        </div>
                      </FormLabel>
                      <FormControl>
                        <div className="mt-1">
                          <Combobox
                            value={field.value}
                            data={industriesList}
                            placeHolder="Select Category"
                            noResultText="No category found"
                            onChange={(value) => field.onChange(value)}
                            disabled={loading}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="industryOthers"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="If others, please specify"
                          {...field}
                          disabled={loading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="sector"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <div className="flex justify-between">
                          <p className="text-neutrals-600 font-semibold">
                            Sector*
                          </p>
                        </div>
                      </FormLabel>
                      <FormControl>
                        <div className="mt-1">
                          <Combobox
                            value={field.value}
                            placeHolder="Select Tag"
                            noResultText="No tag found"
                            data={sectorsList}
                            onChange={(value) => field.onChange(value)}
                            disabled={loading}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="sectorOthers"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="If others, please specify"
                          {...field}
                          disabled={loading}
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
                      <FormLabel>
                        <div className="flex justify-between">
                          <p className="text-neutrals-600 font-semibold">
                            Trl Level*
                          </p>
                        </div>
                      </FormLabel>
                      <FormControl>
                        <div className="mt-1">
                          <Combobox
                            value={field.value}
                            placeHolder="TRL Level"
                            noResultText="No TRL level found"
                            data={trlLevelsList}
                            onChange={(value) => field.onChange(value)}
                            disabled={loading}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                className="w-full rounded-full font-semibold mb-2"
                type="submit"
                disabled={loading}
              >
                Complete Profile
              </Button>
            </form>
          </Form>
        )}
      </div>
    </div>
  );
};

export default StartupDetailsBasicForm;
