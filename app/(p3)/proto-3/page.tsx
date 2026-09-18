import { ThePull } from "@/proto3/components/home/ThePull";
import { TheSpread } from "@/proto3/components/home/TheSpread";
import { Printings } from "@/proto3/components/home/Printings";
import { ClosingStamp } from "@/proto3/components/home/ClosingStamp";

export default function HomePage() {
  return (
    <main>
      <ThePull />
      <TheSpread />
      <Printings />
      <ClosingStamp />
    </main>
  );
}
