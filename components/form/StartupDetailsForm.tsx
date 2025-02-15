"use client";

import React, { useState, useTransition } from "react";
import { startupDetailsSchema } from "@/schemas";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Combobox } from "../Combobox";
import {
  industries as industriesList,
  trlLevels as trlLevelsList,
  locations as locationsList,
  sectors as sectorsList,
} from "@/constants";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Textarea } from "../ui/textarea";
import { Startup } from "@prisma/client";
import { completeStartupDetails } from "@/actions/complete-startup-details";

import { useRouter } from "next/navigation";
import { FormError } from "./FormError";
import { FormSuccess } from "./FormSuccess";
import { toast } from "sonner";

interface StartupDetailsFormProps {
  startup?: Startup;
}

const StartupDetailsForm = ({ startup }: StartupDetailsFormProps) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [loading, startTransition] = useTransition();

  const router = useRouter();

  const onSubmit = (values: z.infer<typeof startupDetailsSchema>) => {
    console.log(values);
    setError("");
    setSuccess("");

    startTransition(async () => {
      const res = await completeStartupDetails(values);

      if (res.error) {
        setError(res.error);
      }

      if (res.success) {
        toast.success(res.success);
        setSuccess(res.success);
        router.push(`/profile/startup`);
      }
    });
  };

  const form = useForm<z.infer<typeof startupDetailsSchema>>({
    resolver: zodResolver(startupDetailsSchema),
    defaultValues: {
      name: startup?.name,
      image: startup?.image,
      description: startup?.description as string,
      registeredName: startup?.registeredName as string,
      registrationDate: new Date(Date.now()),
      dpiitRecognized: false,
      websiteUrl: startup?.websiteUrl as string,
      productStage: startup?.productStage as string,
      fundingStage: startup?.fundingStage as string,
      idea: startup?.idea as string,
      problem: startup?.problem as string,
      marketSize: startup?.marketSize as string,
      twoMajorCompetitors: startup?.twoMajorCompetitors as string,
      demoVideoUrl: startup?.demoVideoUrl as string,
      pitchDeckUrl: startup?.pitchDeckUrl as string,
      foundersDetail: startup?.foundersDetail as string,
      contactNumber: startup?.contactNumber as string,
      industry: startup?.industry as string,
      industryOthers: "",
      sector: startup?.sector as string,
      sectorOthers: "",
      location: startup?.location as string,
      trlLevel: startup?.trlLevel as string,
      email: startup?.email as string,
    },
  });

  return (
    <div className="space-y-4 max-w-[300px] md:max-w-[600px]">
      <div>
        <h1 className="text-2xl font-semibold">Startup Details</h1>
        <p className="text-sm text-neutrals-700">
          Your profile won&apos;t be publicly listed, but shareable. Fill
          details to customize your experience
        </p>
      </div>

      <div className="mt-4">
        <Form {...form}>
          <div className="mb-4">
            <FormError message={error} />
            <FormSuccess message={success} />
          </div>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <h2 className="font-semibold mt-8">Basic Details</h2>
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
                        disabled={loading}
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
                        disabled={loading}
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
                      Company Registered Name (if applicable)
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
                name="registrationDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-neutrals-700">
                      Company Registration Date (if applicable)
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <div className="mt-1">
                            <Button
                              variant={"outline"}
                              type="button"
                              className={cn(
                                "w-[240px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground",
                              )}
                              disabled={loading}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </div>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
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
                          Is your your startup recognized by DPIIT (Department
                          for Promotion of Industry and Internal Trade) ?
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
                        disabled={loading}
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
                          disabled={loading}
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
                            disabled={loading}
                            sizeSmall={300}
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
                        <Textarea
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
                  name="problem"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-neutrals-700">
                        What is the problem you are trying to solve? (Max
                        200-300 words)*
                      </FormLabel>
                      <FormControl>
                        <Textarea
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
                          disabled={loading}
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
                        2 Major Competitors (Name, Description in 2 sentences)*
                      </FormLabel>
                      <FormControl>
                        <Textarea
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
                          disabled={loading}
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
                          disabled={loading}
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
                  name="foundersDetail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-neutrals-700">
                        Founder&apos;s Details (Name, Role, About, LinkedIn
                        URL)*
                      </FormLabel>
                      <FormControl>
                        <Textarea
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
                          disabled={loading}
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
                          disabled={loading}
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
                        Number of part-time members (write 0 if not applicable)*
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
              </div>
            </div>
            <div className="space-y-4">
              <h2 className="font-semibold mt-8">Contact</h2>
              <div className="space-y-4">
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
                          disabled={loading}
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
                          disabled={loading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex justify-center mt-8">
              <Button type="submit" className="rounded-full" disabled={loading}>
                Save Changes
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default StartupDetailsForm;
