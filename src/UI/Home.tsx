import { useSelector } from "react-redux";
import CreateUser from "../features/user/CreateUser";
import { RootState } from "../services/store";
import { Navigate } from "react-router-dom";

const Home = (): JSX.Element => {
  const username = useSelector((state: RootState) => state.user.username);
  if(username) return <Navigate to="/menu" />;
  return (
    <div className="my-10 sm:my-16 text-center px-4">
      <h1 className="text-xl font-semibold mb-8 md:text-3xl">
        The best pizza.
        <br />
        <span className="text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      <CreateUser />
    </div>
  );
};

export default Home;
