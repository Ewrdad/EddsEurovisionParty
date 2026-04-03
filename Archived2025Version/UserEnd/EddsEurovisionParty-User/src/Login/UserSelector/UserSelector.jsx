import { Grid } from "@mui/material";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { UserButton } from "./UserButton";
import axios from "axios";
import { APIUrl } from "@/APIUrl";

export const UserSelector = ({ user, setUser }) => {
  const [name, setName] = useState("");
  const [userList, setUserList] = useState([
    { name: "Ewrdad", id: 1 },
    { name: "Ewrdad", id: 2 },
    { name: "Ewrdad", id: 3 },
  ]);

  const SetUserId = (id, name) => {
    setUser({ ...user, id: id, name: name });
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.post(
        `${APIUrl}/session/user`,
        {},
        { withCredentials: true }
      );
      const data = await response.data;
      console.log("Fetched users:", data);
      setUserList(data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, [user.id]);

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
          onClick={() => {
            try {
              axios
                .post(
                  `${APIUrl}/session/user/join`,
                  {
                    newName: name,
                  },
                  { withCredentials: true }
                )
                .then((response) => {
                  console.log("Response: ", response);
                  if (response.status === 200) {
                    setUser({ ...user, id: true, name: name });
                  } else {
                    console.error("Error joining session: ", response);
                  }
                })
                .catch((error) => {
                  console.error("Error joining session: ", error);
                });
              // setUser({ ...user, id: name || undefined });
            } catch (error) {
              console.error("Error joining session: ", error);
            }
          }}
        >
          <p className="m-2 ">Join</p>
        </Button>
      </Grid>

      <Grid item size={12} className="h-full p-2 justify-center text-center">
        <h3> Or find your name below</h3>
        {userList.map((user) => (
          <UserButton user={user} setUserId={SetUserId} />
        ))}
        <button
          onClick={() => {
            fetchUsers();
          }}
          className="bg-amber-600 hover:bg-amber-800 text-black text-xl p-4 mt-2"
        >
          Refresh
        </button>
      </Grid>
    </Grid>
  );
};
