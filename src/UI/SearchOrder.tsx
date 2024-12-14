import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchOrder = (): JSX.Element => {
  const [query, setQuery] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    if (!query) return;
    navigate(`/order/${query}`);
    setQuery("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Search order number"
        value={query}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setQuery(e.target.value)
        }
        className="w-28 rounded-full px-4 py-2 focus:outline-none focus:w-40 focus:ring focus:ring-opacity-50 focus:ring-yellow-500 placeholder:text-stone-400 text-sm  transition-all duration-300 sm:w-64 sm:focus:w-80"
      ></input>
    </form>
  );
};

export default SearchOrder;
