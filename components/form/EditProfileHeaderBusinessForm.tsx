"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { editProfileHeaderBusinessSchema } from "@/schemas";
import { useTransition, useState } from "react";
import { FormError } from "./FormError";
import { FormSuccess } from "./FormSuccess";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import editProfileHeaderBusiness from "@/actions/edit-profile-header-business";
import { Input } from "@/components/ui/input";
import { Business } from "@prisma/client";

const EditProfileHeaderBusinessForm = ({
  business,
}: {
  business: Business;
}) => {
  const [loading, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const router = useRouter();

  const form = useForm<z.infer<typeof editProfileHeaderBusinessSchema>>({
    resolver: zodResolver(editProfileHeaderBusinessSchema),
    defaultValues: {
      name: business.name,
      companyRegisteredName:
        (business.registeredName as string | undefined) || "",
      email: (business.email as string | undefined) || "",
      phoneNumber: business.contactNumber,
      websiteUrl: (business.websiteUrl as string | undefined) || "",
      description: (business.description as string | undefined) || "",
    },
  });

  const onSubmit = (
    values: z.infer<typeof editProfileHeaderBusinessSchema>,
  ) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      const res = await editProfileHeaderBusiness(values);

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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <div className="flex justify-between">
                      <p className="text-neutrals-600 font-semibold">
                        Display Name*
                      </p>
                    </div>
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="mt-1"
                      placeholder="Enter name of business"
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
              name="companyRegisteredName"
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
                    <Input
                      className="mt-1"
                      placeholder="Enter Company Registered Name"
                      {...field}
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                  <FormDescription>
                    <div>
                      <span>
                        If business is registered as a company in India
                      </span>
                      <br />
                      <span>
                        Official name as on Certificate of Incorporation
                      </span>
                    </div>
                  </FormDescription>
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
                      <p className="text-neutrals-600 font-semibold">
                        Bio (150 characters)*
                      </p>
                    </div>
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="mt-1"
                      placeholder="Enter Bio of business"
                      {...field}
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="text-sm font-semibold text-neutrals-700">
              Contact Details
            </div>
            <FormField
              control={form.control}
              name="websiteUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <div className="flex justify-between">
                      <p className="text-neutrals-600 font-semibold">
                        Website URL*
                      </p>
                    </div>
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="mt-1"
                      placeholder="Enter url of website"
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
                  <FormLabel>
                    <div className="flex justify-between">
                      <p className="text-neutrals-600 font-semibold">Email*</p>
                    </div>
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="mt-1"
                      placeholder="Enter email of business"
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
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <div className="flex justify-between">
                      <p className="text-neutrals-600 font-semibold">
                        Phone Number*
                      </p>
                    </div>
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="mt-1"
                      placeholder="Enter contact number of business"
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

export default EditProfileHeaderBusinessForm;
