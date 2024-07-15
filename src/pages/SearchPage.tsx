import { useParams } from "react-router-dom";

const SearchPage = () => {
  const { city } = useParams<{ city: string }>();

  return <span>User Searched for {city}</span>;
};

export default SearchPage;
