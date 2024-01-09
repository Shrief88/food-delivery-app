import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { formatPrice, cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { IMeal, IReview } from "@/model";
import { getMealById, getMealReviews, getUserReview } from "@/api/data";
import { useAppDispatch } from "@/stateStore";
import { cartStateServices } from "@/reducers/cartSlice";
import { useTypedSelector } from "@/stateStore";
import useAxiosToken from "@/hooks/useAxiosToken";
import Review from "@/components/layout/Review";
import { TReviewSchema, reviewSchema } from "@/validators/review";

import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";
import { AxiosError } from "axios";
const Meal = () => {
  const dispatch = useAppDispatch();
  const [meal, setMeal] = useState<IMeal>({} as IMeal);
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasUserReview, setHasUserReview] = useState(false);
  const [activeButton, setActiveButton] = useState("description");
  const user = useTypedSelector((state) => state.authState.user);
  const { mealId } = useParams();
  const axiosClientWithToken = useAxiosToken();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TReviewSchema>({
    resolver: zodResolver(reviewSchema),
  });

  const onSubmit = async (data: TReviewSchema) => {
    try {
      const response = await axiosClientWithToken.post(
        `/meal/${mealId}/reviews`,
        data
      );
      if (response.status === 201) {
        toast.success("Review has been submitted");
      }
      response.data.data.user = {
        _id: user?._id,
        name: user?.name,
      };
      setReviews([response.data.data, ...reviews]);
      setHasUserReview(true);
    } catch (err) {
      const error = err as AxiosError<unknown>;
      if ((error.response?.status as number) === 401) {
        toast.error("Your token has expired, please logout and login again");
      }
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const responseMeal = await getMealById(mealId as string);
        const responseReview = await getMealReviews(mealId as string);
        if (user) {
          const userReview = await getUserReview(
            user?._id as string,
            mealId as string
          );
          if (userReview.length > 0) {
            setHasUserReview(true);
            const index = responseReview.findIndex(
              (review) => review.user._id === user._id
            );
            const tmp = responseReview[index];
            responseReview[index] = responseReview[0];
            responseReview[0] = tmp;
          }
        }

        setMeal(responseMeal);
        setReviews(responseReview);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [mealId, user]);

  const toggleActiveButton = (button: string) => {
    if (button === activeButton) return;
    setActiveButton(button);
  };

  const addToCart = () => {
    dispatch(
      cartStateServices.actions.addItem({
        name: meal.name,
        mealId: meal._id,
        quantity: 1,
        price: meal.price,
        image: meal.image,
        category: meal.category.name,
      })
    );
  };
  return (
    <>
      {!loading && (
        <MaxWidthWrapper>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 items-center">
            <div className="flex justify-center">
              <img src={meal.image} className="w-96" />
            </div>
            <div className="flex flex-col gap-4 items-center md:items-start md:justify-self-start">
              <p className="text-4xl">{meal.name}</p>
              <p className="text-primary text-2xl">
                price: {formatPrice(meal.price)}
              </p>
              <p className="text-xl">
                Category:{" "}
                <span className="bg-muted p-1">
                  {meal.category.name.toUpperCase()}
                </span>{" "}
              </p>
              <Button className="w-max mt-2" onClick={addToCart}>
                Add to cart
              </Button>
            </div>
          </div>
          <div className="text-left pl-3 mt-4">
            <div className="flex gap-3">
              <Button
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "text-black border-none text-lg"
                )}
                onClick={() => toggleActiveButton("description")}
              >
                Description
              </Button>
              <Button
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "text-black border-none text-lg"
                )}
                onClick={() => toggleActiveButton("reviews")}
              >
                Reviews
              </Button>
            </div>
            <Separator className="my-4" />
            {activeButton === "description" ? (
              <p className="text-muted-foreground text-base">
                {meal.description}
              </p>
            ) : (
              <>
                {user ? (
                  hasUserReview ? null : (
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="space-y-3 mb-7"
                    >
                      <Input
                        {...register("title")}
                        className={cn({
                          "focus-visible:ring-red-500": errors.title,
                        })}
                        placeholder="Leave a review"
                        id="title"
                      />
                      <Input
                        {...register("description")}
                        className={cn({
                          "focus-visible:ring-red-500": errors.description,
                        })}
                        placeholder="(Optional) Leave a description of your review"
                        id="description"
                      />
                      <Button className="mt-4">Submit</Button>
                    </form>
                  )
                ) : (
                  <p className="text-center mb-5">
                    please login to leave a review
                  </p>
                )}
                {reviews.length === 0 ? (
                  <p className="text-muted-foreground text-base text-center">
                    No reviews
                  </p>
                ) : (
                  reviews.map((review, index) => (
                    <div key={review._id}>
                      <Review review={review} userId={user?._id as string} />
                      {index !== reviews.length - 1 && (
                        <Separator className="my-4" />
                      )}
                    </div>
                  ))
                )}
              </>
            )}
          </div>
        </MaxWidthWrapper>
      )}
    </>
  );
};

export default Meal;
