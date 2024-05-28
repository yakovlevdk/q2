import styles from './app.module.css';
import data from './data.json';
import { useState } from 'react';

export const App = () => {
	const [steps, setSteps] = useState(data);
	const [activeIndex, setActiveIndex] = useState(0);
	const clickNext = () => {
		setActiveIndex(activeIndex + 1);
	};
	const clickPrevious = () => {
		setActiveIndex(activeIndex - 1);
	};
	const clickStart = () => {
		setActiveIndex(0);
	};
	const isStart = activeIndex === 0;
	const isEnd = activeIndex === data.length - 1;
	const addList = steps.map(({ id, title, content }, index) => {
		const isDone = index <= activeIndex ? styles.done : '';
		const isActive = index === activeIndex ? styles.active : '';
		return (
			<li
				key={id}
				className={styles['steps-item'] + ' ' + isActive + ' ' + isDone}
			>
				<button
					className={styles['steps-item-button']}
					onClick={() => setActiveIndex(index)}
				>
					{index + 1}
				</button>
				{title}
			</li>
		);
	});

	const nextButton = () => {
		if (isEnd) {
			return (
				<button className={styles.button} onClick={clickStart}>
					Начать сначала
				</button>
			);
		} else {
			return (
				<button className={styles.button} onClick={clickNext}>
					Далее
				</button>
			);
		}
	};

	const previousButton = () => {
		if (isStart) {
			return (
				<button className={styles.button} disabled>
					Назад
				</button>
			);
		} else {
			return (
				<button className={styles.button} onClick={clickPrevious}>
					Назад
				</button>
			);
		}
	};
	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<h1>Инструкция по готовке пельменей</h1>
				<div className={styles.steps}>
					<div className={styles['steps-content']}>
						{steps[activeIndex].content}
					</div>
					<ul className={styles['steps-list']}>{addList}</ul>
					<div className={styles['buttons-container']}>
						{previousButton()}
						{nextButton()}
					</div>
				</div>
			</div>
		</div>
	);
};
