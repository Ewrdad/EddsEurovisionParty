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
  "KlgyrDQHFMU?si=_JL-uJJdn5W_n9Ae",
  "RzY9PBUEymc?si=RQ6Bu2k-e73MNneQ",
  "7yxHP2f1Adw?si=RIERlo8FluC_VI56",
  "9Vga_7_ldZI?si=slti6_OHOCJ5X9Cm",
  "8L4VbK5LWTc?si=eli5o_btqEcPjrc_",
  "6a1Ckm57twQ?si=anpzsN21RfNMgS2d",
  "Xlmscgft9BY?si=qg1XtStAmJW9ta_W",
  "4Nam1dKfmBI?si=qRRi_1lemdnRwUm7",
  "8MZjN8CMess?si=Y-YvqwfdXl5jx-Ct",
  "KyCpcZcQIV8?si=ZkcZpgLuEAvUFlEG",
  "nOGP-No6GFo?si=pG4d1Zhf9O7lBXx1",
  "8xgipQBeWYM?si=Pb9bxRwMup14Xo1n",
  "BqUIHbEYd9Y?si=oYZg_g0FAvednnUg",
  "_exYP3I7Qm8?si=nCeG-bVO4A_-y_fK",
  "BbvwheMuy9k?si=nOwluGPTgSRzOVhc",
  "4g2QMV2JgPY?si=Z7BU2uXVKoLYsdDL",
  "W4GgpZNJTvk?si=L6SHbeDQBZtF8PFA",
  "Ng_8e08SJEU?si=p7fpH139DzI6ac2Z",
  "bGX_WPZ8JR4?si=k3ykezPfVnqkqwdi",
  "LzYzb__0sj8?si=a3WICDdVt-n06gxZ",
  "Zw5vN5YI3H4?si=GsjipFUuVFf0KjM-",
  "CWDclqU-oVs?si=0z8uZEBWuD2_WpVG",
  "Ia3wlW1IWMc?si=ZeJh8Wx-mt-_VEQm",
  "5Db8P9blJOQ?si=D7sq4XFXSmGcmBU4",
  "1bEH4pjOseM?si=HJTf5UChbPKb2eYB",
  "s9BCc-b3i7o?si=Mm-1gxvNJAxqVrP6",
  "wDdOsgmXmeE?si=7W9kgHjWCAa-odOx",
  "qX_y_0nJ6kU?si=GmmK5bBou4rVBrH7",
  "nNm44Oa4BT8?si=XaBXWza56f0ekmg9",
  "hmDNWfzGUUA?si=xDkH3C-K75brdh0Z",
  "AtnGTcmrfoY?si=-ZECskEwNJVBUK4p",
  "Ev6_hFVA2Go?si=nj-w8jG4VCike1P-",
  "1p1nBwI2njU?si=QajeiAuzvXfXXkwr",
  "1HAgCZ-h1zA?si=e5CY7Cti95kgov7_",
  "SPvelDDXK0g?si=Fb_953zPc6QGeApK",
  "44hAetQ2nZk?si=qoY3VdLueYb9_x5Y",
  "nrck2YYj5Yo?si=o7vEj3NBhkNNi_rx",
  "msNIAQlJ7k0?si=qzwSY9KOJmi8C-H2",
  "nZI6xpv8Lsc?si=gkPZaze_12-pElvJ",
  "6RbnojsI0sg?si=9ACtGJ1gnaRdDaYb",
  "vNAh9aiHFFY?si=jd7xKagFihySQTVu",
  "1O2VQ-D1au0?si=bvCwzB3-a5kAyDFM",
  "Gx1U8VlMwm4?si=4uZPFey_Oqw8KHyJ",
  "WhBneQrIUlE?si=acfkECvQK5NZztIm",
  "9Lp3fwz9oU4?si=qqQuoyPQ7jb5cB8n",
  "Pzsdr5XUIiQ?si=GRQWeQezU45vzKT9",
  "m5l2pXAU8yU?si=v7zfpwUFPPiaeV0F",
  "Z4PB0pIQ3ag?si=VmPp9XxuYBxJyanQ",
  "F3Nz6D5Z_ak?si=fvKy55Upmgj2TMK3",
  "2k-xIYoW0h4?si=hdNWoJW1F0gq0Kyn",
  "aHESh1DkJiY?si=UA4rUXI93cULlEV2",
  "4ARXzllYz44?si=TGE3RwAzlJRBx81m",
  "p5QOWZln474?si=iAaemHcMj4mpltrw",
  "yrBp0h2rHiw?si=0IL4R0M5VeNqWHqn",
  "wMDRLpB6MiU?si=kyCLe1bSDHB5KvNc",
  "LXPJxG4hvBw?si=UkYRkpOqJ1-ivU-r",
  "H3YO1bY99ks?si=x48WnJmx_zjxfjkr",
  "4qKNM0g7OaM?si=guwOUovSZJwCPu8h",
  "HmU7F1Efuks?si=k6pCJJ_CdAmIXXub",
  "pwRahWIekqE?si=beTwEmnJBRqCkfYQ",
  "QKSg46LfmCU?si=rl64y7fq1nc4iZIf",
  "mb1Cj-Kw520?si=aIXzWQeBN-k6fTuV",
  "zoxIsVZOjWQ?si=377x2gW3e72r9-SC",
  "aTgqC3ukzCE?si=UWQyibHThjAFyx4s",
  "El34E26YXeM?si=3ufWYGXnNOzmQGWy",
  "y7Kf3TJ7vSc?si=TGIQ5iHwn6O_EK4o",
  "IN5i8GY_wcc?si=iKgRzJvBk--uFClx",
  "2-pMJnDLxzQ?si=8Ee-9wEKdcRa0BM6",
  "9nxSPaAr3Mc?si=P0cB07Y4dHFfVQeu",
  "4X1FoAguHoo?si=CdP03k3FsSHJyhHD",
  "DriiFzwoD_0?si=X5k1tULPRrju44U-",
  "6h5fSodHKT0?si=Nvm9wbKNjiZ8vK9D",
  "1zZg65H--DQ?si=T-KIhkvWQ3MTU2yw",
  "8KzioecljAk?si=v8-ZYw_q6YDZ-HlH",
  "LHeNy0m336Y?si=h_ZnV_n5mkLnokzL",
  "s35QOYnkz2I?si=utpqmouOSVyXLs0e",
  "GTPz-_q38hw?si=a1t1g19nWat54GcR",
];

export const getRandomVideo = () => {
  const randomIndex = Math.floor(Math.random() * videoIDs.length);
  return videoIDs[randomIndex];
};
