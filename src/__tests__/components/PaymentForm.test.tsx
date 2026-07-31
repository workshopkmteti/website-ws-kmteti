import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import PaymentForm from '@/components/PaymentForm';

describe('PaymentForm Component', () => {
    it('renders the payment form correctly', () => {
        render(<PaymentForm />);

        expect(screen.getByText('PAYMENT')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /SUBMIT/i })).toBeInTheDocument();
    });
});
