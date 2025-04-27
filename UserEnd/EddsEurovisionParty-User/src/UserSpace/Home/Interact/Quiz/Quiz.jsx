import { Button } from "@/components/ui/button";
import { Nav } from "../Nav";
import { useEffect, useState } from "react";
import { getRandomQuestion } from "./Questions";

export const Quiz = () => {
  const [question, setQuestion] = useState("What is the capital of France?");
  const [answer, setAnswer] = useState("Paris");
  const [showAnswer, setShowAnswer] = useState(false);

  const newQuestion = () => {
    const question = getRandomQuestion();
    setQuestion(question.question);
    setAnswer(question.answer);
    setShowAnswer(false);
  };

  useEffect(() => {
    newQuestion();
  }, []);

  return (
    <>
      <div className="w-full bg-slate-800/60 p-5 text-white/70 text-3xl">
        {question}
      </div>
      {showAnswer ? (
        <div className="text-xl p-4 bg-amber-600/70">{answer}</div>
      ) : (
        <Button
          className="text-lg bg-amber-600/70 hover:bg-amber-800 w-full p-4"
          onClick={() => setShowAnswer(true)}
        >
          Show Answer
        </Button>
      )}

      <Button
        className="text-lg bg-amber-400/70 hover:bg-amber-800 w-full"
        onClick={() => newQuestion()}
      >
        New Question
      </Button>

      <Nav page={2} />
    </>
  );
};
