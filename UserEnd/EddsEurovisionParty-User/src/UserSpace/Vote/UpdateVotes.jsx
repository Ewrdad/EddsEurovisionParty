import axios from "axios";
import { APIUrl } from "@/APIUrl";

export const UpdateVotes = async (country, votes) => {
  const response = await axios.post(
    `${APIUrl}/vote`,
    {
      country: country,
      points: votes,
    },
    { withCredentials: true }
  );
  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error("Error updating votes: ", response);
  }
};
