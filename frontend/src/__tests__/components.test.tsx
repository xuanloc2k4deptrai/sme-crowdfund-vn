import React from 'react';
import { render, screen } from '@testing-library/react';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import CampaignCard from '../components/campaign/CampaignCard';
import CampaignForm from '../components/campaign/CampaignForm';

describe('Button Component', () => {
  test('renders button with correct text', () => {
    render(<Button text="Click Me" />);
    const buttonElement = screen.getByText(/Click Me/i);
    expect(buttonElement).toBeInTheDocument();
  });
});

describe('Modal Component', () => {
  test('renders modal with title', () => {
    render(<Modal title="Test Modal" isOpen={true} onClose={() => {}} />);
    const modalTitle = screen.getByText(/Test Modal/i);
    expect(modalTitle).toBeInTheDocument();
  });
});

describe('CampaignCard Component', () => {
  test('renders campaign card with title and description', () => {
    const campaign = {
      title: 'Campaign Title',
      description: 'Campaign Description',
    };
    render(<CampaignCard campaign={campaign} />);
    const titleElement = screen.getByText(/Campaign Title/i);
    const descriptionElement = screen.getByText(/Campaign Description/i);
    expect(titleElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
  });
});

describe('CampaignForm Component', () => {
  test('renders campaign form with submit button', () => {
    render(<CampaignForm />);
    const submitButton = screen.getByRole('button', { name: /Submit/i });
    expect(submitButton).toBeInTheDocument();
  });
});