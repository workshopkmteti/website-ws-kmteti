import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import RegisterForm from '@/components/RegisterForm';

describe('RegisterForm Component', () => {
    it('renders the registration form correctly', () => {
        render(<RegisterForm />);

        expect(screen.getByText('CHOOSE THE COURSE/COMPETITION')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /SUBMIT/i })).toBeInTheDocument();
    });
});
