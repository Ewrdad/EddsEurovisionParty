const questions = [
  {
    question:
      "This is the first year since when Montenegro has been in the contest?",
    answer: "2022",
  },
  {
    question:
      "Which city hosted the very first Eurovision Song Contest in 1956?",
    answer: "Lugano, Switzerland",
  },
  {
    question:
      "How many points did the UK give ABBA in the 1974 Eurovision Song Contest?",
    answer: "0 Points!",
  },
  {
    question: "How many people are allowed on stage during a performance?",
    answer: "6 people. No more. ",
  },
  {
    question: "Whats the highest place cyprus has ever achieved?",
    answer: "2nd place",
  },
  {
    question: "What are the two countries with the most wins?",
    answer: "Ireland and Sweden , with 7 wins each",
  },
  {
    question: "When did Australia first enter the contest?",
    answer: "2015",
  },
  {
    question: "Why was Georgia disqualified in 2009 contest held in Moscow?",
    answer:
      "As the song was called 'We Don't wanna put in'. Showing how Russia has always been dicks",
  },
  {
    question:
      "What saying was a common show of support for Ukraine in the past few years?",
    answer: "Slava Ukraini",
  },
  {
    question:
      "Finish the lyric from one of this years songs. Shake is not a drink, it's a...",
    answer: "state of mind",
  },
  {
    question:
      "In 2010 Lena won the contest with the song 'Satellite'. How did she describe her underwear?",
    answer: "They're blue, and [she] wore 'em just the other day",
  },
  {
    question:
      "Cyprus's song this year starts with 'I’ve got golden locks and eyes so captivating'. What colour is Theo Evans hair?",
    answer: "Brown",
  },
  {
    question:
      "What Finish Eurovision legend has both Erika Vikman and Tommy Cash made songs with?",
    answer:
      "Kaajia, Both songs are on the Eurovision songs to live by playlist",
  },
  {
    question: "What was the original name of Malta's entry now called Serving?",
    answer: "Kant, Meaning singing in Maltese",
  },
  {
    question: "What are the name of Swedens Loreens winning entries?",
    answer: "Euphoria and Tattoo",
  },
  {
    question:
      "This year we will see an instrument played live on stage, Which act is playing it",
    answer: "Lucio from Italy, playing the Harmonica",
  },
  {
    question:
      "In a year with Ick Komme, Milkshake man and the song formerly known as Kant, What edition of the contest is this?",
    answer: "69th edition, nice",
  },
  {
    question: "Where was Irelands entry boorn?",
    answer: "Norway",
  },
  {
    question:
      "Last year (2024) two musicians from diffrent acts started dating and have just released the song 'Mi amore'. Who are they?",
    answer:
      "Aiko from Czechia and the drummer of the band Magara who represented San marino",
  },
  {
    question:
      "What happened to 2024 winner Nemo's trophy right after they won on stage?",
    answer: "It broke, cutting their hand",
  },
  {
    question:
      "Which now world-famous Canadian singer once won Eurovision for Switzerland?",
    answer: "Celine Dion",
  },
];

export const getRandomQuestion = () => {
  const randomIndex = Math.floor(Math.random() * questions.length);
  return questions[randomIndex];
};
