'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '@/components/ui/input';
import { startupDetailsSchema } from '@/schemas';

const ApplyFundingOpportunityPart2 = ({
  defaultValues,
  onSubmit,
}: {
  defaultValues: z.infer<typeof startupDetailsSchema>;
  onSubmit: (values: z.infer<typeof startupDetailsSchema>) => void;
}) => {
  const form = useForm<z.infer<typeof startupDetailsSchema>>({
    resolver: zodResolver(startupDetailsSchema),
    defaultValues,
  });

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold">Applying to Opportunity Name</h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-neutrals-700">Description*</FormLabel>
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

          <div className="flex justify-center mt-8">
            <Button type="submit" className="rounded-full">
              Submit Application
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ApplyFundingOpportunityPart2;
