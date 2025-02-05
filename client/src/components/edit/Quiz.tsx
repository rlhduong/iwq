import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import DeleteButton from '../DeleteButton';
import { v4 as uuidv4 } from 'uuid';
import AddButton from '../AddButton';

interface QuizProps {
  questions: Question[];
  setQuestions: (questions: Question[]) => void;
}

const Quiz = ({ questions, setQuestions }: QuizProps) => {
  const handleAddQuestion = () => {
    const newQuestion: Question = {
      questionId: uuidv4(),
      content: 'New question',
      answer: 0,
      image: '',
      options: ['correct'],
    };

    const newQuestions = [...questions, newQuestion];
    setQuestions(newQuestions);
  };

  const handleDeleteQuestion = (questionId: string) => {
    const newQuestions = questions.filter(
      (question) => question.questionId !== questionId
    );
    setQuestions(newQuestions);
  };

  const addOption = (questionId: string) => {
    const newQuestions = questions.map((question) =>
      question.questionId === questionId
        ? {
            ...question,
            options: [...question.options, 'new option'],
          }
        : question
    );
    setQuestions(newQuestions);
  };

  const editOption = (
    questionId: string,
    optionIndex: number,
    value: string
  ) => {
    const newQuestions = questions.map((question) =>
      question.questionId === questionId
        ? {
            ...question,
            options: question.options.map((option, index) =>
              index === optionIndex ? value : option
            ),
          }
        : question
    );

    setQuestions(newQuestions);
  };

  const deleteOption = (questionId: string, optionIndex: number) => {
    const newQuestions = questions.map((question) =>
      question.questionId === questionId
        ? {
            ...question,
            options: question.options.filter(
              (_, index) => index !== optionIndex
            ),
          }
        : question
    );

    setQuestions(newQuestions);
  };

  return (
    <div className="guide-edit__quiz">
      <div className="flex flex-col gap-4">
        {questions &&
          questions.map((question) => (
            <div
              className="guide-edit__quiz-question"
              key={question.questionId}
            >
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Is it accessible?</AccordionTrigger>
                  <AccordionContent>
                    Yes. It adheres to the WAI-ARIA design pattern.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <div className="mt-2">
                <DeleteButton
                  onClick={() => handleDeleteQuestion(question.questionId)}
                />
              </div>
            </div>
          ))}
      </div>
      <AddButton title="Add question" onClick={handleAddQuestion} />
    </div>
  );
};

export default Quiz;
