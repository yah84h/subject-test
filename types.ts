
export enum QuestionType {
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  TRUE_FALSE = 'TRUE_FALSE'
}

export interface Question {
  id: string;
  type: QuestionType;
  question: string;
  options?: string[]; // Only for MCQ
  correctAnswer: string; // For TF, it will be "True" or "False"
  explanation: string;
}

export interface Quiz {
  title: string;
  subject: string;
  questions: Question[];
}

export interface UserAnswer {
  questionId: string;
  selectedAnswer: string;
  isCorrect: boolean;
}

export interface UserProfile {
  name: string;
  grade?: string;
}

export type AppState = 'LOGIN' | 'TOPIC_SELECTION' | 'LOADING' | 'QUIZ' | 'RESULT' | 'REVIEW';
