import Pagination from "./issues/_components/Pagination";

export default function Home() {
  return (
    <div>
      <Pagination itemCount={100} pageSize={10} currentPage={9} />
    </div>
  );
}
