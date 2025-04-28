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
];

export const getRandomQuestion = () => {
  const randomIndex = Math.floor(Math.random() * questions.length);
  return questions[randomIndex];
};
