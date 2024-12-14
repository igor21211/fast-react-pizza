import { useNavigate, useRouteError } from "react-router-dom";
import LinkButton from "./LinkButton";
interface ErrorProps {
  message: string;
}

const Error = (): JSX.Element => {
  const navigate = useNavigate();
  const err = useRouteError() as ErrorProps;

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{err.message}</p>
      <LinkButton to="error">&larr; Go back</LinkButton>

    </div>
  );
};

export default Error;
