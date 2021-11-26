import React, { useEffect, useRef, useState } from "react";
import ReactModal from "react-modal";
import Start from "../Start";

import styles from "./styles.module.css";

ReactModal.setAppElement("#root");

function Result({ score, setStep, highscores, getHighscores }) {
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const userName = useRef("");

	useEffect(() => {
		if (score > highscores[highscores.length - 1].score) {
			setModalIsOpen(true);
		}
		// eslint-disable-next-line
	}, []);

	function getMessage() {
		return score > highscores ? (
			<h1>You beat the high score!</h1>
		) : (
			<h1>Your score was enough to get on the high score table!</h1>
		);
	}

	function saveHighscore(name, score) {
		fetch("http://10.205.80.32:3001/highscores/addHighscore", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ name: name, score: score }),
		})
			.then((response) => response.json())
			.then((data) => getHighscores())
			.catch((error) => console.log(error));
	}

	return (
		<>
			<h1 className={styles.score}>Score: {score}</h1>
			{!modalIsOpen && (
				<Start
					text={"TRY AGAIN"}
					modalIsOpen={modalIsOpen}
					startGame={() => setStep(1)}
				/>
			)}
			<ReactModal
				className={styles.modal}
				overlayClassName={styles.modalOverlay}
				isOpen={modalIsOpen}
				onRequestClose={() => setModalIsOpen(false)}
			>
				{getMessage()}
				<form
					onSubmit={(e) => {
						e.preventDefault();
						saveHighscore(userName.current.value, score);
						setModalIsOpen(false);
					}}
				>
					<h2>Enter name:</h2>
					<input autoFocus={true} ref={userName} />
					<button>Submit</button>
				</form>
			</ReactModal>
		</>
	);
}

export default Result;
