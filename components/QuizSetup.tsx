
import React, { useState } from 'react';

interface QuizSetupProps {
  onStartQuiz: (topic: string) => void;
}

const PRESET_TOPICS = [
  { id: 'math', name: 'الرياضيات', icon: '🔢' },
  { id: 'science', name: 'العلوم الطبيعية', icon: '🧪' },
  { id: 'history', name: 'التاريخ العربي', icon: '📜' },
  { id: 'tech', name: 'الذكاء الاصطناعي', icon: '🤖' }
];

const QuizSetup: React.FC<QuizSetupProps> = ({ onStartQuiz }) => {
  const [customTopic, setCustomTopic] = useState('');

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-gray-900">اختر موضوع الاختبار</h2>
        <p className="mt-2 text-lg text-gray-600">يمكنك اختيار موضوع جاهز أو كتابة موضوعك الخاص</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {PRESET_TOPICS.map((topic) => (
          <button
            key={topic.id}
            onClick={() => onStartQuiz(topic.name)}
            className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all text-center group active:scale-95"
          >
            <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform">{topic.icon}</div>
            <div className="font-bold text-gray-800">{topic.name}</div>
          </button>
        ))}
      </div>

      <div className="relative py-4">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="px-3 bg-gray-50 text-sm text-gray-500 font-medium">أو اكتب موضوعاً مخصصاً</span>
        </div>
      </div>

      <form 
        onSubmit={(e) => { e.preventDefault(); if(customTopic.trim()) onStartQuiz(customTopic); }}
        className="flex flex-col sm:flex-row gap-3"
      >
        <input
          type="text"
          value={customTopic}
          onChange={(e) => setCustomTopic(e.target.value)}
          placeholder="مثال: كواكب المجموعة الشمسية..."
          className="flex-grow px-6 py-4 rounded-2xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none transition-all shadow-sm"
        />
        <button
          type="submit"
          disabled={!customTopic.trim()}
          className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold shadow-lg hover:bg-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ابدأ الاختبار
        </button>
      </form>
    </div>
  );
};

export default QuizSetup;
