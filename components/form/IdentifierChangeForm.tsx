'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { Button } from '../ui/button';

import React, { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { identifierChangeSchema } from '@/schemas';

import { FormError } from './FormError';
import { FormSuccess } from './FormSuccess';
import { identifierChange } from '@/actions/identifier-change';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';

interface IdentifierChangeFormProps {
  onCancel: () => void;
}

const IdentifierChangeForm = ({ onCancel }: IdentifierChangeFormProps) => {
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');

  const [loading, startTransition] = useTransition();

  const { update } = useSession();

  const form = useForm<z.infer<typeof identifierChangeSchema>>({
    resolver: zodResolver(identifierChangeSchema),
    defaultValues: {
      identifier: '',
    },
  });

  const onSubmit = (values: z.infer<typeof identifierChangeSchema>) => {
    setError('');
    setSuccess('');

    startTransition(async () => {
      const res = await identifierChange(values);

      if (res?.error) {
        form.reset();
        setError(res?.error);
      }

      if (res?.success) {
        toast.success(res.success);
        setSuccess(res?.success);
        await update();
        form.reset();
      }
    });
  };

  return (
    <div className="max-w-[400px]">
      <Form {...form}>
        <div className="flex flex-col gap-4">
          <FormError message={error} />
          <FormSuccess message={success} />
        </div>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="identifier"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-neutrals-700 font-semibold">
                  Email/ Phone Number
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Email/ Phone Number"
                    {...field}
                    className="mt-1"
                    disabled={loading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-2">
            <Button
              type="submit"
              className="rounded-full"
              size="lg"
              disabled={loading}
            >
              Change
            </Button>
            <Button
              type="button"
              className="rounded-full"
              variant="outline"
              size="lg"
              disabled={loading}
              onClick={onCancel}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default IdentifierChangeForm;
