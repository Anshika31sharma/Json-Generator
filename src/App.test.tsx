import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  test('renders the app and displays the initial elements', () => {
    render(<App />);
    expect(screen.getByText(/JSON Editor/i)).toBeInTheDocument();
    expect(screen.getByText(/Form Preview/i)).toBeInTheDocument();
  });

  test('displays error message for invalid JSON input', () => {
    render(<App />);
    const jsonEditor = screen.getByPlaceholderText('Enter your JSON schema here...');
    
    fireEvent.change(jsonEditor, { target: { value: '{invalid JSON}' } });
    expect(screen.getByText(/Invalid JSON/i)).toBeInTheDocument();
  });

  test('does not display an error for valid JSON input', () => {
    render(<App />);
    const jsonEditor = screen.getByPlaceholderText('Enter your JSON schema here...');
    
    fireEvent.change(jsonEditor, { target: { value: '{"formTitle": "Test Form", "fields": []}' } });
    expect(screen.queryByText(/Invalid JSON/i)).not.toBeInTheDocument();
  });

  test('renders form based on valid JSON input', () => {
    render(<App />);
    const jsonEditor = screen.getByPlaceholderText('Enter your JSON schema here...');
    
    const validJSON = `{
      "formTitle": "Test Form",
      "fields": [
        { "id": "name", "type": "text", "label": "Full Name", "required": true, "placeholder": "Enter your full name" }
      ]
    }`;
    
    fireEvent.change(jsonEditor, { target: { value: validJSON } });
    expect(screen.getByText(/Test Form/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
  });

  test('shows validation error when submitting empty required fields', () => {
    render(<App />);
    const jsonEditor = screen.getByPlaceholderText('Enter your JSON schema here...');
    
    const validJSON = `{
      "formTitle": "Test Form",
      "fields": [
        { "id": "email", "type": "email", "label": "Email Address", "required": true }
      ]
    }`;
    
    fireEvent.change(jsonEditor, { target: { value: validJSON } });
    const submitButton = screen.getByText(/Submit/i);
    
    fireEvent.click(submitButton);
    expect(screen.getByText(/This field is required/i)).toBeInTheDocument();
  });

  test('submits form data successfully when all fields are filled', () => {
    render(<App />);
    const jsonEditor = screen.getByPlaceholderText('Enter your JSON schema here...');
    
    const validJSON = `{
      "formTitle": "Test Form",
      "fields": [
        { "id": "name", "type": "text", "label": "Full Name", "required": true }
      ]
    }`;
    
    fireEvent.change(jsonEditor, { target: { value: validJSON } });
    const input = screen.getByLabelText(/Full Name/i);
    const submitButton = screen.getByText(/Submit/i);
    
    fireEvent.change(input, { target: { value: 'John Doe' } });
    fireEvent.click(submitButton)
    expect(screen.queryByText(/This field is required/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Form submitted successfully!/i)).toBeInTheDocument();
  });
});
