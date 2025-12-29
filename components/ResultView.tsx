
import React from 'react';
import { Quiz, UserAnswer } from '../types';

interface ResultViewProps {
  quiz: Quiz;
  answers: UserAnswer[];
  onReview: () => void;
  onRestart: () => void;
}

const ResultView: React.FC<ResultViewProps> = ({ quiz, answers, onReview, onRestart }) => {
  const correctCount = answers.filter(a => a.isCorrect).length;
  const percentage = Math.round((correctCount / quiz.questions.length) * 100);
  
  let feedback = "";
  let colorClass = "";
  if (percentage >= 90) { feedback = "ممتاز! أداء استثنائي"; colorClass = "text-green-600"; }
  else if (percentage >= 70) { feedback = "جيد جداً! عمل رائع"; colorClass = "text-blue-600"; }
  else if (percentage >= 50) { feedback = "نتيجة مقبولة، يمكنك التحسن"; colorClass = "text-yellow-600"; }
  else { feedback = "لا تحزن، حاول مرة أخرى"; colorClass = "text-red-600"; }

  return (
    <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-2xl border border-gray-100 text-center animate-fadeIn">
      <div className="mb-8 relative inline-block">
        <svg className="w-48 h-48 transform -rotate-90">
          <circle
            cx="96" cy="96" r="80"
            stroke="currentColor" strokeWidth="12"
            fill="transparent" className="text-gray-100"
          />
          <circle
            cx="96" cy="96" r="80"
            stroke="currentColor" strokeWidth="12"
            fill="transparent"
            strokeDasharray={2 * Math.PI * 80}
            strokeDashoffset={2 * Math.PI * 80 * (1 - percentage / 100)}
            className={`transition-all duration-1000 ease-out ${colorClass}`}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-extrabold text-gray-800">{percentage}%</span>
          <span className="text-gray-500 font-medium">الدرجة</span>
        </div>
      </div>

      <h2 className={`text-3xl font-bold mb-2 ${colorClass}`}>{feedback}</h2>
      <p className="text-gray-600 text-lg mb-8">
        لقد أجبت على <span className="font-bold">{correctCount}</span> من <span className="font-bold">{quiz.questions.length}</span> أسئلة بشكل صحيح.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          onClick={onReview}
          className="flex items-center justify-center gap-2 bg-indigo-50 text-indigo-700 border-2 border-indigo-200 hover:bg-indigo-100 py-4 px-6 rounded-2xl font-bold transition-all"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path>
          </svg>
          مراجعة الإجابات
        </button>
        <button
          onClick={onRestart}
          className="flex items-center justify-center gap-2 bg-indigo-600 text-white hover:bg-indigo-700 py-4 px-6 rounded-2xl font-bold shadow-lg transition-all"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
          </svg>
          اختبار جديد
        </button>
      </div>
    </div>
  );
};

export default ResultView;
