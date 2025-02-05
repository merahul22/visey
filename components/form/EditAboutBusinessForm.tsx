"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { editAboutBusinessSchema } from "@/schemas";
import { useTransition, useState } from "react";
import { FormError } from "./FormError";
import { FormSuccess } from "./FormSuccess";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Combobox } from "@/components/Combobox";
import { locations as locationsList } from "@/constants";
import editAboutBusiness from "@/actions/edit-about-business";
import { Textarea } from "@/components/ui/textarea";

const EditAboutBusinessForm = ({
  location,
  description,
}: {
  location: string;
  description: string;
}) => {
  const [loading, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const router = useRouter();

  const form = useForm<z.infer<typeof editAboutBusinessSchema>>({
    resolver: zodResolver(editAboutBusinessSchema),
    defaultValues: {
      location,
      description,
    },
  });

  const onSubmit = (values: z.infer<typeof editAboutBusinessSchema>) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      const res = await editAboutBusiness(values);

      if (res?.error) {
        setError(res.error);
      }

      if (res.success) {
        setSuccess(res.success);
        toast.success(res.success);
        form.reset();
        router.refresh();
      }
    });
  };

  return (
    <div>
      <Form {...form}>
        <div className="flex flex-col gap-4">
          <FormError message={error} />
          <FormSuccess message={success} />
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-4">
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
                        placeHolder="Select State"
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <div className="flex justify-between">
                      <p className="text-neutrals-600 font-semibold">About</p>
                    </div>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className="mt-1"
                      placeholder="Enter about the business"
                      {...field}
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            className="w-full rounded-full font-semibold"
            type="submit"
            disabled={loading}
          >
            Save Changes
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default EditAboutBusinessForm;
