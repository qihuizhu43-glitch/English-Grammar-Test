/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  XCircle, 
  ChevronRight, 
  RotateCcw, 
  Trophy, 
  BookOpen, 
  Zap,
  Music
} from 'lucide-react';
import { questions } from './data/questions';
import { UserAnswer, Question } from './types';

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestion = questions[currentIndex];

  const handleOptionSelect = (blankId: number, optionId: string) => {
    if (isSubmitted) return;
    
    const newAnswers = [...userAnswers];
    const existingIndex = newAnswers.findIndex(a => a.blankId === blankId);
    
    if (existingIndex > -1) {
      newAnswers[existingIndex] = { blankId, selectedOptionId: optionId };
    } else {
      newAnswers.push({ blankId, selectedOptionId: optionId });
    }
    
    setUserAnswers(newAnswers);
  };

  const handleSubmit = () => {
    if (userAnswers.length < currentQuestion.blanks.length) return;
    
    let correctCount = 0;
    currentQuestion.blanks.forEach((blank, idx) => {
      const answer = userAnswers.find(a => a.blankId === idx);
      const option = blank.options.find(o => o.id === answer?.selectedOptionId);
      if (option?.isCorrect) correctCount++;
    });

    if (correctCount === currentQuestion.blanks.length) {
      setScore(prev => prev + 1);
    }
    
    setIsSubmitted(true);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setUserAnswers([]);
      setIsSubmitted(false);
    } else {
      setShowScore(true);
    }
  };

  const resetGame = () => {
    setCurrentIndex(0);
    setUserAnswers([]);
    setIsSubmitted(false);
    setShowScore(false);
    setScore(0);
  };

  const getEncouragement = (finalScore: number) => {
    const ratio = finalScore / questions.length;
    if (ratio === 1) return "摇滚之神！语法满分！🎸";
    if (ratio >= 0.8) return "太酷了！你离语法大师只有一步之遥！🔥";
    if (ratio >= 0.6) return "节奏不错，继续保持！🤘";
    return "别灰心，多听几首摇滚，再来一遍！⚡";
  };

  return (
    <div className="min-h-screen rock-gradient flex flex-col items-center p-4 md:p-8 overflow-x-hidden">
      {/* Header */}
      <header className="w-full max-w-4xl flex justify-between items-center mb-8 border-b-2 border-rock-pink pb-4">
        <div className="flex items-center gap-2">
          <Music className="text-rock-pink animate-pulse" />
          <h1 className="text-3xl font-black italic tracking-tighter text-white uppercase">
            Rock<span className="text-rock-pink">Grammar</span>
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 text-xs font-bold uppercase tracking-widest opacity-70">
            <Zap size={14} className="text-yellow-400" />
            Junior High Edition
          </div>
          <div className="bg-rock-purple px-4 py-1 rounded-full border border-rock-neon text-sm font-bold">
            {currentIndex + 1} / {questions.length}
          </div>
        </div>
      </header>

      <main className="w-full max-w-4xl relative">
        <AnimatePresence mode="wait">
          {!showScore ? (
            <motion.div
              key={currentIndex}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              className="space-y-8"
            >
              {/* Question Metadata */}
              <div className="flex gap-3">
                <span className="bg-rock-pink text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-tighter">
                  {currentQuestion.difficulty}
                </span>
                <span className="bg-white/10 text-rock-neon text-[10px] font-bold px-2 py-1 rounded uppercase tracking-tighter border border-rock-neon/30">
                  {currentQuestion.category}
                </span>
              </div>

              {/* Sentence Display */}
              <div className="text-2xl md:text-4xl font-bold leading-relaxed bg-white/5 p-8 rounded-2xl border-l-8 border-rock-pink">
                {currentQuestion.sentenceParts.map((part, idx) => (
                  <React.Fragment key={idx}>
                    {part}
                    {idx < currentQuestion.blanks.length && (
                      <span className={`inline-block mx-2 min-w-[120px] border-b-4 transition-all duration-300 ${
                        isSubmitted 
                          ? (currentQuestion.blanks[idx].options.find(o => o.id === userAnswers.find(a => a.blankId === idx)?.selectedOptionId)?.isCorrect 
                              ? 'border-green-500 text-green-400' 
                              : 'border-red-500 text-red-400')
                          : 'border-rock-neon text-rock-pink'
                      }`}>
                        {userAnswers.find(a => a.blankId === idx)?.selectedOptionId 
                          ? currentQuestion.blanks[idx].options.find(o => o.id === userAnswers.find(a => a.blankId === idx)?.selectedOptionId)?.text 
                          : '______'}
                      </span>
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* Options Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentQuestion.blanks[0].options.map((option) => {
                  const isSelected = userAnswers.find(a => a.blankId === 0)?.selectedOptionId === option.id;
                  let btnClass = "rock-button p-4 text-left font-bold text-lg flex justify-between items-center ";
                  
                  if (isSubmitted) {
                    if (option.isCorrect) btnClass += "bg-green-600/30 border-2 border-green-500 text-green-100";
                    else if (isSelected) btnClass += "bg-red-600/30 border-2 border-red-500 text-red-100";
                    else btnClass += "bg-white/5 border border-white/10 opacity-50";
                  } else {
                    btnClass += isSelected 
                      ? "bg-rock-neon border-2 border-white text-white shadow-[0_0_15px_rgba(188,19,254,0.5)]" 
                      : "bg-rock-purple border border-rock-neon/50 hover:border-rock-pink text-white/80";
                  }

                  return (
                    <button
                      key={option.id}
                      onClick={() => handleOptionSelect(0, option.id)}
                      disabled={isSubmitted}
                      className={btnClass}
                    >
                      <span>{option.text}</span>
                      {isSubmitted && option.isCorrect && <CheckCircle2 size={20} className="text-green-400" />}
                      {isSubmitted && isSelected && !option.isCorrect && <XCircle size={20} className="text-red-400" />}
                    </button>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center pt-8">
                {!isSubmitted ? (
                  <button
                    onClick={handleSubmit}
                    disabled={userAnswers.length < currentQuestion.blanks.length}
                    className={`px-12 py-4 rounded-full font-black text-xl uppercase tracking-widest transition-all ${
                      userAnswers.length < currentQuestion.blanks.length
                        ? 'bg-white/10 text-white/30 cursor-not-allowed'
                        : 'bg-rock-pink text-white neon-border hover:scale-110 active:scale-95'
                    }`}
                  >
                    提交答案 SUBMIT
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    className="flex items-center gap-2 px-12 py-4 bg-white text-rock-dark rounded-full font-black text-xl uppercase tracking-widest hover:bg-rock-pink hover:text-white transition-all hover:scale-110"
                  >
                    {currentIndex < questions.length - 1 ? '下一题 NEXT' : '查看结果 RESULT'}
                    <ChevronRight />
                  </button>
                )}
              </div>

              {/* Explanation Card */}
              <AnimatePresence>
                {isSubmitted && (
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="explanation-card p-6 rounded-2xl mt-8"
                  >
                    <div className="flex items-center gap-2 mb-4 text-rock-pink">
                      <BookOpen size={24} />
                      <h3 className="text-xl font-black uppercase italic">详解卡片 ANALYSIS</h3>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <p className="text-rock-neon font-bold text-sm uppercase tracking-wider">正确答案 Correct Answer</p>
                        <p className="text-xl font-bold">{currentQuestion.blanks[0].explanation.correctAnswer}</p>
                      </div>
                      <div>
                        <p className="text-rock-neon font-bold text-sm uppercase tracking-wider">语法规则 Grammar Rule</p>
                        <p className="text-white/90">{currentQuestion.blanks[0].explanation.rule}</p>
                      </div>
                      <div className="bg-white/5 p-4 rounded-lg border-l-4 border-rock-neon">
                        <p className="text-rock-neon font-bold text-sm uppercase tracking-wider">例句 Example</p>
                        <p className="italic text-white/80">"{currentQuestion.blanks[0].explanation.example}"</p>
                      </div>
                      <div className="text-red-400 bg-red-400/10 p-4 rounded-lg">
                        <p className="font-bold text-sm uppercase tracking-wider">常见错误 Common Mistake</p>
                        <p className="text-sm">{currentQuestion.blanks[0].explanation.commonMistake}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center text-center space-y-8 py-12"
            >
              <div className="relative">
                <Trophy size={120} className="text-yellow-400 animate-bounce" />
                <div className="absolute inset-0 bg-yellow-400 blur-3xl opacity-20"></div>
              </div>
              
              <div className="space-y-2">
                <h2 className="text-6xl font-black italic tracking-tighter">
                  {score} <span className="text-rock-pink">/</span> {questions.length}
                </h2>
                <p className="text-2xl font-bold text-rock-neon">
                  {getEncouragement(score)}
                </p>
              </div>

              <div className="flex flex-col md:flex-row gap-4 w-full max-w-md">
                <button
                  onClick={resetGame}
                  className="flex-1 flex items-center justify-center gap-2 p-4 bg-rock-pink text-white rounded-xl font-bold hover:scale-105 transition-all"
                >
                  <RotateCcw size={20} />
                  再来一局 REPLAY
                </button>
                <a
                  href="https://www.google.com/search?q=junior+high+english+grammar+review"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 p-4 bg-white/10 text-white rounded-xl font-bold hover:bg-white/20 transition-all border border-white/20"
                >
                  <BookOpen size={20} />
                  复习链接 REVIEW
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="mt-auto py-8 text-center opacity-40 text-xs font-bold tracking-widest uppercase">
        Designed for Junior High Rockstars • 情境化选择与即时反馈
      </footer>
    </div>
  );
}
