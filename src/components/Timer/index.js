import React, { useEffect, useState } from "react";

import styles from "./styles.module.css";
import Game from "../Game";
import Start from "../Start";
import Result from "../Result";

function Timer() {
	const [timer, setTimer] = useState(10);
	const [score, setScore] = useState(0);
	const [step, setStep] = useState(0);
	const [highscores, setHighscore] = useState([])

	function getHighscores(){
		fetch("http://10.205.80.32:3001/highscores/getHighscores")
		.then(response => response.json())
		.then(data => setHighscore(data))
		.catch(error => console.error(error))
	}

	useEffect(() => {
		getHighscores()		
	}, [])

	let style = {
		//conic - linear
		background: `
    conic-gradient(black ${100 - timer * 10}%, transparent 0%),
    conic-gradient(hsl(120, 100%, 25%) 0%, hsl(50, 100%, 30%)40%, hsl(30, 100%, 30%)60%, hsl(0, 100%, 25%)100%)
                `,
	};

	useEffect(() => {
		if(step === 1)
		setScore(0)
	}, [step])

	function getGameState() {
		switch (step) {
			case 0:
				return <Start text={"START"} startGame={() => setStep(1)} step={step} modalIsOpen={false}/>;
			case 1:
				return (
					<Game
						score={score}
						setScore={setScore}
						timer={timer}
						setTimer={setTimer}
						step={step}
						setStep={setStep}
					/>
				);
			case 2:
				return <Result score={score} getHighscores={getHighscores} step={step} setStep={setStep} highscores={highscores}/>;
			default:
				break;
		}
	}

	return (
		<div className={styles.timer} style={style}>
			<div className={styles.game}>{getGameState()}</div>
			<div className={styles.highscore}>
				<h2>High scores</h2>
				{highscores.map((highscore, i) => {
					return <p key={i}>{i+1}. {highscore.name}:<span>{highscore.score}</span></p>
				})}
				<p>16. Mark:<span>12</span></p>
			</div>
		</div>
	); 
}

export default Timer;
