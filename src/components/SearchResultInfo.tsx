import { Link } from "react-router-dom";

type Props = {
  total: number;
  city: string;
};

const SearchResultInfo = ({ total, city }: Props) => {
  return (
    <div className="text-xl font-bold flex flex-col gap-3 justify-between lg:items-center lg:flex-row">
      <span>
        {total} Restaurnt found in {city}
        <Link
          className="ml-1 text-sm font-semibold underline cursor-pointer text-blue-500"
          to="/"
        >
          Change Location
        </Link>
      </span>
      insert sort dropdown here
    </div>
  );
};

export default SearchResultInfo;
