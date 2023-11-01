import { Flex } from "@radix-ui/themes";
import LatestIssue from "./issues/LatestIssue";
import Pagination from "./issues/_components/Pagination";

export default function Home({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  return (
    <div>
      <LatestIssue />
    </div>
  );
}
