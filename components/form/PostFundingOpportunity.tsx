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
  productStages,
  fundingStages,
  sectors as sectorsList,
} from '@/constants';
import Image from 'next/image';

import { useRouter } from 'next/navigation';
import { FormError } from './FormError';
import { FormSuccess } from './FormSuccess';
import { Stepper } from '../Stepper';
import { postOpportunityDetails } from '@/actions/post-opportunity-details';
import { ShareNetwork } from '@phosphor-icons/react/dist/ssr';
import Tag from '../Tag';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Calendar } from '../ui/calendar';
import { TimePicker } from '../ui/time-picker';
import PreviewOpportunity from '../PreviewOpportunity';
import { Business } from '@prisma/client';
import { toast } from 'sonner';
import { Textarea } from '@/components/ui/textarea';
import { uploadFile } from '@/lib/uploadUtils';

const PostFundingOpportunityForm = ({ business }: { business: Business }) => {
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [loading, startTransition] = useTransition();
  const [currentStep, setCurrentStep] = useState(1);

  const [registrations, setRegistrations] = useState('visey');

  const [productStage, setProductStage] = useState<string[]>([]);
  const [fundingStage, setFundingStage] = useState<string[]>([]);

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
    targetFundingStageList: [],
    targetProductStageList: [],
    description: '',
    eligibilityCriteria: '',
    registration: 'visey', // Set default value matching the state
    registrationFormLink: '', // Ensure this is an empty string, not undefined
    startDate: new Date(Date.now()),
    endDate: new Date(Date.now()),
    noOfRegistrationsAllowed: '', // This needs to be an empty string not undefined
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
          targetFundingStageList: [],
          targetProductStageList: [],
          description: '',
          eligibilityCriteria: '',
        }
      : {
          registration: registrations, // Match the actual state value to prevent uncontrolled to controlled input
          registrationFormLink: formValues.registrationFormLink || '', // Initialize from formValues or empty string
          noOfRegistrationsAllowed: formValues.noOfRegistrationsAllowed || '',
          startDate: formValues.startDate, // Initialize from formValues
          endDate: formValues.endDate // Initialize from formValues
        };

  const schema =
    currentStep === 1
      ? fundingOpportunityFirstStepSchema
      : fundingOpportunitySecondStepSchema;

  // Create a type for the fundingAmountDisplay field that's used in the UI but not part of schema
  type FundingFormValues = z.infer<typeof schema> & {
    fundingAmountDisplay?: string;
  };

  const form = useForm<FundingFormValues>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });

  const onSubmit = (values: z.infer<typeof schema>) => {
    console.log(values);
    setError('');
    setSuccess('');

    if (currentStep === 1) {
      if (productStage.length === 0) {
        form.setError('targetProductStage', {
          type: 'manual',
          message: 'At least one Stage is required.',
        });
        return;
      }

      if (fundingStage.length === 0) {
        form.setError('targetFundingStage', {
          type: 'manual',
          message: 'At least one Stage is required.',
        });
        return;
      }
      setFormValues((prevValues) => ({
        ...prevValues,
        ...values,
        targetFundingStageList: fundingStage,
        targetProductStageList: productStage,
      }));
      setCurrentStep(2);
    } else {
      setFormValues((prevValues) => ({ ...prevValues, ...values }));
      setCurrentStep(3);
    }
  };

  const onPublish = () => {
    startTransition(async () => {
      const res = await postOpportunityDetails(formValues);

      if (res.error) {
        toast.error(res.error);
        setError(res.error);
      }

      if (res.success) {
        toast.success("Opportunity posted successfully.");
        setSuccess(res.success);
        router.push(`/profile/business`);
      }
    });
  };

  // Function to handle drafting opportunity
  const saveDraft = () => {
    startTransition(async () => {
      // Add isDraft flag to formValues
      const draftData = {
        ...formValues,
        isDraft: true
      };
      
      const res = await postOpportunityDetails(draftData);

      if (res.error) {
        toast.error(res.error);
        setError(res.error);
      }

      if (res.success) {
        toast.success("Opportunity saved as draft.");
        setSuccess(res.success);
        router.push(`/profile/business`);
      }
    });
  };

  const handleStageChange = (value: string) => {
    if (value && !productStage.includes(value)) {
      setProductStage((prevStages) => [...prevStages, value]);
    }
  };

  const handleRemoveStage = (stageName: string) => {
    setProductStage((prevStages) =>
      prevStages.filter((stage) => stage !== stageName)
    );
  };

  const handleFundingStageChange = (value: string) => {
    if (value && !fundingStage.includes(value)) {
      setFundingStage((prevStages) => [...prevStages, value]);
    }
  };

  const handleRemoveFundingStage = (stageName: string) => {
    setFundingStage((prevStages) =>
      prevStages.filter((stage) => stage !== stageName)
    );
  };

  return (
    <div className="space-y-4">
      <div className="mt-2 mb-8">
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
        {currentStep === 1 && (
          <Form {...form}>
            <div className="mb-4">
              <FormError message={error} />
              <FormSuccess message={success} />
            </div>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <h2 className="font-semibold mt-8 text-neutrals-700 text-sm">
                Upload Opportunity Banner
              </h2>
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex flex-col gap-3">
                        <div className="flex justify-center">
                          <label htmlFor="image-upload" className="cursor-pointer block">
                            <div className="border-2 rounded-lg px-14 py-2 relative">
                              {field.value ? (
                                <Image
                                  src={field.value}
                                  alt="Opportunity Banner"
                                  width={250}
                                  height={150}
                                  className="rounded-lg"
                                />
                              ) : (
                                <Image
                                  src="https://res.cloudinary.com/dlriuadjv/image/upload/v1729353205/xbbb0zw6js60dxnq64qj.png"
                                  alt="Opportunity Banner Placeholder"
                                  width={250}
                                  height={150}
                                  className="rounded-lg"
                                />
                              )}
                              <Input 
                                id="image-upload"
                                type="file"
                                accept="image/*"
                                className="sr-only"
                                onChange={async (e) => {
                                  const file = e.target.files?.[0];                                  if (file) {                                    try {
                                      const imageUrl = await uploadFile(file, 'banners');
                                      if (imageUrl) {
                                        field.onChange(imageUrl);
                                        toast.success('Banner uploaded successfully');
                                      }
                                    } catch (error) {
                                      console.error('Upload error:', error);
                                      toast.error('Failed to upload banner');
                                    }
                                  }
                                }}
                              />
                            </div>
                          </label>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <div className="text-sm text-gray-500">Or use image URL:</div>
                          <Input
                            type="text"
                            placeholder="Paste image URL here"
                            className="max-w-md"
                            value={field.value || ''}
                            onChange={(e) => {
                              field.onChange(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                        placeholder="Enter website URL (optional)"
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
                      <div className="relative">
                        <Input
                          className="text-neutrals-700 mt-1"
                          {...field}
                          disabled={loading}
                          type="number"
                          onChange={(e) => {
                            field.onChange(e);
                            // Update display value
                            const numValue = parseInt(e.target.value, 10);
                            if (!isNaN(numValue)) {
                              const formattedValue = (() => {
                                if (numValue >= 1000 && numValue < 100000) {
                                  return `${(numValue / 1000).toFixed(0)} Thousand`;
                                } else if (numValue >= 100000 && numValue < 10000000) {
                                  return `${(numValue / 100000).toFixed(1)} Lakh`;
                                } else if (numValue >= 10000000) {
                                  return `${(numValue / 10000000).toFixed(1)} Crore`;
                                } else {
                                  return e.target.value;
                                }
                              })();
                              
                              // Using type assertion to tell TypeScript this is valid
                              (form as any).setValue('fundingAmountDisplay', formattedValue);
                            } else {
                              (form as any).setValue('fundingAmountDisplay', '');
                            }
                          }}
                        />
                        {(form.watch('fundingAmountDisplay') || '') && (
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-neutrals-600 pointer-events-none">
                            {form.watch('fundingAmountDisplay')}
                          </div>
                        )}
                      </div>
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
                          noResultText="No stage found"
                          data={productStages}
                          onChange={handleStageChange}
                          disabled={loading}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {productStage.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {productStage.map((stage) => (
                    <Tag
                      key={stage}
                      name={stage}
                      onRemove={handleRemoveStage}
                    />
                  ))}
                </div>
              )}

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
                          data={fundingStages}
                          onChange={handleFundingStageChange}
                          disabled={loading}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {fundingStage.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {fundingStage.map((stage) => (
                    <Tag
                      key={stage}
                      name={stage}
                      onRemove={handleRemoveFundingStage}
                    />
                  ))}
                </div>
              )}

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-neutrals-700">
                      Description of Opportunity*
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Textarea
                          className="text-neutrals-700 mt-1 min-h-[120px]"
                          placeholder="Describe the opportunity in detail"
                          {...field}
                          disabled={loading}
                          onChange={(e) => {
                            field.onChange(e);
                          }}
                        />
                      </div>
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
                      <div className="relative">
                        <Textarea
                          className="text-neutrals-700 mt-1 min-h-[120px]"
                          placeholder="List eligibility requirements for applicants"
                          {...field}
                          disabled={loading}
                          onChange={(e) => {
                            field.onChange(e);
                          }}
                        />
                      </div>
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
          </Form>
        )}
        {currentStep === 2 && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                        value={field.value}
                        className="flex md:flex-col space-y-1"
                      >
                        <div className="flex flex-col sm:flex-row gap-4">
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
                      <FormItem className="flex flex-col items-start">
                        <FormLabel className="text-neutrals-700">
                          Registration start date & time (optional)
                        </FormLabel>
                        <Popover>
                          <PopoverTrigger asChild className="mt-1">
                            <Button
                              variant={'outline'}
                              className={cn(
                                'w-full justify-start text-left font-normal rounded-lg pl-4',
                                !field.value && 'text-muted-foreground'
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {field.value ? (
                                format(field.value, 'PPP HH:mm:ss')
                              ) : (
                                <span>Pick a date and time</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={(date) => {
                                // If date is selected but no time, set time to midnight
                                if (date) {
                                  const newDate = new Date(date);
                                  if (field.value) {
                                    // Keep the time if it was already set
                                    newDate.setHours(
                                      field.value.getHours(),
                                      field.value.getMinutes(),
                                      field.value.getSeconds()
                                    );
                                  } else {
                                    // Set midnight as default time
                                    newDate.setHours(0, 0, 0);
                                  }
                                  field.onChange(newDate);
                                } else {
                                  field.onChange(undefined);
                                }
                              }}
                              initialFocus
                            />
                            <div className="p-3 border-t border-border">
                              <TimePicker
                                setDate={field.onChange}
                                date={field.value}
                              />
                            </div>
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col items-start">
                        <FormLabel className="text-neutrals-700">
                          Registration end date & time*
                        </FormLabel>
                        <Popover>
                          <PopoverTrigger asChild className="mt-1">
                            <Button
                              variant={'outline'}
                              className={cn(
                                'w-full justify-start text-left font-normal rounded-lg pl-4',
                                !field.value && 'text-muted-foreground'
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {field.value ? (
                                format(field.value, 'PPP HH:mm:ss')
                              ) : (
                                <span>Pick a date and time</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={(date) => {
                                if (date) {
                                  const newDate = new Date(date);
                                  if (field.value) {
                                    // Keep the time if it was already set
                                    newDate.setHours(
                                      field.value.getHours(),
                                      field.value.getMinutes(),
                                      field.value.getSeconds()
                                    );
                                  } else {
                                    // Set midnight as default time
                                    newDate.setHours(0, 0, 0);
                                  }
                                  field.onChange(newDate);
                                } else {
                                  field.onChange(undefined);
                                }
                              }}
                              initialFocus
                            />
                            <div className="p-3 border-t border-border">
                              <TimePicker
                                setDate={field.onChange}
                                date={field.value}
                              />
                            </div>
                          </PopoverContent>
                        </Popover>
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
              {/* Promote button disabled for now */}
              {/* <Button
                className="bg-secondary-100 text-neutrals-1000 border-2 border-neutrals-200 shadow-none hover:shadow-md hover:bg-secondary-100 rounded-full font-semibold"
                size="sm"
              >
                Promote
              </Button> */}
              <Button
                className="text-neutrals-1000 hover:bg-neutrals-100 rounded-full font-semibold"
                variant="outline"
                size="sm"
                onClick={() => setCurrentStep(1)} // Return to step 1 to edit
              >
                Edit
              </Button>
            </div>
            <PreviewOpportunity business={business} opportunity={formValues} />
            <div className="flex items-center justify-center">
              <Button onClick={onPublish} disabled={loading}>
                Publish
              </Button>
              <Button onClick={saveDraft} disabled={loading} className="ml-4">
                Save as Draft
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostFundingOpportunityForm;
