import { render, screen } from '@testing-library/react';
import Header from '../Header';
import '@testing-library/jest-dom';

describe('Header', () => {
    // GET BY --> return true || false
    // Vérifie que le title passé en props est bien présent dans un heading --> getByText(/content/i)
    it('should render same text passed into title prop, getByText', () => {
        render(<Header title="My Header" />);
        const headingElement = screen.getByText(/my header/i);
        expect(headingElement).toBeInTheDocument();
    });

    // GET BY --> return true || false
    // Vérifie que le title passé en props est bien présent dans un heading --> getByRole("typeElement", {name: "content"}:facultatif)
    it('shouxld render same text passed into title prop, getByRole', () => {
        render(<Header title="My Header" />);
        const headingElement = screen.getByRole('heading', { name: 'My Header' });
        expect(headingElement).toBeInTheDocument();
    });

    // GET BY --> return true || false
    // Vérifie si un élement possède l'attribut title : title="Header" --> getByTitle("attibut name content")
    it('should render element with title attribut', () => {
        render(<Header />);
        const headingElement = screen.getByTitle('Header');
        expect(headingElement).toBeInTheDocument();
    });

    // GET BY --> return true || false
    // Vérifie par data-testid --> data-testid('header-2')
    it('should render element, data-testid', () => {
        render(<Header />);
        const headingElement = screen.getByTestId('header-2');
        expect(headingElement).toBeInTheDocument();
    });

    // GET ALL --> return Array
    // Vérifie si on a deux headings --> getAllByRole("typeElement")
    it('should render two headings', () => {
        render(<Header />);
        const headingElements = screen.getAllByRole('heading');
        expect(headingElements.length).toBe(2);
    });

    // FIND BY (ASYNC) --> return true || false
    // Vérifie si un élément possède "my header" de manière asynchrone.
    it("should render element attribut with 'my header' content, findBytext", async () => {
        render(<Header title="My Header" />);
        const headingElement = await screen.findByText(/my header/i); // On récupère l'élément possédant "my header" de manière asynchrone
        expect(headingElement).toBeInTheDocument();
    });

    // QUERY BY --> return true || false
    // Affirme qu'un élément n'est pas présent
    it('should render that text dogs is not in the document', () => {
        render(<Header title="My Header" />);
        const headingElement = screen.queryByText(/dogs/i);
        expect(headingElement).not.toBeInTheDocument();
    });
});
