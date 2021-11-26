import React, { useEffect, useRef, useState } from "react";
import rw from "random-words";

import styles from "./styles.module.css";

function Game({ timer, setTimer, step, setStep, score, setScore }) {
	let interval = useRef(null);

	const [word, setWord] = useState(rw({ exactly: 1, maxLength: 3 }));
	const userInput = useRef(null);

	const reduceTime = () => {
		if (timer > 0) {
			setTimer((current) => current - 1 / 60);
		} else {
			setStep(2);
			setTimer(10);
		}
	};

	useEffect(() => {
		interval.current = setInterval(() => {
			reduceTime();
		}, 1000 / 60);
		return () => clearInterval(interval.current);
	});

	return (
		<>
			<h1>{word}</h1>
			<textarea
				spellCheck={false}
				onPaste={(e) => e.preventDefault()}
				autoFocus={true}
				ref={userInput}
				onChange={(e) => {
					if (word[0] === e.target.value.replace(/\s+/g, " ").trim()) {
						e.target.value = "";
						setScore((current) => current + 1);
						setWord(
							rw({
								exactly: 1,
								wordsPerString: 1 + Math.floor(score / 20),
								maxLength: 3 + Math.floor((score % 20) / 4),
							})
						);
						setTimer(10);
					}
				}}
			/>
			<h2 className={styles.score}>Score: {score}</h2>
		</>
	);
}

export default Game;
