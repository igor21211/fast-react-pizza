import { useSelector } from "react-redux";
import { RootState } from "../../services/store";

const Username = (): JSX.Element => {
  const username = useSelector((state: RootState) => state.user.username);
  if(!username) return <></>;
  return <div className="text-sm font-semibold hidden md:block">{username}</div>;
};

export default Username;
