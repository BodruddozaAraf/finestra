import { BoardFront } from "@/proto2/components/home/BoardFront";
import { StallWall } from "@/proto2/components/home/StallWall";
import { RatesBoard } from "@/proto2/components/home/RatesBoard";
import { ClosingBoard } from "@/proto2/components/home/ClosingBoard";

export default function HomePage() {
  return (
    <main>
      <BoardFront />
      <StallWall />
      <RatesBoard />
      <ClosingBoard />
    </main>
  );
}
