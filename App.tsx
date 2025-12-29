
import React, { useState, useCallback } from 'react';
import { UserProfile, AppState, Quiz, UserAnswer } from './types';
import Layout from './components/Layout';
import Login from './components/Login';
import QuizSetup from './components/QuizSetup';
import QuizView from './components/QuizView';
import ResultView from './components/ResultView';
import ReviewView from './components/ReviewView';
import { generateQuiz } from './services/geminiService';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('LOGIN');
  const [user, setUser] = useState<UserProfile | null>(null);
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [answers, setAnswers] = useState<UserAnswer[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = (name: string) => {
    setUser({ name });
    setAppState('TOPIC_SELECTION');
  };

  const handleStartQuiz = async (topic: string) => {
    setAppState('LOADING');
    setError(null);
    try {
      const generatedQuiz = await generateQuiz(topic);
      setQuiz(generatedQuiz);
      setAppState('QUIZ');
    } catch (err: any) {
      setError(err.message || "حدث خطأ غير متوقع");
      setAppState('TOPIC_SELECTION');
    }
  };

  const handleCompleteQuiz = (finalAnswers: UserAnswer[]) => {
    setAnswers(finalAnswers);
    setAppState('RESULT');
  };

  const handleLogout = () => {
    setUser(null);
    setQuiz(null);
    setAnswers([]);
    setAppState('LOGIN');
  };

  const handleRestart = () => {
    setQuiz(null);
    setAnswers([]);
    setAppState('TOPIC_SELECTION');
  };

  const renderContent = () => {
    switch (appState) {
      case 'LOGIN':
        return <Login onLogin={handleLogin} />;
      case 'TOPIC_SELECTION':
        return (
          <>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-2xl mb-6 flex items-center justify-between">
                <span>{error}</span>
                <button onClick={() => setError(null)} className="text-red-900 font-bold">&times;</button>
              </div>
            )}
            <QuizSetup onStartQuiz={handleStartQuiz} />
          </>
        );
      case 'LOADING':
        return (
          <div className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-6">
            <div className="w-20 h-20 border-8 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">جاري إعداد أسئلة الاختبار...</h2>
              <p className="text-gray-500 mt-2">الذكاء الاصطناعي يقوم بصياغة الأسئلة خصيصاً لك</p>
            </div>
            <div className="flex gap-2">
              <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-100"></span>
              <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-200"></span>
            </div>
          </div>
        );
      case 'QUIZ':
        return quiz ? <QuizView quiz={quiz} onComplete={handleCompleteQuiz} /> : null;
      case 'RESULT':
        return quiz ? (
          <ResultView 
            quiz={quiz} 
            answers={answers} 
            onReview={() => setAppState('REVIEW')} 
            onRestart={handleRestart}
          />
        ) : null;
      case 'REVIEW':
        return quiz ? (
          <ReviewView 
            quiz={quiz} 
            answers={answers} 
            onBack={() => setAppState('RESULT')} 
          />
        ) : null;
      default:
        return null;
    }
  };

  return (
    <Layout userName={user?.name} onLogout={handleLogout}>
      {renderContent()}
    </Layout>
  );
};

export default App;
