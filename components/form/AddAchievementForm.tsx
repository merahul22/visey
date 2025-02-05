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
import { addAchievementsSchema } from "@/schemas";
import { useTransition, useState } from "react";
import { FormError } from "./FormError";
import { FormSuccess } from "./FormSuccess";
import { toast } from "sonner";
import addAchievement from "@/actions/add-achievement";
import { useRouter } from "next/navigation";

const AddAchievementForm = () => {
  const [loading, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const router = useRouter();

  const form = useForm<z.infer<typeof addAchievementsSchema>>({
    resolver: zodResolver(addAchievementsSchema),
    defaultValues: {
      name: "",
      organization: "",
      year: "",
    },
  });

  const onSubmit = (values: z.infer<typeof addAchievementsSchema>) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      const res = await addAchievement(values);

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
                        Achievement Name*
                      </p>
                    </div>
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="mt-1"
                      placeholder="Enter name of achievement"
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
              name="organization"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <div className="flex justify-between">
                      <p className="text-neutrals-600 font-semibold">
                        Issuer Name*
                      </p>
                    </div>
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="mt-1"
                      placeholder="Enter name of issuer"
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
              name="year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <div className="flex justify-between">
                      <p className="text-neutrals-600 font-semibold">
                        Achievement year*
                      </p>
                    </div>
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="mt-1"
                      placeholder="Enter year of achievement"
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
            Add Achievement
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AddAchievementForm;
