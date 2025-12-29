
import React from 'react';
import { Quiz, UserAnswer, QuestionType } from '../types';

interface ReviewViewProps {
  quiz: Quiz;
  answers: UserAnswer[];
  onBack: () => void;
}

const ReviewView: React.FC<ReviewViewProps> = ({ quiz, answers, onBack }) => {
  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      <div className="flex items-center justify-between sticky top-20 bg-gray-50/90 backdrop-blur-sm py-4 z-10">
        <h2 className="text-2xl font-bold text-gray-800">مراجعة الإجابات</h2>
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-indigo-600 font-bold hover:bg-indigo-50 px-4 py-2 rounded-lg transition-all"
        >
          <span>العودة للنتيجة</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
        </button>
      </div>

      <div className="space-y-6">
        {quiz.questions.map((q, idx) => {
          const userAnswer = answers.find(a => a.questionId === q.id);
          const isCorrect = userAnswer?.isCorrect;
          
          const displayCorrectAnswer = q.type === QuestionType.TRUE_FALSE 
            ? (q.correctAnswer === "True" ? "صح" : "خطأ")
            : q.correctAnswer;
          
          const displayUserAnswer = q.type === QuestionType.TRUE_FALSE 
            ? (userAnswer?.selectedAnswer === "True" ? "صح" : userAnswer?.selectedAnswer === "False" ? "خطأ" : userAnswer?.selectedAnswer)
            : userAnswer?.selectedAnswer;

          return (
            <div key={q.id} className="bg-white rounded-2xl shadow-md border-r-4 p-6 overflow-hidden transition-all hover:shadow-lg" style={{ borderRightColor: isCorrect ? '#10b981' : '#ef4444' }}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-grow">
                  <div className="text-sm font-bold text-gray-400 mb-1">سؤال {idx + 1}</div>
                  <h4 className="text-lg font-bold text-gray-800 mb-4">{q.question}</h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div className={`p-4 rounded-xl border ${isCorrect ? 'bg-green-50 border-green-100' : 'bg-red-50 border-red-100'}`}>
                      <span className="block text-xs font-bold text-gray-500 uppercase mb-1">إجابتك</span>
                      <span className={`font-bold ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                        {displayUserAnswer || "لم يتم الاختيار"}
                      </span>
                    </div>
                    {!isCorrect && (
                      <div className="p-4 rounded-xl border bg-indigo-50 border-indigo-100">
                        <span className="block text-xs font-bold text-gray-500 uppercase mb-1">الإجابة الصحيحة</span>
                        <span className="font-bold text-indigo-700">
                          {displayCorrectAnswer}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <div className="flex items-center gap-2 mb-2 text-indigo-600 font-bold text-sm">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      التفسير التعليمي
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">{q.explanation}</p>
                  </div>
                </div>

                <div className={`shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${isCorrect ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                  {isCorrect ? (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                    </svg>
                  ) : (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReviewView;
