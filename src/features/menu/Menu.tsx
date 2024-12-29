import { Navigate, useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import { IMenuItem } from "./types";
import MenuItem from "./MenuItem";
import { useSelector } from "react-redux";
import { RootState } from "../../services/store";

const Menu = (): JSX.Element => {
  const menu = useLoaderData() as IMenuItem[];
  const username = useSelector((state: RootState) => state.user.username);
  if(!username) return <Navigate to="/" />;
  return (
    <ul className="divide-y divide-stone-200 px-2">
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export async function loader(): Promise<IMenuItem[]> {
  const menu: IMenuItem[] = await getMenu();
  return menu;
}

export default Menu;
