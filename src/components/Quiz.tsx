import { useEffect, useRef, useState } from "react";
import type { QuizQuestion } from "../types";

export function Quiz({ questions, onDone }: { questions: QuizQuestion[]; onDone: (score: number, total: number) => void }) {
  const [answers, setAnswers] = useState<(number | null)[]>(() => questions.map(() => null));
  const reported = useRef(false);

  const finished = answers.every((a) => a !== null);
  const score = answers.filter((a, i) => a === questions[i].answer).length;

  useEffect(() => {
    if (finished && !reported.current) {
      reported.current = true;
      onDone(score, questions.length);
    }
  }, [finished, score, questions.length, onDone]);

  return (
    <section className="quiz" aria-label="Check your understanding">
      <h3>Did you understand?</h3>
      {questions.map((q, qi) => {
        const picked = answers[qi];
        return (
          <fieldset key={q.q} className="quiz-q">
            <legend>{q.q}</legend>
            <div className="quiz-options">
              {q.options.map((opt, oi) => {
                const state =
                  picked === null ? "" : oi === q.answer ? "correct" : oi === picked ? "wrong" : "dim";
                return (
                  <button
                    key={opt}
                    className={`quiz-opt ${state}`}
                    disabled={picked !== null}
                    onClick={() => setAnswers((a) => a.map((x, i) => (i === qi ? oi : x)))}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </fieldset>
        );
      })}
      {finished && (
        <p className="quiz-result" role="status">
          {score === questions.length ? "🎉 Perfect!" : `You got ${score} of ${questions.length}. Re-read the story and try again next time.`}
        </p>
      )}
    </section>
  );
}
