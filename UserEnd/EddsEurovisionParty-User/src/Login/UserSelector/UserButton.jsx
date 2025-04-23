import { Button } from "@/components/ui/button";
import { Grid } from "@mui/material";
import { APIUrl } from "@/APIUrl";
import axios from "axios";
export const UserButton = ({ user, setUserId }) => {
  const joinAsUser = async () => {
    const response = await axios.post(
      `${APIUrl}/session/user/join`,
      {
        id: user.id,
      },
      { withCredentials: true }
    );
    console.log("Response: ", response);
    if (response.status === 200) {
      await setUserId(user.id, user.name);
    } else {
      console.error("Error joining session: ", response);
    }
  };

  return (
    <Button
      className="bg-amber-300 w-full mt-2 p-8 hover:bg-amber-500"
      key={user.id}
      onClick={() => joinAsUser()}
    >
      <Grid container>
        <Grid item size={12}>
          <p className="text-xl w-full">{user.name}</p>
        </Grid>
        <Grid item size={12}>
          <p className=" text-m w-full text-slate-600 ">id {user.id}</p>
        </Grid>
      </Grid>
    </Button>
  );
};
