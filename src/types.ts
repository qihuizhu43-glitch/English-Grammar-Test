export type Difficulty = '初级' | '中级' | '高级';

export interface GrammarOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Blank {
  id: number;
  options: GrammarOption[];
  explanation: {
    correctAnswer: string;
    rule: string;
    example: string;
    commonMistake: string;
  };
}

export interface Question {
  id: number;
  sentenceParts: string[]; // e.g., ["", " tired, she still finished the report."]
  blanks: Blank[];
  difficulty: Difficulty;
  category: string;
}

export interface UserAnswer {
  blankId: number;
  selectedOptionId: string;
}
