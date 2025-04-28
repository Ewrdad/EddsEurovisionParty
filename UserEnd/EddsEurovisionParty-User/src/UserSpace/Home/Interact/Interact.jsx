import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Spotify } from "./Spotify";
import { Quiz } from "./Quiz/Quiz";
import { Shorts } from "./Shorts";

export const Interact = () => {
  return (
    <>
      <Carousel
        opts={{
          align: "start",
          loop: true,
          startIndex: 0,
        }}
        className="w-full"
      >
        <CarouselContent>
          <CarouselItem>
            <Spotify />
          </CarouselItem>
          <CarouselItem>
            <Quiz />
          </CarouselItem>
          <CarouselItem>
            <Shorts />
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </>
  );
};
