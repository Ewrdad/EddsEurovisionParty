const videoIDs = [
  "BFYcbGU1EA8?si=AzvDp2ZQgA_usIZi",
  "bfeVwy5cDDA?si=7eTFCjrWfmcXBRkv",
  "Agsourvg6wQ?si=KPJ9r_oRBlQDSVB0",
  "Z6W_NqnsL6Y?si=8TGV5U3dxlskXzhJ",
  "DXrIJzIVieI?si=pUTd2T1RkVVaA4q0",
  "TBXndg7wbc4?si=EJKItwHRsl8qJuWZ",
  "uSwY481PhxI?si=JnD4n9ym92bbHsn-",
  "RWk5fVH9XIY?si=NrYFlYotyUiVwTeR",
  "DwOyKMooU7o?si=YH1oSfZA92hxfbt3",
  "8ihGYAHKW5g?si=6iJHdiIAQOwhDTqG",
];

export const getRandomVideo = () => {
  const randomIndex = Math.floor(Math.random() * videoIDs.length);
  return videoIDs[randomIndex];
};
