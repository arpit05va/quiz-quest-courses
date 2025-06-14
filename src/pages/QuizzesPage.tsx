
import DashboardWrapper from '@/components/DashboardWrapper';
import QuizzesList from '@/components/QuizzesList';

const QuizzesPage = () => {
  return (
    <DashboardWrapper title="Quizzes">
      <QuizzesList />
    </DashboardWrapper>
  );
};

export default QuizzesPage;
