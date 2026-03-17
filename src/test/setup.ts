import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock the Gemini client to avoid external API calls during tests
vi.mock('@/lib/gemini', () => ({
  geminiClient: {
    generateContent: vi.fn(),
    search: vi.fn(),
    analyzeData: vi.fn(),
  },
}));
