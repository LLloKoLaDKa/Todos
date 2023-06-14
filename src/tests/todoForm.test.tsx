import { act, render, screen } from '@testing-library/react';
import ToDoForm from '../todoForm/todoForm';
import userEvent from '@testing-library/user-event';

test('Наличие кнопки добавления', () => {
	render(<ToDoForm />);

	const button = screen.getByText('Add');
	expect(button).toBeInTheDocument();
});

test('Наличие трёх состояний в Tab-вкладках', () => {
	render(<ToDoForm />);

	const allTab = screen.getByText('Add');
	expect(allTab).toBeInTheDocument();

	const activeTab = screen.getByText('Add');
	expect(activeTab).toBeInTheDocument();

	const completedTab = screen.getByText('Add');
	expect(completedTab).toBeInTheDocument();
});

test('Создание задачи', () => {
	render(<ToDoForm />);

	const input = screen.getByPlaceholderText('What needs to be done?');
	userEvent.type(input, 'Add new job');

	expect(screen.getByPlaceholderText('What needs to be done?')).toContainHTML('Add new job');
});

test('Проверка стилей двух состояний задачи', () => {
	render(<ToDoForm />);

	const activeTodo = screen.getByText('Тестовое задание');
	const completedToDo = screen.getByText('Прекрасный код');

	expect(activeTodo).toHaveClass('indentInsteadOfCompleted');
	expect(completedToDo).toHaveClass('todo_completed_item');
});