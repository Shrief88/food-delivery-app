import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Trash2, Pencil } from "lucide-react";

import { IReview } from "@/model";
import useAxiosToken from "@/hooks/useAxiosToken";

interface ReviewProps {
  review: IReview;
  userId: string;
}

const formatName = (name: string) => {
  const words = name
    .split(" ")
    .map((word) => word.slice(0, 1).toUpperCase())
    .join("");
  return words.slice(0, 2);
};

const Review = (props: ReviewProps) => {
  const axiosClientWithToken = useAxiosToken();
  
  const deleteReview = async () => {
    try {
      await axiosClientWithToken.delete(`/review/${props.review._id}`);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  }


  return (
    <div className="flex justify-between">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-1">
          <Avatar>
            <AvatarFallback className="text-primary">
              {formatName(props.review.user.name)}
            </AvatarFallback>
          </Avatar>
          <p className="text-muted-foreground text-sm">
            By {props.review.user.name}
          </p>
        </div>
        <div>
          <p className="text-lg">{props.review.title}</p>
          {props.review.description && (
            <p className="text-sm text-muted-foreground">
              {props.review.description}
            </p>
          )}
        </div>
      </div>
      {props.userId === props.review.user._id && (
        <div className="flex">
          <div className="pl-2 sm:pl-4 md:flex-shrink-0 flex justify-center">
            <div className="w-8 h-8 bg-primary rounded-full flex justify-center items-center">
              <button onClick={deleteReview}>
                <Trash2 className="text-white size-5" />
              </button>
            </div>
          </div>
          {/*  TODO: add edit button functionality */}
          {/* <div className="pl-2 sm:pl-4 md:flex-shrink-0 flex justify-center">
            <div className="w-8 h-8 bg-primary rounded-full flex justify-center items-center">
              <Pencil className="text-white size-5" />
            </div>
          </div> */}
        </div>
      )}
    </div>
  );
};

export default Review;
