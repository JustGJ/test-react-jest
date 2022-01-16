import { render, screen, fireEvent } from '@testing-library/react';
import AddInput from '../AddInput';
import '@testing-library/jest-dom';

// TEST UNITAIRES

const mockedSetTodo = jest.fn(); // On précise que le setTodos est tout simplement une fonction

describe('AddInput', () => {
    // On devrait obtenir un élément de type input
    it('should render input element', async () => {
        render(<AddInput todos={[]} setTodos={mockedSetTodo} />);
        const inputElement = screen.getByPlaceholderText(/Add a new task here.../i);
        expect(inputElement).toBeInTheDocument();
    });

    // Lorsque l'on change l'input, on devrait récupèrer la valeur tapée.
    it('should be able to type in input', async () => {
        render(<AddInput todos={[]} setTodos={mockedSetTodo} />);
        const inputElement = screen.getByPlaceholderText(/Add a new task here.../i);

        fireEvent.change(inputElement, { target: { value: 'Go Grocery Shopping' } });

        expect(inputElement.value).toBe('Go Grocery Shopping');
    });

    // Lorsque l'on clique sur le button add, on devrait avoir la l'input remis à vide
    it('should have empty input when add button is clicked', async () => {
        render(<AddInput todos={[]} setTodos={mockedSetTodo} />);
        const inputElement = screen.getByPlaceholderText(/Add a new task here.../i);
        const buttonElement = screen.getByRole('button', { name: /Add/i });
        fireEvent.change(inputElement, { target: { value: 'Go Grocery Shopping' } });
        fireEvent.click(buttonElement);
        expect(inputElement.value).toBe('');
    });
});
