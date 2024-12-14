import { Link } from "react-router-dom";
import SearchOrder from "../../UI/SearchOrder";
import Username from "../user/Username";

const Header = (): JSX.Element => {
  return (
    <header className="bg-yellow-400 uppercase px-4 py-3 border-b border-stone-500 sm:px-6 flex items-center justify-between">
      <Link to="/" className="tracking-widest">
        Fast React Pizza Co.
      </Link>
      <SearchOrder />
      <Username />
    </header>
  );
};

export default Header;
