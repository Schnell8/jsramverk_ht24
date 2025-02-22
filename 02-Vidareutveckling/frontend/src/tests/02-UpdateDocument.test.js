/*
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import UpdateDocument from '../02-UpdateDocument';

test('renders h1 "Update Document"', () => {
    render(
        <Router>
            <UpdateDocument />
        </Router>
    );

    const headingElement = screen.getByText(/Update Document/i);
    expect(headingElement).toBeInTheDocument();
});

test('title variable gets value when text is entered', async () => {
    const inputValue = 'Updated Title Test';

    render(
        <Router>
            <UpdateDocument />
        </Router>
    );

    const user = userEvent.setup();
    const titleInput = screen.getByLabelText('Title');

    await user.type(titleInput, inputValue);

    expect(titleInput).toHaveValue(inputValue);
});

test('content variable gets value when text is entered', async () => {
    const inputValue = 'Updated content test';

    render(
        <Router>
            <UpdateDocument />
        </Router>
    );

    const user = userEvent.setup();
    const contentInput = screen.getByLabelText('Content');

    await user.type(contentInput, inputValue);

    expect(contentInput).toHaveValue(inputValue);
});
*/