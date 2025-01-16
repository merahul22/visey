"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import {
  DotsThreeVertical,
  ThumbsDown,
  ThumbsUp,
} from "@phosphor-icons/react/dist/ssr";
import StarRatingConstant from "@/components/StarRatingConstant";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Cross2Icon } from "@radix-ui/react-icons";
import { deleteBusinessReview } from "@/actions/delete-business-review";
import { toast } from "sonner";

interface Rating {
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
  onDelete: (id: string) => void;
  onSetHasReview: () => void;
}

const UserRating = (props: Rating) => {
  const session = useSession();
  const user = session.data?.user;

  const [showReportBox, setShowReportBox] = useState(false);
  const [reportedReviewId, setReportedReviewId] = useState<string | null>(null);
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const [deleteReviewId, setDeleteReviewId] = useState<string | null>(null);

  const handleReportClick = (id: string) => {
    setReportedReviewId(id);
    setShowReportBox(true);
  };

  const closeReportBox = () => {
    setShowReportBox(false);
    setReportedReviewId(null);
  };

  const submitReport = () => {
    console.log("Reported Review ID:", reportedReviewId);
    console.log("Reason:", selectedReason);

    closeReportBox();
  };

  const handleDeleteClick = (id: string) => {
    setDeleteReviewId(id);
    setShowDeleteWarning(true);
  };

  const confirmDelete = async () => {
    console.log("Deleted Review ID:", deleteReviewId);

    const res = await deleteBusinessReview(deleteReviewId);

    if (res?.error) {
      toast.error(res.error);
    }
    if (res?.success) {
      toast.success("Review has been deleted successfully.");
      props.onDelete(deleteReviewId as string);
      props.onSetHasReview();
    }

    setShowDeleteWarning(false);
    setDeleteReviewId(null);
  };

  const closeDeleteWarning = () => {
    setShowDeleteWarning(false);
    setDeleteReviewId(null);
  };

  const date = new Date(props.createdAt);
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <div className="p-4 space-y-4 ">
        <Avatar className="size-10 rounded-full">
          <AvatarImage src={props.user?.image} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="space-y-2">
          <div className="flex justify-between">
            <h3 className="flex gap-x-2">
              <span>{props.user?.name}</span>
              <Image src="/img/badge.png" height={24} width={24} alt="badge" />
            </h3>
            <div className="cursor-pointer">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <DotsThreeVertical size={20} />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {props.user?.id !== user?.id ? (
                    <DropdownMenuItem
                      className="p-0"
                      onClick={() => {
                        handleReportClick(props.id);
                      }}
                    >
                      <Button variant="outline" className="border-0">
                        Report
                      </Button>
                    </DropdownMenuItem>
                  ) : null}

                  {props.user?.id === user?.id ? (
                    <DropdownMenuItem
                      className="p-0"
                      onClick={() => {
                        handleDeleteClick(props.id);
                      }}
                    >
                      <Button variant="outline" className="border-0">
                        Delete
                      </Button>
                    </DropdownMenuItem>
                  ) : null}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <StarRatingConstant rating={props.rating} />
              <p className="text-sm">{formattedDate}</p>
            </div>
            <p>{props.comment}</p>
            <div className="flex gap-x-6">
              <div className="flex items-center gap-x-0.5">
                <Button size="icon" variant="ghost">
                  <ThumbsUp size={16} />
                </Button>
                <span className="text-sm">{props.likes}</span>
              </div>

              <div className="flex items-center gap-x-0.5">
                <Button size="icon" variant="ghost">
                  <ThumbsDown size={16} />
                </Button>

                <span className="text-sm">{props.dislikes}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Separator className="my-4" />

      {/* Report Modal */}
      {showReportBox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-[750px]">
            {/* Modal Header */}
            <div className="mb-4 flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold">
                  Select Reason for Reporting
                </h1>
                <p className="text-neutrals-700">
                  We’ll send you a personalized list of businesses that match
                  your requirement
                </p>
              </div>
              <div className="cursor-pointer" onClick={closeReportBox}>
                <Cross2Icon height={24} width={24} />
              </div>
            </div>

            {/* Radio Button List */}
            <ul className="space-y-2">
              {[
                "Spam",
                "Incorrect Information",
                "Harassment",
                "I just don't like it",
                "Others",
              ].map((reason) => (
                <li key={reason}>
                  <label className="flex items-center space-x-2 p-2 rounded hover:bg-gray-100 cursor-pointer">
                    <input
                      type="radio"
                      name="reportReason"
                      value={reason}
                      checked={selectedReason === reason}
                      onChange={() => setSelectedReason(reason)}
                      className="accent-red-500"
                    />
                    <span>{reason}</span>
                  </label>
                </li>
              ))}
            </ul>

            {/* Submit and Cancel Buttons */}
            <div className="mt-4 flex justify-end">
              <Button onClick={submitReport} disabled={!selectedReason}>
                Submit Report
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteWarning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-[500px] text-center">
            <h2 className="text-2xl font-bold mb-4">Confirm Deletion</h2>
            <p className="mb-6 text-neutrals-700">
              Are you sure you want to delete this review? This action cannot be
              undone.
            </p>
            <div className="flex justify-center gap-x-4">
              <Button onClick={confirmDelete} className="bg-primary text-white">
                Confirm
              </Button>
              <Button variant="outline" onClick={closeDeleteWarning}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserRating;
