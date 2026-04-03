import { useNavigate } from "react-router-dom";
import { SessionJoiner } from "./SessionJoiner";
import { UserSelector } from "./UserSelector/UserSelector";
/**
 * MARK: User
 * @param {*} user
 * @param {*} setUser
 * @returns
 */
export const Login = ({ user, setUser }) => {
  const navigator = useNavigate();
  console.log(user);

  if (user.session === undefined) {
    return <SessionJoiner user={user} setUser={setUser} />;
  }
  if (user.id === undefined) {
    return <UserSelector user={user} setUser={setUser} />;
  }

  navigator("/user");
};
