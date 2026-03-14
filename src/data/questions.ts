import { Question } from '../types';

export const questions: Question[] = [
  {
    id: 1,
    sentenceParts: ["", " tired, she still finished the report."],
    blanks: [
      {
        id: 0,
        options: [
          { id: 'a', text: 'Although', isCorrect: false },
          { id: 'b', text: 'Because', isCorrect: false },
          { id: 'c', text: 'Though', isCorrect: true },
          { id: 'd', text: 'Unless', isCorrect: false }
        ],
        explanation: {
          correctAnswer: 'Though / Although',
          rule: '让步状语从句。Though/Although 表示“尽管”，引导让步状语从句。注意：Though/Although 不能与 but 连用。',
          example: 'Though it was raining, they went out.',
          commonMistake: '混淆 because (原因) 和 although (让步)；在句中同时使用 although 和 but。'
        }
      }
    ],
    difficulty: '中级',
    category: '状语从句'
  },
  {
    id: 2,
    sentenceParts: ["The boy ", " is playing football is my brother."],
    blanks: [
      {
        id: 0,
        options: [
          { id: 'a', text: 'which', isCorrect: false },
          { id: 'b', text: 'who', isCorrect: true },
          { id: 'c', text: 'whom', isCorrect: false },
          { id: 'd', text: 'whose', isCorrect: false }
        ],
        explanation: {
          correctAnswer: 'who',
          rule: '定语从句。先行词是 The boy (人)，且在从句中作主语，应使用关系代词 who 或 that。',
          example: 'The girl who is singing is my sister.',
          commonMistake: '指人时误用 which；在从句作主语时误用 whom。'
        }
      }
    ],
    difficulty: '初级',
    category: '定语从句'
  },
  {
    id: 3,
    sentenceParts: ["I don't know ", " to do next."],
    blanks: [
      {
        id: 0,
        options: [
          { id: 'a', text: 'how', isCorrect: false },
          { id: 'b', text: 'what', isCorrect: true },
          { id: 'c', text: 'where', isCorrect: false },
          { id: 'd', text: 'when', isCorrect: false }
        ],
        explanation: {
          correctAnswer: 'what',
          rule: '宾语从句/疑问词+不定式。do 是及物动词，后面需要宾语，what 在不定式短语中充当 do 的宾语。',
          example: 'She told me what to buy.',
          commonMistake: '误用 how。how 是副词，在句中作状语，不能作 do 的宾语。'
        }
      }
    ],
    difficulty: '初级',
    category: '宾语从句'
  },
  {
    id: 4,
    sentenceParts: ["", " the homework, the student went out to play."],
    blanks: [
      {
        id: 0,
        options: [
          { id: 'a', text: 'Finish', isCorrect: false },
          { id: 'b', text: 'Finished', isCorrect: false },
          { id: 'c', text: 'To finish', isCorrect: false },
          { id: 'd', text: 'Having finished', isCorrect: true }
        ],
        explanation: {
          correctAnswer: 'Having finished',
          rule: '非谓语动词。现在分词的完成式表示动作发生在主句动作之前。学生先完成作业，再出去玩。',
          example: 'Having seen the film, I don\'t want to see it again.',
          commonMistake: '误用 To finish (表示目的) 或 Finished (表示被动)。'
        }
      }
    ],
    difficulty: '高级',
    category: '非谓语动词'
  },
  {
    id: 5,
    sentenceParts: ["This is the place ", " I visited last year."],
    blanks: [
      {
        id: 0,
        options: [
          { id: 'a', text: 'where', isCorrect: false },
          { id: 'b', text: 'which', isCorrect: true },
          { id: 'c', text: 'when', isCorrect: false },
          { id: 'd', text: 'who', isCorrect: false }
        ],
        explanation: {
          correctAnswer: 'which / that',
          rule: '定语从句。先行词是 the place (物)，且在从句中作 visit 的宾语，应使用 which 或 that。',
          example: 'The house which we built is strong.',
          commonMistake: '看到地点名词就直接选 where。where 在从句中作状语，而此处 visit 需要宾语。'
        }
      }
    ],
    difficulty: '中级',
    category: '定语从句'
  }
];
