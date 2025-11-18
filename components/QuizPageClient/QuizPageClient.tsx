'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import {
  sFProDisplayMedium,
  sFProTextSemibold,
  sFProTextRegular,
  roboto,
} from '@/lib/fonts';
import text from '@/lib/text-en.json';

export default function QuizPageClient({ quiz }: { quiz: any }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [loadedQuiz, setLoadedQuiz] = useState<any>(quiz);
  const [answers, setAnswers] = useState<{ [key: string]: any }>({});
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const indexParam = searchParams.get('q');
    if (indexParam) {
      const idx = parseInt(indexParam, 10);
      if (!isNaN(idx) && idx >= 0 && idx < loadedQuiz.questions.length) {
        setCurrentIndex(idx);
      }
    }
  }, [searchParams, loadedQuiz]);

  useEffect(() => {
    router.replace(`${pathname}?q=${currentIndex}`);
  }, [currentIndex, router, pathname]);

  useEffect(() => {
    setLoadedQuiz(quiz);
  }, [quiz]);

  if (!loadedQuiz) return <div>Loading quiz...</div>;

  const question = loadedQuiz.questions[currentIndex];
  if (!question) return <div>Quiz finished!</div>;

  const isVisible =
    !question.visibleIf ||
    question.visibleIf.every(
      (rule: any) => answers[rule.questionId] === rule.equals
    );

  const getNextIndex = (step: number) => {
    let next = currentIndex + step;
    while (next >= 0 && next < loadedQuiz.questions.length) {
      const q = loadedQuiz.questions[next];
      const visible =
        !q.visibleIf ||
        q.visibleIf.every(
          (rule: any) => answers[rule.questionId] === rule.equals
        );
      if (visible) return next;
      next += step;
    }
    return null;
  };

  const prevIndex = getNextIndex(-1);
  const nextIndex = getNextIndex(1);

  const totalQuestions = loadedQuiz.questions.length;
  const progressPercentage = Math.round(
    ((currentIndex + 1) / totalQuestions) * 100
  );

  const handleAnswer = (questionId: string, value: any) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));

    if (question.type === 'single_choice') {
      const next = getNextIndex(1);
      if (next !== null) {
        setCurrentIndex(next);
      } else {
        alert('Quiz finished!');
      }
    }
  };

  return (
    <div className='w-full'>
      <div className='shadow-[0_8px_24px_0_rgba(0,0,0,0.04)]'>
        <div className='max-w-7xl w-[90%] mx-auto flex justify-between text-sm mb-1'>
          <div className='h-14 flex justify-start'>
            {prevIndex !== null && (
              <button
                onClick={() => setCurrentIndex(prevIndex)}
                className='flex items-center gap-3 font-semibold text-[14px] leading-5 hover:cursor-pointer'
              >
                <Image
                  src='/icons/chevron-left.svg'
                  alt={`${text.imagesAndIcons.chevronLeft}`}
                  width={7.41}
                  height={12}
                />
                {text.buttons.back}
              </button>
            )}
          </div>

          <div className='flex items-center gap'>
            <p className='font-normal text-[14px] leading-5 tracking-[0%]'>
              <span className='font-bold'>{currentIndex + 1}</span>{' '}
              {`${text.labels.of}`} {totalQuestions}{' '}
            </p>
          </div>
        </div>

        <div className='w-full h-0.5 bg-grey-200'>
          <div
            className='h-0.5 bg-purple-a-700 transition-all'
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {isVisible && (
        <div className='w-[90%] md:w-[70%] lg:w-[736px] lg:h-[calc(100vh-62px)] lg:flex lg:flex-col justify-center items-center mx-auto mt-7 lg:mt-0'>
          <h1
            className={`${sFProDisplayMedium.className} text-[28px] lg:text-[40px] lg:text-center leading-9 text-grey-900 mb-5`}
          >
            {question.text}
          </h1>

          {question.type === 'single_choice' && (
            <div className='space-y-3 mt-4 lg:w-[352px]'>
              {question.options?.map((opt: any) => {
                const isSelected = answers[question.id] === opt.value;

                return (
                  <button
                    key={opt.value}
                    type='button'
                    onClick={() => handleAnswer(question.id, opt.value)}
                    className={`
                      ${sFProTextSemibold.className}
                      relative w-full flex justify-between items-center
                      border h-14 px-4 rounded-lg
                      ${
                        isSelected
                          ? 'border-2 border-purple-a-700'
                          : 'border-gray-300'
                      }
                      hover:cursor-pointer transition
                    `}
                  >
                    <span className='text-left text-[15px] lg:text-[16px] text-grey-900 leading-5'>
                      {opt.label}
                    </span>
                    <Image
                      src='/icons/arrow-right.svg'
                      alt={`${text.imagesAndIcons.chevronLeft}`}
                      width={16}
                      height={16}
                    />
                  </button>
                );
              })}
            </div>
          )}

          {question.type === 'number' && (
            <div className='lg:w-[352px]'>
              <input
                type='number'
                placeholder={`${text.placeholders.numberInput}`}
                className={`${
                  sFProTextRegular.className
                } w-full h-14 mt-4 rounded-lg rotate-0 bg-[rgba(33,33,33,0.04)] text-[16px] leading-6 tracking-normal outline-none px-4 ${
                  answers[question.id]
                    ? 'border-2 border-purple-a-700'
                    : 'border-2 border-[rgba(246,246,246,1)]'
                }`}
                value={answers[question.id] ?? ''}
                min={question.validation?.min}
                max={question.validation?.max}
                onChange={(e) =>
                  setAnswers((prev) => ({
                    ...prev,
                    [question.id]: Number(e.target.value),
                  }))
                }
              />

              <div className='flex justify-end mt-4'>
                {nextIndex !== null ? (
                  <button
                    className={`${
                      roboto.className
                    } w-full h-12 lg:h-12 flex items-center justify-center rounded-lg text-center font-bold leading-6 tracking-[0%] mt-5 ${
                      answers[question.id]
                        ? 'bg-purple-a-700 text-white cursor-pointer shadow-[0_16px_32px_0_rgba(170,0,255,0.24)]'
                        : 'bg-grey-200 text-[rgba(33,33,33,0.24)] cursor-not-allowed'
                    }`}
                    onClick={() => setCurrentIndex(nextIndex)}
                    disabled={!answers[question.id]}
                  >
                    {text.buttons.next}
                  </button>
                ) : (
                  <button
                    className={`${
                      roboto.className
                    } w-full h-12 lg:h-12 flex items-center justify-center rounded-lg text-center font-bold leading-6 tracking-[0%] mt-5 ${
                      answers[question.id]
                        ? 'bg-purple-a-700 text-white cursor-pointer shadow-[0_16px_32px_0_rgba(170,0,255,0.24)]'
                        : 'bg-grey-200 text-[rgba(33,33,33,0.24)] cursor-not-allowed'
                    }`}
                    onClick={() => {
                      if (nextIndex !== null) {
                        setCurrentIndex(nextIndex);
                      } else {
                        alert(`${text.alerts.quizFinished}`);
                      }
                    }}
                    disabled={!answers[question.id]}
                  >
                    {nextIndex !== null
                      ? `${text.buttons.next}`
                      : `${text.buttons.finish}`}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
