import { render, screen } from '@testing-library/react';
import TodoFooter from '../TodoFooter';
import '@testing-library/jest-dom';

import { BrowserRouter } from 'react-router-dom';

// On doit englober de BrowserRouter car dans TodoFooter il y a un Link
const MockTodoFooter = ({ numberOfIncompleteTasks }) => {
    return (
        <BrowserRouter>
            <TodoFooter numberOfIncompleteTasks={numberOfIncompleteTasks} />
        </BrowserRouter>
    );
};

describe('TodoFooter', () => {
    // Vérifie que le nombre de tâches complétées passées en props, correspond bien à la valeur affiché dans le footer
    it('should render the correct amount of incomplete tasks', async () => {
        render(<MockTodoFooter numberOfIncompleteTasks={5} />);
        const paragraphElement = screen.getByText(/5 tasks left/i);
        expect(paragraphElement).toBeInTheDocument();
    });

    // Vérifie que si il y'a 1 tache, on affiche bien "task" sans le "s" --> expect toBeInDocument()
    it('should render "task" when the number of incomplete tasks is one', async () => {
        render(<MockTodoFooter numberOfIncompleteTasks={1} />);
        const paragraphElement = screen.getByText(/1 task left/i);
        expect(paragraphElement).toBeInTheDocument();
    });

    // Vérifie que si il y'a 1 tache, on affiche bien "task" sans le "s" --> expect toBeTruthy()
    it('shoduld render "task" when the number of incomplete tasks is one', async () => {
        render(<MockTodoFooter numberOfIncompleteTasks={1} />);
        const paragraphElement = screen.getByText(/1 task left/i);
        expect(paragraphElement).toBeTruthy();
    });

    //Vérifie si le textContent du paragraphe ciblé correspond à '1 task left'
    it('shodduld render "task" when the number of incomplete tasks is one', async () => {
        render(<MockTodoFooter numberOfIncompleteTasks={1} />);
        const paragraphElement = screen.getByTestId('para');
        expect(paragraphElement.textContent).toBe('1 task left');
    });
});
