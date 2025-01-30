/*
import { render, screen } from '@testing-library/react';
import Footer from '../Footer';

test('renders footer with copyright text and current year', () => {
    render(<Footer />);

    // Test if the copyright text is rendered
    const copyrightText = screen.getByText(/JSRAMVERK. All rights reserved./i);
    expect(copyrightText).toBeInTheDocument();

    // Test if the current year is rendered correctly
    const currentYear = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(currentYear, 'i'))).toBeInTheDocument();
});
*/