import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "../components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "../components/ui/button";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { GetMealsResults, ICategory } from "@/model";
import { getAllCategories, getAllMeals, getMealsByCategory } from "@/data";
import { formatPrice } from "@/lib/utils";

const Food = () => {
  const [meals, setMeals] = useState<GetMealsResults | null>(null);
  const [mealsCards, setMealsCards] = useState<JSX.Element[]>([]);
  const [paginationItems, setPaginationItems] = useState<JSX.Element[]>([]);
  const [searchParms, setSearchParams] = useSearchParams();
  const [categories, serCategories] = useState<ICategory[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [open, setOpen] = useState(false);
  const [categoryValue, setCategoryValue] = useState(searchParms.get("category") || "");

  const currentPage = parseInt(searchParms.get("page") as string) || 1;

  // get all categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllCategories();
        serCategories([{ _id: "all", name: "all", slug: "all" }, ...response]);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  // get all meals
  useEffect(() => {
    const fetchData = async () => {
      let response;
      if (categoryValue === "all" || categoryValue === "") {
        response = await getAllMeals(currentPage);
      } else {
        if (categories.length === 0) return;
        const categoryId = categories.find((cat) => cat.name === categoryValue)?._id;
        response = await getMealsByCategory(categoryId as string);
      }
      setMeals(response);
      setTotalPages(response.paggination.numberOfPages);
    };

    try {
      fetchData();
    } catch (err) {
      console.log(err);
    }
  }, [currentPage, categoryValue, categories]);

  useEffect(() => {
    if (meals) {
      const mappedCards = meals.data.map((meal) => {
        return (
          <Card key={meal._id} className="w-64 flex flex-col justify-between">
            <CardHeader>
              <img src={meal.image} />
            </CardHeader>
            <CardContent>
              <p>{meal.name}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <p>{formatPrice(meal.price)}</p>
              <Button>Add to cart</Button>
            </CardFooter>
          </Card>
        );
      });
      setMealsCards(mappedCards);
    }
  }, [meals]);

  const handlePaginationChange = useCallback(
    (page: number) => {
      if (searchParms.get("category")) {
        setSearchParams({
          category: searchParms.get("category") as string,
          page: page.toString(),
        });
      } else {
        setSearchParams({ page: page.toString() });
      }
    },
    [searchParms, setSearchParams]
  );

  const handleCategoryChange = (category: string) => {
    setSearchParams({ category: category });
  };

  useEffect(() => {
    if (totalPages > 0) {
      const mappedPagginationItems: JSX.Element[] = [];
      for (let i = 1; i <= totalPages; i++) {
        mappedPagginationItems.push(
          <PaginationItem key={i} onClick={() => handlePaginationChange(i)}>
            <PaginationLink>{i}</PaginationLink>
          </PaginationItem>
        );
      }
      setPaginationItems(mappedPagginationItems);
    }
  }, [handlePaginationChange, totalPages]);

  return (
    <div className="py-20 mx-auto text-center flex flex-col items-center space-y-6">
      <MaxWidthWrapper>
        <div className="flex justify-end mb-4">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[200px] justify-between"
              >
                {categoryValue
                  ? categories.find((category) => category.name === categoryValue)?.name
                  : "Select Category..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search Category..." />
                <CommandEmpty>No framework found.</CommandEmpty>
                <CommandGroup>
                  {categories.length > 0 &&
                    categories.map((category) => (
                      <CommandItem
                        key={category.name}
                        value={category.name}
                        onSelect={(currentValue) => {
                          setCategoryValue(currentValue === categoryValue ? "" : currentValue);
                          setOpen(false);
                          handleCategoryChange(category.slug);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            categoryValue === category.name
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {category.name}
                      </CommandItem>
                    ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {mealsCards}
        </div>
      </MaxWidthWrapper>
      {meals && (
        <Pagination>
          <PaginationContent>
            {currentPage > 1 && (
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => handlePaginationChange(currentPage - 1)}
                />
              </PaginationItem>
            )}
            {paginationItems}
            {currentPage < totalPages && (
              <PaginationItem>
                <PaginationNext
                  onClick={() => handlePaginationChange(currentPage + 1)}
                />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default Food;
