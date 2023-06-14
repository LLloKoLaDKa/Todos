import { useState } from 'react'
import ToDo from '../domain/todos/todo';
import { id } from '../tools/id';
import styles from './todoForm.module.scss';
import TabBar from '../shared/tabs/tabs';
import Tab from '../domain/todos/tab/tab';
import { toDoType as todoType } from '../domain/todos/tab/todoType';

function ToDoForm() {

	const [toDoList, setToDoList] = useState<ToDo[]>([
		new ToDo(id(), 'Тестовое задание', false),
		new ToDo(id(), 'Прекрасный код', true),
		new ToDo(id(), 'Покрутие тестами', false)
	]);

	const [textValue, setTextValue] = useState<string>('');
	const [filter, setFilter] = useState(todoType.All);

	function toDoClickHandler(toDo: ToDo) {
		const updatedToDo = toDoList.find(td => td.id === toDo.id);
		if (!updatedToDo) { console.log('Произошла ошибка при закрытии ToDo'); return; }

		updatedToDo.isCompleted = !updatedToDo.isCompleted;
		setToDoList(oldArray => [...oldArray]);
	}

	function addButtonClickHanlder() {
		if (textValue === "") { alert('Введите название задачи'); return; }

		const newToDo = new ToDo(id(), textValue, false);
		setToDoList(oldArray => [...oldArray, newToDo]);
		setTextValue("");
	}

	function textChangeHandler(text: string) { setTextValue(text); }

	function todoListFilter(td: ToDo) {
		switch (filter) {
			case todoType.All: return true;
			case todoType.Active: return !td.isCompleted;
			case todoType.Completed: return td.isCompleted;
		}
	}

	return (
		<div className={styles.todo_container}>
			<div className={styles.todo_header}>
				<svg className={styles.arrow} viewBox="0 0 5 9">
					<path d="M0.419,9.000 L0.003,8.606 L4.164,4.500 L0.003,0.394 L0.419,0.000 L4.997,4.500 L0.419,9.000 Z" stroke="lightgray" stroke-width="0.1" fill="lightgray"></path>
				</svg>
				<input
					type='text'
					className={styles.text_input}
					value={textValue}
					placeholder='What needs to be done?'
					onChange={(e) => textChangeHandler(e.target.value)}
				/>
				<button
					type='button'
					className={styles.add_button}
					onClick={addButtonClickHanlder}
				>
					Add
				</button>
			</div>

			<div className={styles.todo_list}>
				{
					toDoList.filter(todoListFilter).length === 0
						?
						<p className={styles.emptyToDo}>
							There are no tasks
						</p>
						:
						toDoList.filter(todoListFilter).map((td, index) =>
							<div className={`${styles.todo_item} ${td.isCompleted && styles.todo_completed_item} `} key={td.id} onClick={() => toDoClickHandler(td)}>
								{
									td.isCompleted &&

									<svg className={`${!td.isCompleted ? styles.noDisplayCompleted : ''}`} xmlns="http://www.w3.org/2000/svg" id="expanded" enable-background="new 0 0 512 512" viewBox="0 0 512 512" width="30px">
										<>
											<g>
												<path d="m256 331.08c-4.73 0-9.219-2.093-12.259-5.718l-85.33-101.74c-5.678-6.771-4.793-16.862 1.978-22.541 6.77-5.678 16.862-4.793 22.541 1.978l73.049 87.098 179.744-215.077c5.667-6.779 15.757-7.684 22.538-2.017 6.78 5.667 7.683 15.757 2.017 22.537l-192 229.74c-3.037 3.634-7.527 5.735-12.263 5.74-.006 0-.01 0-.015 0z" fill="green"></path>
											</g>
											<g>
												<path d="m256 464c-114.691 0-208-93.309-208-208s93.309-208 208-208c43.359 0 84.927 13.234 120.209 38.271 7.206 5.114 8.902 15.102 3.789 22.308-5.114 7.206-15.102 8.903-22.309 3.789-29.839-21.175-65.003-32.368-101.689-32.368-97.047 0-176 78.953-176 176s78.953 176 176 176 176-78.953 176-176c0-18.506-2.857-36.723-8.493-54.146-2.72-8.408 1.892-17.428 10.3-20.148 8.411-2.717 17.428 1.893 20.147 10.299 6.666 20.61 10.046 42.141 10.046 63.995 0 114.691-93.309 208-208 208z" fill="green"></path>
											</g>
										</>
									</svg>
								}


								<div className={`${!td.isCompleted ? styles.indentInsteadOfCompleted : ''}`}>{td.title}</div>
							</div>)
				}
			</div>

			<div className={styles.todo_footer}>
				<div className={styles.items_left}>
					{toDoList.filter(td => !td.isCompleted).length} items left
				</div>

				<div>
					<TabBar
						tabs={[
							new Tab('All', () => { setFilter(todoType.All) }),
							new Tab('Active', () => { setFilter(todoType.Active) }),
							new Tab('Completed', () => { setFilter(todoType.Completed) }),
						]}
					/>
				</div>

				<div>
					Clear completed
				</div>
			</div>
		</div >
	)
}

export default ToDoForm;