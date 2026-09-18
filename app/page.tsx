import { HeroBanner } from "@/components/home/HeroBanner";
import { ShelfRail } from "@/components/home/ShelfRail";
import { Diptych } from "@/components/home/Diptych";
import { RouteBoard } from "@/components/home/RouteBoard";
import { ClosingBanner } from "@/components/home/ClosingBanner";

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
