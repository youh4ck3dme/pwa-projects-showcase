import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { LanguageProvider, useLanguage } from '../context/LanguageContext';

const TestComponent = () => {
  const { language, setLanguage, t } = useLanguage();
  return (
    <div>
      <span data-testid="lang">{language}</span>
      <span data-testid="welcome">{t('projects', 'common')}</span>
      <button onClick={() => setLanguage('EN')}>Set EN</button>
      <button onClick={() => setLanguage('SK')}>Set SK</button>
    </div>
  );
};

describe('LanguageContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should default to "SK" language', () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );
    expect(screen.getByTestId('lang').textContent).toBe('SK');
  });

  it('should change language when setLanguage is called', () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );
    fireEvent.click(screen.getByText('Set EN'));
    expect(screen.getByTestId('lang').textContent).toBe('EN');
  });

  it('should provide correct translations for SK', () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );
    expect(screen.getByTestId('welcome').textContent).toContain('PROJEKTY');
  });

  it('should provide correct translations for EN', () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );
    fireEvent.click(screen.getByText('Set EN'));
    expect(screen.getByTestId('welcome').textContent).toContain('PROJECTS');
  });

  it('should return the key if translation is missing', () => {
    const MissingKeyComponent = () => {
      const { t } = useLanguage();
      return <span data-testid="missing">{t('non_existent_key', 'common')}</span>;
    };
    render(
      <LanguageProvider>
        <MissingKeyComponent />
      </LanguageProvider>
    );
    expect(screen.getByTestId('missing').textContent).toBe('non_existent_key');
  });

  it('should retain language after re-render (state persistence)', () => {
    const { rerender } = render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );
    fireEvent.click(screen.getByText('Set EN'));
    expect(screen.getByTestId('lang').textContent).toBe('EN');
    // Re-render does NOT reset the language within the same mounted provider
    rerender(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );
    // After re-render the local state is still EN
    expect(screen.getByTestId('lang').textContent).toBe('EN');
  });

  it('should handle nested translation objects correctly', () => {
    const NestedComponent = () => {
      const { t } = useLanguage();
      return <span data-testid="nested">{t('connected', 'tickers')}</span>;
    };
    render(
      <LanguageProvider>
        <NestedComponent />
      </LanguageProvider>
    );
    // Default language is SK, so the SK translation should be shown
    expect(screen.getByTestId('nested').textContent).toBe('LARSEN_EVANS_CORE_PRIPOJENÝ');
  });

  it('should toggle between SK and EN correctly multiple times', () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );
    fireEvent.click(screen.getByText('Set EN'));
    expect(screen.getByTestId('lang').textContent).toBe('EN');
    fireEvent.click(screen.getByText('Set SK'));
    expect(screen.getByTestId('lang').textContent).toBe('SK');
  });
});
