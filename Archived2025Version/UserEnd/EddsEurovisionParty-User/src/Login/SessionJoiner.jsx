import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";
import { Grid } from "@mui/material";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import axios from "axios";
import { APIUrl } from "@/APIUrl";

/**
 * MARK: SessionJoiner
 * @param {*} user
 * @param {*} setUser
 * @returns
 */
export const SessionJoiner = ({ user, setUser }) => {
  const [value, setValue] = useState("");
  const JoinSession = async () => {
    console.log("Joining session: ", value);
    const response = await axios.post(
      `${APIUrl}/session/join`,
      {
        sessionId: value,
      },
      { withCredentials: true }
    );
    console.log("Response: ", response);
    if (response.status === 200) {
      await setUser({ ...user, session: value });
    } else {
      console.error("Error joining session: ", response);
    }
  };

  useEffect(() => {
    const existingSession = async () => {
      const response = await axios.get(`${APIUrl}/sesh`, {
        withCredentials: true,
      });
      console.log("Response: ", response);
      if (response.status !== 200) {
        return;
      }
      if (response.data && response.data.userId && response.data.sessionId) {
        console.log("Existing session found: ", response.data);
        await setUser({
          session: response.data.sessionId,
          id: response.data.userId,
          name: response.data.username,
        });
      }
    };
    existingSession();
  }, [setUser, user]);

  return (
    <Grid
      container
      spacing={2}
      className="h-screen justify-center content-center text-white"
    >
      <Grid item size={12} className="h-10">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-shadow-lg">
          Enter Session Code
        </h1>
      </Grid>
      <Grid item size={11} className="h-20 p-2 w-screen flex justify-center">
        <InputOTP
          maxLength={6}
          value={value}
          onChange={(input) => setValue(input)}
        >
          <InputOTPGroup className="space-x-2">
            <InputOTPSlot
              index={0}
              className="bg-white/20 border-white/30 text-white text-2xl w-12 h-14 md:w-16 md:h-20 rounded-md"
            />
            <InputOTPSlot
              index={1}
              className="bg-white/20 border-white/30 text-white text-2xl w-12 h-14 md:w-16 md:h-20 rounded-md"
            />
          </InputOTPGroup>
          <InputOTPSeparator className="text-white/50 text-2xl mx-2 md:mx-3">
            -
          </InputOTPSeparator>
          <InputOTPGroup className="space-x-2">
            <InputOTPSlot
              index={2}
              className="bg-white/20 border-white/30 text-white text-2xl w-12 h-14 md:w-16 md:h-20 rounded-md"
            />
            <InputOTPSlot
              index={3}
              className="bg-white/20 border-white/30 text-white text-2xl w-12 h-14 md:w-16 md:h-20 rounded-md"
            />
          </InputOTPGroup>
          <InputOTPSeparator className="text-white/50 text-2xl mx-2 md:mx-3">
            -
          </InputOTPSeparator>
          <InputOTPGroup className="space-x-2">
            <InputOTPSlot
              index={4}
              className="bg-white/20 border-white/30 text-white text-2xl w-12 h-14 md:w-16 md:h-20 rounded-md"
            />
            <InputOTPSlot
              index={5}
              className="bg-white/20 border-white/30 text-white text-2xl w-12 h-14 md:w-16 md:h-20 rounded-md"
            />
          </InputOTPGroup>
        </InputOTP>
      </Grid>
      <Grid item size={10} className="h-auto mt-6 md:mt-8">
        <Button
          variant="outline"
          onClick={() => JoinSession()}
          className="w-full py-3 md:py-4 px-6 rounded-lg text-xl md:text-2xl font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-pink-300 transition-all duration-150 ease-in-out"
        >
          Join Session
        </Button>
      </Grid>
    </Grid>
  );
};
