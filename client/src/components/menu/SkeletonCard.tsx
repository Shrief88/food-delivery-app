import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const SkeletonCard = () => {
  return (
    <Card className="w-64 flex flex-col justify-between">
      <CardHeader className="flex items-center">
        <Skeleton className="w-32 h-32 rounded-full" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 flex-grow mt-4" />
      </CardContent>
      <CardFooter className="flex justify-between">
        <Skeleton className="h-4 flex-grow mt-4"  />
      </CardFooter>
    </Card>
  );
};

export default SkeletonCard;
