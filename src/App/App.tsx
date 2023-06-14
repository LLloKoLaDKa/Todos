import React from 'react';
import ToDoForm from '../todoForm/todoForm';
import styles from './App.module.scss'

function App() {
	return (
		<div className={styles.app}>
			<div className={styles.title}>todos</div>
			<ToDoForm />
		</div>
	);
}

export default App;
