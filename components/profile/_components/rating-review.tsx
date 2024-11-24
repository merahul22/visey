"use client";

import { Button } from '@/components/ui/button';
import {
  ArrowUpRight,
  ClockCountdown,
  ArrowDown,
} from '@phosphor-icons/react/dist/ssr';

import UserRating from '@/components/profile/_components/user-rating';
import { useCallback, useEffect, useState, useTransition } from 'react';
import StarRatingSetter from '@/components/StarRatingSetter';
import ReviewForm from '@/components/form/ReviewForm';
import { getReviews } from '@/actions/get-reviews';
import { checkForReview } from '@/actions/check-for-review';

interface RatingReviewProps {
  businessId: string;
  userId: string | undefined;
  isPublic: boolean;
}

interface Review {
  id: string;
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

export default function RatingReview({ businessId, userId, isPublic }: RatingReviewProps) {
  const [ratings, setRatings] = useState<Review[]>([])
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRatings, setTotalRatings] = useState(0);
  const [error, setError] = useState<string | undefined>("");
  const [loading, startTransition] = useTransition();
  const [selectedRating, setSelectedRating] = useState(0);
  const [hasReviewed, setHasReviewed] = useState<boolean>(true);

  const [showRatingInputBox, setShowRatingInputBox] = useState(false);
  const [review, setReview] = useState<string>("");

  const handleSetRating = (rating: number) => {
    setSelectedRating(rating);
  };

  const handleSetReview = (review: string) => {
    setReview(review);
    setShowRatingInputBox(false)
  }

  const handleCloseReviewInputBox = () => {
    setShowRatingInputBox(false);
  }

  const fetchRatings = useCallback((page: number) => {
    startTransition(async () => {
      const res = await getReviews(businessId, page);

      if (res?.error) {
        setError(res.error);
      }

      if (res.success) {
        setRatings((prev) => [...prev, ...res.data.ratings])
        setTotalRatings(res.data.totalRatings)
      }
    })
  }, [businessId])

  const checkForReviewExist = useCallback(async () => {
    const res = await checkForReview(userId, businessId);

    if (res?.success) {
      setHasReviewed(!!res.result)
    }
  }, [businessId, userId])

  useEffect(() => {
    fetchRatings(1);
    checkForReviewExist().then(r => console.log(r));
  }, [businessId, checkForReviewExist, fetchRatings]);

  const loadMore = () => {
    if (ratings.length < totalRatings) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      fetchRatings(nextPage);
    }
  };

  const addReviewToState = (newReview: Review) => {
    setRatings((prev) => [newReview, ...prev]);
    setTotalRatings((prev) => prev + 1);
  };


  return (
    <div className="space-y-6 pt-6 pb-4">
      <p className="font-semibold">Rating and Review</p>
      <div className="space-y-4">
        {isPublic && !hasReviewed && !review && (
          <div className="flex flex-col sm:flex-row justify-between space-y-2">
            <div className="flex gap-x-4 items-center">
              <div className="flex justify-center gap-x-1">
                <StarRatingSetter
                  size={32}
                  onSetRating={handleSetRating}
                />
              </div>
            </div>
            <div>
              <Button
                disabled={selectedRating === 0}
                size="md"
                variant="secondary"
                onClick={() => setShowRatingInputBox(true)}
              >
                Write a Review
              </Button>
            </div>
          </div>
        )}

        {showRatingInputBox && (
          <ReviewForm
            onCancel={handleCloseReviewInputBox}
            setReview={handleSetReview}
            userId={userId}
            businessId={businessId}
            rating={selectedRating}
            addReviewToState={addReviewToState}
          />
        )}

        <div className="flex gap-3 flex-wrap">
          <Button
            size="sm"
            variant="outline"
            className="py-3 gap-x-2 items-center"
          >
            <span>Top-Voted</span>
            <ArrowUpRight size={16} />
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="py-3 gap-x-2 items-center"
          >
            <span>Most-Recent</span>
            <ClockCountdown size={16} />
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="py-3 gap-x-2 items-center"
          >
            <span>Lowest-Rated</span>
            <ArrowDown size={16} />
          </Button>
        </div>
      </div>

      {error ? <div>{error}</div> :
        <div>
          {ratings.map((rating, idx) => (
              <UserRating
                key={idx}
                id={rating.id}
                user={rating.user}
                rating={rating.rating}
                comment={rating.comment}
                createdAt={rating.createdAt}
                likes={rating.likes}
                dislikes={rating.dislikes}
              />
          ))}
        </div>
      }

      <div className="flex items-center justify-center">
        {ratings.length < totalRatings && (
          <Button variant="link" onClick={loadMore} disabled={loading}>
            {loading ? "Loading..." : "Load More"}
          </Button>
        )}
      </div>
    </div>
  );
}
