import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import avaterOne from "../../assets/images/ava-1.jpg";
import avaterTwo from "../../assets/images/ava-2.jpg";
import avaterThree from "../../assets/images/ava-3.jpg";

const MyCarousel = () => {
  return (
    <Carousel
      opts={{ align: "start", loop: true }}
      plugins={[
        Autoplay({
          delay: 3000,
          stopOnInteraction: true,
        }),
      ]}
    >
      <CarouselContent>
        <CarouselItem>
          <p className="text-sm sm:text-base text-muted-foreground font-Istok">
            "Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Perferendis atque, quam minus totam maiores laborum! Impedit
            consectetur illum aliquid odit. Odit dolore ipsum quod debitis
            nostrum necessitatibus quis dolorem quas!"
          </p>
          <div className="mt-5 flex gap-5 items-center">
            <Avatar>
              <AvatarImage src={avaterOne} className="rounded object-cover" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <p>Jhon Doe</p>
          </div>
        </CarouselItem>
        <CarouselItem>
          <p className="text-sm sm:text-base text-muted-foreground font-Istok">
            "Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Perferendis atque, quam minus totam maiores laborum! Impedit
            consectetur illum aliquid odit. Odit dolore ipsum quod debitis
            nostrum necessitatibus quis dolorem quas!"
          </p>
          <div className="mt-5 flex gap-5 items-center">
            <Avatar>
              <AvatarImage src={avaterTwo} className="rounded object-cover" />
              <AvatarFallback>MM</AvatarFallback>
            </Avatar>
            <p>Mitchell March</p>
          </div>
        </CarouselItem>
        <CarouselItem>
          <p className="text-sm sm:text-base text-muted-foreground font-Istok">
            "Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Perferendis atque, quam minus totam maiores laborum! Impedit
            consectetur illum aliquid odit. Odit dolore ipsum quod debitis
            nostrum necessitatibus quis dolorem quas!"
          </p>
          <div className="mt-5 flex gap-8 items-center">
            <Avatar>
              <AvatarImage src={avaterThree} className="rounded object-cover" />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            <p>Steven Crock</p>
          </div>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
};

export default MyCarousel;