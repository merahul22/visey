'use client';

import React, { useState, useTransition } from 'react';
import {
  fundingOpportunitySchema,
  fundingOpportunityFirstStepSchema,
  fundingOpportunitySecondStepSchema,
} from '@/schemas';

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

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Combobox } from '../Combobox';
import {
  industries as industriesList,
  sectors as sectorsList,
} from '@/constants';
import Image from 'next/image';

import { useRouter } from 'next/navigation';
import { FormError } from './FormError';
import { FormSuccess } from './FormSuccess';
import { Stepper } from '../Stepper';
import { postOpportunityDetails } from '@/actions/post-opportunity-details';
import SlidePanel from '@/app/(demo)/slide-panel/page';
import { ShareNetwork } from '@phosphor-icons/react/dist/ssr';

const PostFundingOpportunityForm = () => {
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [loading, startTransition] = useTransition();
  const [currentStep, setCurrentStep] = useState(1);

  const [registrations, setRegistrations] = useState('visey');

  const [formValues, setFormValues] = useState<
    z.infer<typeof fundingOpportunitySchema>
  >({
    imageUrl: '',
    type: '',
    subtype: '',
    title: '',
    websiteUrl: '',
    fundingAmount: '',
    targetIndustry: '',
    targetSector: '',
    targetWomenFounder: false,
    targetProductStage: '',
    targetFundingStage: '',
    description: '',
    eligibilityCriteria: '',
    registration: '',
    registrationFormLink: '',
    startDate: new Date(Date.now()),
    endDate: new Date(Date.now()),
    noOfRegistrationsAllowed: '',
  });

  const router = useRouter();

  const defaultValues =
    currentStep === 1
      ? {
          imageUrl: '',
          type: '',
          subtype: '',
          title: '',
          websiteUrl: '',
          fundingAmount: '',
          targetIndustry: '',
          targetSector: '',
          targetWomenFounder: false,
          targetProductStage: '',
          targetFundingStage: '',
          description: '',
          eligibilityCriteria: '',
        }
      : {
          registration: '',
          registrationFormLink: '',
          startDate: new Date(Date.now()),
          endDate: new Date(Date.now() + 10),
          noOfRegistrationsAllowed: '',
        };

  const schema =
    currentStep === 1
      ? fundingOpportunityFirstStepSchema
      : fundingOpportunitySecondStepSchema;

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });

  const onSubmit = (values: z.infer<typeof schema>) => {
    console.log(values);
    setError('');
    setSuccess('');

    if (currentStep === 1) {
      setFormValues((prevValues) => ({ ...prevValues, ...values }));
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setFormValues((prevValues) => ({ ...prevValues, ...values }));
      setCurrentStep(3);
    } else {
      setFormValues((prevValues) => ({ ...prevValues, ...values }));

      const backendData = { ...formValues, ...values };

      startTransition(async () => {
        const res = await postOpportunityDetails(backendData);

        if (res.error) {
          setError(res.error);
        }

        if (res.success) {
          setSuccess(res.success);
          router.push(`/profile/startup`);
        }
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="mt-4 mb-8">
        <Stepper currentStep={currentStep} numberOfSteps={3} />
      </div>
      {currentStep === 1 && (
        <div>
          <h1 className="text-2xl font-semibold">Basic Details</h1>
          <p className="text-sm text-neutrals-700">
            Input and review all necessary information required to register for
            the opportunity
          </p>
        </div>
      )}

      {currentStep === 2 && (
        <div>
          <h1 className="text-2xl font-semibold">Registration Details</h1>
          <p className="text-sm text-neutrals-700">Registration Criteria</p>
        </div>
      )}

      {currentStep === 3 && (
        <div>
          <h1 className="text-2xl font-semibold">Preview Post</h1>
          <p className="text-sm text-neutrals-700">
            Review how others will see your opportunity
          </p>
        </div>
      )}

      <div className="mt-4">
        <Form {...form}>
          <div className="mb-4">
            <FormError message={error} />
            <FormSuccess message={success} />
          </div>
          {currentStep === 1 && (
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <h2 className="font-semibold mt-8 text-neutrals-700 text-sm">
                Upload Logo*
              </h2>
              <div className="flex justify-center">
                <div className="border-2 rounded-lg px-14 py-2">
                  <Image
                    src="https://res.cloudinary.com/dlriuadjv/image/upload/v1729353205/xbbb0zw6js60dxnq64qj.png"
                    alt="Startup Logo"
                    width={150}
                    height={150}
                    className="cursor-pointer rounded-full"
                  />
                </div>
              </div>
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-neutrals-700">
                      Opportunity Type*
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="text-neutrals-700 mt-1"
                        placeholder=""
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
                name="subtype"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-neutrals-700">
                      Opportunity Sub-type*
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="text-neutrals-700 mt-1"
                        placeholder=""
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
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-neutrals-700">
                      Opportunity Title (190 characters)*
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="text-neutrals-700 mt-1"
                        placeholder=""
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
                name="websiteUrl"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-neutrals-700">
                      Website URL
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="text-neutrals-700 mt-1"
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
                name="fundingAmount"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-neutrals-700">
                      Funding Amount*
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="text-neutrals-700 mt-1"
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
                name="targetIndustry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-neutrals-700">
                      Target Industry*
                    </FormLabel>
                    <FormControl>
                      <div className="mt-1">
                        <Combobox
                          value={field.value}
                          data={industriesList}
                          placeHolder="Select"
                          noResultText="No industry found"
                          onChange={(value) => field.onChange(value)}
                          disabled={loading}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* <FormField
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
              /> */}
              <FormField
                control={form.control}
                name="targetSector"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <div className="flex justify-between">
                        <p className="text-neutrals-600 font-semibold">
                          Target Sector*
                        </p>
                      </div>
                    </FormLabel>
                    <FormControl>
                      <div className="mt-1">
                        <Combobox
                          value={field.value}
                          placeHolder="Select"
                          noResultText="No sector found"
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
              {/* <FormField
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
              /> */}
              <FormField
                control={form.control}
                name="targetWomenFounder"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between items-center border p-4 rounded-lg">
                      <div className="flex flex-col">
                        <FormLabel className="text-neutrals-700">
                          Target Women founders?
                        </FormLabel>
                        <FormDescription className="w-3/4">
                          Is this opportunity specifically targeted for women or
                          not.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={loading}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="targetProductStage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <div className="flex justify-between">
                        <p className="text-neutrals-600 font-semibold">
                          Target Product Stage(s)*
                        </p>
                      </div>
                    </FormLabel>
                    <FormControl>
                      <div className="mt-1">
                        <Combobox
                          value={field.value}
                          placeHolder="Select"
                          noResultText="No sector found"
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
                name="targetFundingStage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <div className="flex justify-between">
                        <p className="text-neutrals-600 font-semibold">
                          Target Funding Stage(s)*
                        </p>
                      </div>
                    </FormLabel>
                    <FormControl>
                      <div className="mt-1">
                        <Combobox
                          value={field.value}
                          placeHolder="Select"
                          noResultText="No sector found"
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
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-neutrals-700">
                      Description of Opportunity*
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="text-neutrals-700 mt-1"
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
                name="eligibilityCriteria"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-neutrals-700">
                      Eligibility Criteria*
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="text-neutrals-700 mt-1"
                        {...field}
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-center mt-8">
                <Button
                  type="submit"
                  className="rounded-full"
                  disabled={loading}
                >
                  Continue
                </Button>
              </div>
            </form>
          )}
          {currentStep === 2 && (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="registration"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormControl>
                        <RadioGroup
                          onValueChange={(value) => {
                            field.onChange(value);
                            setRegistrations(value);
                          }}
                          defaultValue="visey"
                          className="flex md:flex-col space-y-1"
                        >
                          <div className="flex gap-4">
                            <FormItem className="flex items-center space-x-3 space-y-0 w-[245px]">
                              <FormControl>
                                <RadioGroupItem value="visey" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Take registrations on Visey
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0 w-[245px]">
                              <FormControl>
                                <RadioGroupItem value="other" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Take registrations on another platform
                              </FormLabel>
                            </FormItem>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {registrations === 'other' && (
                  <FormField
                    control={form.control}
                    name="registrationFormLink"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-neutrals-700">
                          Registration form link*
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="text-neutrals-700 mt-1"
                            placeholder=""
                            {...field}
                            disabled={loading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {registrations === 'visey' && (
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="startDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-neutrals-700">
                            Registration start date & time*
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="text-neutrals-700 mt-1"
                              placeholder=""
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
                      name="endDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-neutrals-700">
                            Registration end date & time*
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="text-neutrals-700 mt-1"
                              placeholder=""
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
                      name="noOfRegistrationsAllowed"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-neutrals-700">
                            Number of registrations allowed
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="text-neutrals-700 mt-1"
                              placeholder="Enter the count if cap on max participants"
                              {...field}
                              disabled={loading}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                <div className="flex flex-col items-center">
                  <Button type="submit">Done</Button>
                </div>
              </form>
            </Form>
          )}
          {currentStep === 3 && (
            <div>
              <div className="flex gap-2 items-center mt-8 mb-8">
                <div className="cursor-pointer">
                  <ShareNetwork />
                </div>
                <Button
                  className="bg-secondary-100 text-neutrals-1000 border-2 border-neutrals-200 shadow-none hover:shadow-md hover:bg-secondary-100 rounded-full font-semibold"
                  size="sm"
                >
                  Promote
                </Button>
                <Button
                  className="text-neutrals-1000 hover:bg-neutrals-100 rounded-full font-semibold"
                  variant="outline"
                  size="sm"
                >
                  Edit
                </Button>
              </div>
              <SlidePanel />
            </div>
          )}
        </Form>
      </div>
    </div>
  );
};

export default PostFundingOpportunityForm;
