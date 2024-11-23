'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { Button } from '../ui/button';

import React, { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { reviewSchema } from '@/schemas';

import { FormError } from './FormError';
import { FormSuccess } from './FormSuccess';
import { Textarea } from '@/components/ui/textarea';
import { postReview } from '@/actions/post-review';
import { toast } from 'sonner';

interface ReviewFormProps {
  onCancel: () => void;
  setReview: (review: string) => void;
  userId: string | undefined;
  businessId: string | undefined;
  rating: number;
  addReviewToState: (newReview: Rating) => void;
}

interface Rating {
  id?: string;
  user: {
    id: string;
    name: string;
    image: string;
  };
  rating: number;
  comment: string;
  createdAt: Date;
  likes: number;
  dislikes: number;
}

const ReviewForm = ({ onCancel, setReview, userId, businessId, rating, addReviewToState }: ReviewFormProps) => {
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');

  const [loading, startTransition] = useTransition();

  const form = useForm<z.infer<typeof reviewSchema>>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      review: "",
    },
  });

  const onSubmit = (values: z.infer<typeof reviewSchema>) => {
    setError('');
    setSuccess('');

    startTransition(async () => {
      const res = await postReview(userId, businessId, values.review, rating);

      if (res?.success) {
        const newReview: Rating = {
          id: res.review?.id,
          user: {
            id: res.review?.user.id as string,
            name: res.review?.user.name as string,
            image: res.review?.user.image as string,
          },
          rating: rating,
          comment: values.review,
          createdAt: new Date(),
          likes: 0,
          dislikes: 0,
        };

        setReview(values.review);
        addReviewToState(newReview);
        toast("Review posted successfully.");
      }
    });
  };

  return <div>
    <Form {...form}>
      <div className="flex flex-col gap-4">
        <FormError message={error} />
        <FormSuccess message={success} />
      </div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="review"
          render={({ field }) => <FormItem>
              <FormLabel className="text-neutrals-700 font-semibold">
                Review
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write a review..."
                  {...field}
                  className="mt-1"
                  disabled={loading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>}
        />
        <div className="flex gap-2">
          <Button
            type="submit"
            className="rounded-full"
            size="md"
            disabled={loading}
          >
            Submit
          </Button>
          <Button
            type="button"
            className="rounded-full"
            variant="outline"
            size="md"
            disabled={loading}
            onClick={onCancel}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  </div>;
};

export default ReviewForm;
