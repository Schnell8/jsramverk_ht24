import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import CreateDocument from '../01-CreateDocument';

test('renders h1 "Create Document"', () => {
    render(
        <Router>
            <CreateDocument />
        </Router>
    );

    const headingElement = screen.getByText(/Create Document/i);
    expect(headingElement).toBeInTheDocument();
});

test('title variable gets value when text is entered', async () => {
    const inputValue = 'Test Title';

    render(
        <Router>
            <CreateDocument />
        </Router>
    );

    const user = userEvent.setup();
    const titleInput = screen.getByLabelText('Title');

    await user.type(titleInput, inputValue);

    expect(titleInput).toHaveValue(inputValue);
});

test('content variable gets value when text is entered', async () => {
    const inputValue = 'Test content';

    render(
        <Router>
            <CreateDocument />
        </Router>
    );

    const user = userEvent.setup();
    const contentInput = screen.getByLabelText('Content');

    await user.type(contentInput, inputValue);

    expect(contentInput).toHaveValue(inputValue);
});