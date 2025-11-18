import QuizPageClient from '@/components/QuizPageClient';
import { getQuiz } from '@/lib/getQuiz';

export default async function QuizPage() {
  const quiz = await getQuiz();

  return <QuizPageClient quiz={quiz} />;
}
