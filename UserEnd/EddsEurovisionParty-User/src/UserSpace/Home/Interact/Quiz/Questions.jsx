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
];

export const getRandomQuestion = () => {
  const randomIndex = Math.floor(Math.random() * questions.length);
  return questions[randomIndex];
};
