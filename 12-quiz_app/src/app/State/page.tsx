"use client";

import styles from "../../styles/page.module.css";
import { useState } from "react";
import questions from "../../data/questions";
import { checkAnswer } from "../../fuc/fuc";

export default function State() {
    const [category, setCategory] = useState("all");
    const [checkedStates, setCheckedStates] = useState(Array(questions.length).fill(false));
    const [selectedOptions, setSelectedOptions] = useState(Array(questions.length).fill(null)); // 각 질문에 대한 선택된 답변 상태

    const handleRadioChange = (index, option) => {
        const updatedSelectedOptions = [...selectedOptions];
        updatedSelectedOptions[index] = option; // 사용자가 선택한 옵션을 저장
        setSelectedOptions(updatedSelectedOptions);

        const updatedCheckedStates = [...checkedStates];
        updatedCheckedStates[index] = true;
        setCheckedStates(updatedCheckedStates);
    };

    const handleCheckAnswer = (index) => {
        const target = document.getElementsByClassName('question' + index)[0];
        const isCorrect = checkAnswer(selectedOptions[index], questions[index].correctAnswer); // 정답 확인
        if (isCorrect) {
            target.classList.add('right');
            target.classList.remove('wrong');
        } else {
            target.classList.remove('right');
            target.classList.add('wrong');
        }
    };

    const filteredQuestions = category === "all"
        ? questions
        : questions.filter(q => q.category === category);

    return (
        <div className={styles.page}>
            <select onChange={(e) => setCategory(e.target.value)}>
                <option value="all">All</option>
                <option value="math">Math</option>
                <option value="alphabet">Alphabet</option>
            </select>

            {filteredQuestions.map((q, index) => (
                <section key={index} className={'question question' + index}>
                    <p>{q.question}</p>
                    <ul>
                        {q.options.map((option, idx) => (
                            <li key={idx} className={idx === 1 ? styles.right : styles.wrong}>
                                <input
                                    type="radio"
                                    name={`option-${index}`}
                                    id={`option-${index}-${idx}`}
                                    onChange={() => handleRadioChange(index, option)} // 선택된 옵션 저장
                                />
                                <label htmlFor={`option-${index}-${idx}`}>{option}</label>
                            </li>
                        ))}
                    </ul>
                    {checkedStates[index] && (
                        <button onClick={() => handleCheckAnswer(index)}>답변을 확인하세요</button>
                    )}
                </section>
            ))}
        </div>
    );
}