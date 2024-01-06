import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IMeal, IReview } from "@/model";
import { getMealById, getMealReviews } from "@/api/data";
import { formatPrice, cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Button, buttonVariants } from "@/components/ui/button";
import { useAppDispatch } from "@/stateStore";
import { cartStateServices } from "@/reducers/cartSlice";

const Meal = () => {
  const dispatch = useAppDispatch();
  const [meal, setMeal] = useState<IMeal>({} as IMeal);
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeButton, setActiveButton] = useState("description");
  const { mealId } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const responseMeal = await getMealById(mealId as string);
        const responseReview = await getMealReviews(mealId as string);
        setMeal(responseMeal);
        setReviews(responseReview);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [mealId]);

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
      })
    );
  };
  return (
    <>
      {!loading && (
        <MaxWidthWrapper>
          <div className="grid grid-cols-1 md:grid-cols-2 items-center">
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
                reviews.length === 0 ? (
                  <p className="text-muted-foreground text-base text-center">No reviews</p>
                ): (
                  <div>review</div>
                )
              )}
          </div>
        </MaxWidthWrapper>
      )}
    </>
  );
};

export default Meal;
