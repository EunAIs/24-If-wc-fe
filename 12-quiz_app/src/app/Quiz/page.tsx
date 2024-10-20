"use client";

import styles from "../../styles/page.module.css"; // 스타일 적용
import { useState } from "react";
import questions from "../../data/questions"; // 질문 데이터 import
import { checkAnswer } from "../../fuc/fuc";

export default function Quiz() {
    const [category, setCategory] = useState("all"); // 선택된 카테고리 상태
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // 현재 문제 인덱스 상태
    const [userAnswers, setUserAnswers] = useState([]); // 사용자가 선택한 답변 저장
    const [quizComplete, setQuizComplete] = useState(false); // 퀴즈 완료 여부 상태
    const [correctCount, setCorrectCount] = useState(0); // 맞춘 문제 수
    const [quizStarted, setQuizStarted] = useState(false); // 퀴즈 시작 여부 상태

    const filteredQuestions = category === "all"
        ? questions
        : questions.filter(q => q.category === category);

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
        setCurrentQuestionIndex(0); // 카테고리 변경 시 첫 문제로 초기화
        setUserAnswers([]);
        setQuizComplete(false);
        setCorrectCount(0);
        setQuizStarted(false); // 퀴즈 시작 상태 초기화
    };

    const handleStartQuiz = () => {
        setQuizStarted(true); // 퀴즈 시작
        setCurrentQuestionIndex(0); // 문제 인덱스 초기화
    };

    const handleAnswerSelect = (option) => {
        setUserAnswers(prev => {
            const newAnswers = [...prev];
            newAnswers[currentQuestionIndex] = option; // 현재 문제에 대한 선택 저장
            return newAnswers;
        });
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < filteredQuestions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1); // 다음 문제로 이동
        } else {
            // 모든 문제를 푼 경우 결과 계산
            const correctAnswers = userAnswers.reduce((count, answer, index) => {
                return count + (checkAnswer(answer, filteredQuestions[index].correctAnswer) ? 1 : 0);
            }, 0);
            setCorrectCount(correctAnswers);
            setQuizComplete(true);
        }
    };

    return (
        <div className={styles.page}>
            <main>
                {!quizComplete ? (
                    <>
                        {!quizStarted ? (
                            <>
                                <select onChange={handleCategoryChange} value={category}>
                                    <option value="all">모든 카테고리</option>
                                    <option value="math">수학</option>
                                    <option value="alphabet">알파벳</option>
                                </select>
                                <button onClick={handleStartQuiz}>문제 풀기</button> {/* 문제 풀기 버튼 추가 */}
                            </>
                        ) : (
                            <>
                                {filteredQuestions.length > 0 && currentQuestionIndex < filteredQuestions.length && (
                                    <section className='question'>
                                        <p>{filteredQuestions[currentQuestionIndex].question}</p>
                                        <ul>
                                            {filteredQuestions[currentQuestionIndex].options.map((option, idx) => (
                                                <li key={idx} className={idx === 1 ? styles.right : styles.wrong}>
                                                    <input
                                                        type="radio"
                                                        name={`option-${currentQuestionIndex}`}
                                                        id={`option-${currentQuestionIndex}-${idx}`}
                                                        onChange={() => handleAnswerSelect(option)}
                                                        checked={userAnswers[currentQuestionIndex] === option} // 선택한 답변 체크
                                                    />
                                                    <label htmlFor={`option-${currentQuestionIndex}-${idx}`}>{option}</label>
                                                </li>
                                            ))}
                                        </ul>
                                        {userAnswers[currentQuestionIndex] && (
                                            <button onClick={handleNextQuestion}>다음</button>
                                        )}
                                    </section>
                                )}
                                <p>
                                    문제 {currentQuestionIndex + 1} / {filteredQuestions.length}
                                </p>
                            </>
                        )}
                    </>
                ) : (
                    <section className="quiz_result">
                        <h2>퀴즈 결과</h2>
                        <p>총 문제 수: {filteredQuestions.length}</p>
                        <p>맞춘 문제 수: {correctCount}</p>
                        <p>틀린 문제 수: {filteredQuestions.length - correctCount}</p>
                    </section>
                )}
            </main>
        </div>
    );
}
