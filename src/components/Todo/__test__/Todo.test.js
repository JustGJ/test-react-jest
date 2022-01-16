import { fireEvent, render, screen } from '@testing-library/react';
import Todo from '../Todo';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';

// INTEGRATION

// On doit englober de BrowserRouter car dans Todo il y a le composant TodoFooter qui possède Link
const MockTodo = () => {
    return (
        <BrowserRouter>
            <Todo />
        </BrowserRouter>
    );
};

// Ajout de todo
const addTask = (tasks) => {
    const inputElement = screen.getByPlaceholderText(/Add a new task here.../i); // Recupère input par placeholder
    const buttonElement = screen.getByRole('button', { name: /Add/i }); // Récupère button par name
    tasks.forEach((task) => {
        fireEvent.change(inputElement, { target: { value: task } }); // On attribut à l'inputElement, la valeur 'Go Grocery Shopping'
        fireEvent.click(buttonElement); // Click sur le button Add
    });
};

describe('Todo', () => {
    // Vérifie que lorsque que l'on ajoute une todo dans l'input grâce au button, celle ci apparait bien dans notre liste
    it('should render same text passed into todoList by Input', () => {
        render(<MockTodo />);

        addTask(['Go Grocery Shopping']);

        const divElement = screen.getByText(/Go Grocery Shopping/i); // Elément à récuperer puis vérifier
        expect(divElement).toBeInTheDocument(); // Vérifie si l'élément est présent
    });

    // Vérifie que lorsque que l'on ajoute plusieurs todo, elles apparaissent bien dans notre liste
    it('should render multiple elements', () => {
        render(<MockTodo />);

        addTask(['Go Grocery Shopping', 'Pet my cat', 'Wash my Hands']);

        const divElements = screen.getAllByTestId('task-container'); // Elément à récuperer puis vérifier
        expect(divElements.length).toBe(3); // Vérifie si l'élément est présent
    });

    // Vérifie que lorsque la tache est ajouté, elle ne soit pas surligné (not compeleted)
    it('task should not have completed class when initially rendered', () => {
        render(<MockTodo />);

        addTask(['Go Grocery Shopping']);

        const divElement = screen.getByText(/Go Grocery Shopping/i);

        expect(divElement).not.toHaveClass('todo-item-active');
    });

    // Vérifie que lorsque la tache est ajouté puis que l'on click dessus, elle doit être surlignée (completed)
    it('task should have completed class when clicked', () => {
        render(<MockTodo />);

        addTask(['Go Grocery Shopping']);

        const divElement = screen.getByText(/Go Grocery Shopping/i);
        fireEvent.click(divElement);
        expect(divElement).toHaveClass('todo-item-active');
    });
});
