import { render, screen } from '@testing-library/react';
import AllDocuments from '../00-AllDocuments';

test('renders h1 "Documents"', () => {
    render(<AllDocuments />);

    const headingElement = screen.getByText(/Documents/i);
    expect(headingElement).toBeInTheDocument();
});