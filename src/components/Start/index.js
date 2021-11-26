import React, { useEffect } from "react";

import styles from "./styles.module.css";

function Start({ text, startGame, modalIsOpen, step }) {
	function checkKeyPress(e) {
		if (!modalIsOpen && e.code === "Space") startGame();
	}

	useEffect(() => {
		if (modalIsOpen) document.removeEventListener("keyup", checkKeyPress);
		else document.addEventListener("keyup", checkKeyPress);
		return () => {
			document.removeEventListener("keyup", checkKeyPress);
		};
		// eslint-disable-next-line
	}, [step, modalIsOpen]);

	return (
		<>
			<button className={styles.startButton} onClick={startGame}>
				{text}
			</button>
		</>
	);
}

export default Start;
