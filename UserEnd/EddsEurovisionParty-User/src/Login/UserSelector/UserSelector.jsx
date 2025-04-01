import { Grid } from "@mui/material";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { UserButton } from "./UserButton";

export const UserSelector = ({ user, setUser }) => {
  const [name, setName] = useState("");
  const [userList, setUserList] = useState([
    { username: "Ewrdad", id: 1 },
    { username: "Ewrdad", id: 2 },
    { username: "Ewrdad", id: 3 },
  ]);

  const SetUserId = (id, name) => {
    setUser({ ...user, id: id, name: name });
  };

  return (
    <Grid container spacing={2} className="h-screen justify-center">
      <Grid item size={11} className="p-2">
        <Input
          placeholder="Enter your name"
          value={name}
          className=" bg-amber-300"
          onChange={(input) => setName(input.target.value)}
        />
        <Button
          variant="outlined"
          className="w-full bg-amber-600 hover:bg-amber-800 text-black text-xl p-4 mt-2 "
          onClick={() => setUser({ ...user, id: name || undefined })}
        >
          <p className="m-2 ">Join</p>
        </Button>
      </Grid>

      <Grid item size={12} className="h-full p-2 justify-center text-center">
        <h3> Or find your name below</h3>
        {userList.map((user) => (
          <UserButton user={user} setUserId={SetUserId} />
        ))}
      </Grid>
    </Grid>
  );
};
