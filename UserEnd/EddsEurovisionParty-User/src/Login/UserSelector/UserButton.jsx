import { Button } from "@/components/ui/button";
import { Grid } from "@mui/material";
export const UserButton = ({ user, setUserId }) => {
  return (
    <Button
      className="bg-amber-300 w-full mt-2 p-8 hover:bg-amber-500"
      key={user.id}
      onClick={() => setUserId(user.id)}
    >
      <Grid container>
        <Grid item size={12}>
          <p className="text-xl w-full">{user.username}</p>
        </Grid>
        <Grid item size={12}>
          <p className=" text-m w-full text-slate-600 ">id {user.id}</p>
        </Grid>
      </Grid>
    </Button>
  );
};
