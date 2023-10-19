import { Button, Table } from "@radix-ui/themes";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoadingSkeleton = () => {
  const issues = [1, 2, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div>
      <h1>IssuesPage</h1>
      <div className="my-3">
        <Button size="3">
          <Link href={"/issues/new"}>Add New Issue</Link>
        </Button>
      </div>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row className="bg-blue-400">
            <Table.ColumnHeaderCell className="text-white">
              Title
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell text-white">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell text-white">
              Created At
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue}>
              <Table.Cell>
                <Skeleton />
                <div className="font-bold block md:hidden">
                  <Skeleton />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <Skeleton />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <Skeleton />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default LoadingSkeleton;
