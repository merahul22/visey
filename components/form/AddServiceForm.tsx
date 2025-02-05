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
import { Input } from "@/components/ui/input";
import { addServiceSchema } from "@/schemas";
import { useTransition, useState } from "react";
import { FormError } from "./FormError";
import { FormSuccess } from "./FormSuccess";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import addService from "@/actions/add-service";

const AddServiceForm = () => {
  const [loading, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const router = useRouter();

  const form = useForm<z.infer<typeof addServiceSchema>>({
    resolver: zodResolver(addServiceSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
    },
  });

  const onSubmit = (values: z.infer<typeof addServiceSchema>) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      const res = await addService(values);

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
                        Service Name*
                      </p>
                    </div>
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="mt-1"
                      placeholder="Enter name of service"
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
                  <FormLabel>
                    <div className="flex justify-between">
                      <p className="text-neutrals-600 font-semibold">
                        Description
                      </p>
                    </div>
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="mt-1"
                      placeholder="Enter Description"
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
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <div className="flex justify-between">
                      <p className="text-neutrals-600 font-semibold">Price*</p>
                    </div>
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="mt-1"
                      placeholder="Enter Price"
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
            Add Service
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AddServiceForm;
