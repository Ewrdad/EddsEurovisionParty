import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";
import { Grid } from "@mui/material";
import { Button } from "@/components/ui/button";
import { useState } from "react";

/**
 * MARK: SessionJoiner
 * @param {*} user
 * @param {*} setUser
 * @returns
 */
export const SessionJoiner = ({ user, setUser }) => {
  const [value, setValue] = useState("");
  return (
    <Grid
      container
      spacing={2}
      className="h-screen justify-center content-center"
    >
      <Grid item size={12} className="h-10">
        <h1 className="text-4xl text-center">Enter Session Code</h1>
      </Grid>
      <Grid item size={11} className="h-20 p-2 w-screen">
        <InputOTP
          maxLength={6}
          value={value}
          onChange={(input) => setValue(input)}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} className="bg-amber-300" />
            <InputOTPSlot index={1} className="bg-amber-300" />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={2} className="bg-amber-300" />
            <InputOTPSlot index={3} className="bg-amber-300" />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={4} className="bg-amber-300" />
            <InputOTPSlot index={5} className="bg-amber-300" />
          </InputOTPGroup>
        </InputOTP>
      </Grid>
      <Grid item size={10} className="h-10">
        <Button
          variant="outlined"
          onClick={() => setUser({ ...user, session: value || undefined })}
          className="w-full bg-amber-600 hover:bg-amber-800 text-black text-3xl p-6 "
        >
          <p className="m-2">Join</p>
        </Button>
      </Grid>
    </Grid>
  );
};
