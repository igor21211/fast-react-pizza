import { useState } from "react";
import Button from "../../UI/Button";
import { useDispatch } from "react-redux";
import { updateName } from "./userSlice";
import { useNavigate } from "react-router-dom";

const CreateUser = (): JSX.Element => {
  const [username, setUsername] = useState<string>("");
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  function handleSubmit(e: React.FormEvent): void {
    e.preventDefault();
    dispatch(updateName(username));
    navigate("/menu");
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="mb-4 text-sm md:text-base text-stone-600">
        👋 Welcome! Please start by telling us your name:
      </p>

      <input
        type="text"
        placeholder="Your full name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-72 input mb-8"
      />

      {username !== "" && (
        <div>
            <Button type="primary" onClick={handleSubmit}>Start ordering</Button>
        </div>
      )}
    </form>
  );
};

export default CreateUser;
