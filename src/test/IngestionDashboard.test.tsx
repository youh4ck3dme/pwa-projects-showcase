import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import IngestionDashboard from '../components/admin/IngestionDashboard';
import { LanguageProvider } from '../context/LanguageContext';

// Mock the LanguageContext useLanguage hook if needed, or wrap in provider
const renderWithProvider = (ui: React.ReactNode) => {
  return render(
    <LanguageProvider>
      {ui}
    </LanguageProvider>
  );
};

describe('IngestionDashboard', () => {
  it('should render the upload zone initially', () => {
    renderWithProvider(<IngestionDashboard />);
    expect(screen.getByText(/Nahrať ZIP/i) || screen.getByText(/Upload ZIP/i)).toBeInTheDocument();
    expect(screen.getByText(/DRAG & DROP PROJECT ZIP/i)).toBeInTheDocument();
  });

  it('should show processing state when start analysis is clicked', async () => {
    renderWithProvider(<IngestionDashboard />);
    
    // Mock file upload
    const file = new File(['test'], 'test.zip', { type: 'application/zip' });
    const input = screen.getByLabelText(/DRAG & DROP PROJECT ZIP/i) as HTMLInputElement || document.querySelector('input[type="file"]');
    
    if (input) {
      fireEvent.change(input, { target: { files: [file] } });
    }

    // Since START AI ANALYSIS button appears after file select
    const startBtn = await screen.findByText(/START AI ANALYSIS/i);
    expect(startBtn).toBeInTheDocument();
  });
});
