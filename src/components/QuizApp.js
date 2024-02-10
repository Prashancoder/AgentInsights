import React, { useState, useEffect } from 'react';

const QuizApp = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      question: "What is the capital of France?",
      options: ["Paris", "London", "Berlin", "Rome"],
      correctAnswer: "Paris"
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Venus", "Mercury"],
      correctAnswer: "Mars"
    },
    {
      question: "What is the powerhouse of the cell?",
      options: ["Nucleus", "Cytoplasm", "Mitochondria", "Chloroplast"],
      correctAnswer: "Mitochondria"
    }
    // Add more questions here
  ];

  useEffect(() => {
    const savedScore = localStorage.getItem('quizScore');
    const savedQuestionIndex = localStorage.getItem('quizQuestionIndex');
    const savedLastQuestionIndex = localStorage.getItem('quizLastQuestionIndex');

    if (savedScore !== null && savedQuestionIndex !== null && savedLastQuestionIndex !== null) {
      setScore(parseInt(savedScore));
      setCurrentQuestionIndex(parseInt(savedQuestionIndex));
    } else {
      setCurrentQuestionIndex(0);
      setScore(0);
    }

    if (savedLastQuestionIndex !== null) {
      setCurrentQuestionIndex(parseInt(savedLastQuestionIndex));
    }
  }, []);

  const handleAnswerClick = (selectedOption) => {
    if (selectedOption === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }
    if (currentQuestionIndex === questions.length - 1) {
      setShowResults(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResults(false);
    localStorage.removeItem('quizLastQuestionIndex');
  };

  useEffect(() => {
    localStorage.setItem('quizScore', score);
    localStorage.setItem('quizQuestionIndex', currentQuestionIndex);
    localStorage.setItem('quizLastQuestionIndex', currentQuestionIndex);
  }, [score, currentQuestionIndex]);

  return (
    <div>
      {showResults ? (
        <div>
          <h2>Quiz Results</h2>
          <p>Your Score: {score} out of {questions.length}</p>
          <button onClick={handleRestartQuiz}>Restart Quiz</button>
        </div>
      ) : (
        <div>
          <h2>Welcome to the Quiz</h2>
          <p>Question {currentQuestionIndex + 1} of {questions.length}</p>
          <h3>{questions[currentQuestionIndex].question}</h3>
          <ul>
            {questions[currentQuestionIndex].options.map((option, index) => (
              <li key={index} onClick={() => handleAnswerClick(option)}>{option}</li>
            ))}
          </ul>
          <button onClick={() => handleAnswerClick()}>Next Question</button>
        </div>
      )}
    </div>
  );
};

export default QuizApp;
