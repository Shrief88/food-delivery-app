import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IMeal } from "@/model";
import { getMealById } from "@/data";
import { formatPrice, cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Button, buttonVariants } from "@/components/ui/button";

const Meal = () => {
  const [meal, setMeal] = useState<IMeal>({} as IMeal);
  const [loading, setLoading] = useState(true);
  const [activeButton, setActiveButton] = useState("description");
  const { mealId } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getMealById(mealId as string);
        setMeal(response);
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

  return (
    <div className="mx-auto text-center flex flex-col items-center space-y-6">
      {!loading && (
        <>
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
                <Button className="w-max mt-2">Add to cart</Button>
              </div>
            </div>
          </MaxWidthWrapper>
          <MaxWidthWrapper>
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
              ):(
                <form action="post">
                  {/* TODO: Add reviews */}
                </form>
              )}
            </div>
          </MaxWidthWrapper>
        </>
      )}
    </div>
  );
};

export default Meal;
