import { HeroBanner } from "@/proto1/components/home/HeroBanner";
import { ShelfRail } from "@/proto1/components/home/ShelfRail";
import { Diptych } from "@/proto1/components/home/Diptych";
import { RouteBoard } from "@/proto1/components/home/RouteBoard";
import { ClosingBanner } from "@/proto1/components/home/ClosingBanner";

export default function HomePage() {
  return (
    <main>
      <HeroBanner />
      <ShelfRail />
      <Diptych />
      <RouteBoard />
      <ClosingBanner />
    </main>
  );
}
