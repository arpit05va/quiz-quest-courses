
import React from 'react';
import { useParams } from 'react-router-dom';
import ProblemDetail from '@/components/ProblemDetail';

const ProblemDetailPage = () => {
  const { id } = useParams();
  
  return <ProblemDetail problemId={id || '1'} />;
};

export default ProblemDetailPage;
