
import React, { useState, useEffect } from 'react';
import { Quiz, QuestionType, UserAnswer } from '../types';

interface QuizViewProps {
  quiz: Quiz;
  onComplete: (answers: UserAnswer[]) => void;
}

const QuizView: React.FC<QuizViewProps> = ({ quiz, onComplete }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [timeLeft, setTimeLeft] = useState(30 * quiz.questions.length); // 30s per question

  const currentQuestion = quiz.questions[currentIdx];
  const progress = ((currentIdx + 1) / quiz.questions.length) * 100;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          handleNext(true); // Forced skip on time out
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [currentIdx]);

  const handleNext = (timeout = false) => {
    const answer = timeout ? "لم يتم الإجابة" : (selectedAnswer || "");
    const isCorrect = answer === currentQuestion.correctAnswer;
    
    const newAnswers = [
      ...userAnswers,
      { questionId: currentQuestion.id, selectedAnswer: answer, isCorrect }
    ];
    
    setUserAnswers(newAnswers);
    setSelectedAnswer(null);

    if (currentIdx < quiz.questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      onComplete(newAnswers);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full space-y-6">
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-sm font-bold text-indigo-600">سؤال {currentIdx + 1} من {quiz.questions.length}</div>
          <div className="w-32 sm:w-64 h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-500 transition-all duration-300" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
        <div className={`text-sm font-bold flex items-center gap-2 ${timeLeft < 10 ? 'text-red-500 animate-pulse' : 'text-gray-600'}`}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          {formatTime(timeLeft)}
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 transition-all min-h-[400px] flex flex-col">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-8 leading-relaxed">
          {currentQuestion.question}
        </h3>

        <div className="grid gap-4 flex-grow">
          {currentQuestion.type === QuestionType.MULTIPLE_CHOICE ? (
            currentQuestion.options?.map((option, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedAnswer(option)}
                className={`p-5 text-right rounded-xl border-2 transition-all flex items-center gap-4 ${
                  selectedAnswer === option 
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-md' 
                    : 'border-gray-100 hover:border-gray-300 hover:bg-gray-50 text-gray-700'
                }`}
              >
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                  selectedAnswer === option ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-gray-300'
                }`}>
                  {selectedAnswer === option && <div className="w-2 h-2 bg-white rounded-full"></div>}
                </div>
                <span className="font-medium text-lg">{option}</span>
              </button>
            ))
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {['صح', 'خطأ'].map((val) => (
                <button
                  key={val}
                  onClick={() => setSelectedAnswer(val === 'صح' ? "True" : "False")}
                  className={`p-8 text-center rounded-xl border-2 transition-all flex flex-col items-center gap-3 ${
                    (selectedAnswer === "True" && val === 'صح') || (selectedAnswer === "False" && val === 'خطأ')
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-md' 
                      : 'border-gray-100 hover:border-gray-300 hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <span className="text-4xl mb-2">{val === 'صح' ? '✅' : '❌'}</span>
                  <span className="font-bold text-xl">{val}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={() => handleNext()}
          disabled={selectedAnswer === null}
          className="mt-8 w-full py-4 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold rounded-xl shadow-lg transition-all active:scale-[0.98]"
        >
          {currentIdx === quiz.questions.length - 1 ? 'إنهاء الاختبار' : 'السؤال التالي'}
        </button>
      </div>
    </div>
  );
};

export default QuizView;
