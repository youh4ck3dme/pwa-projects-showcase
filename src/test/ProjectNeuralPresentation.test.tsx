import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ProjectNeuralPresentation from '../components/molecules/ProjectNeuralPresentation';
import { LanguageProvider } from '../context/LanguageContext';
import type { ProjectCCT } from '@/types/project';

const mockProject: ProjectCCT = {
  id: 1,
  api_id: 101,
  project_title: 'Neural Test Project',
  project_tagline: 'Future Tech',
  project_desc: 'Comprehensive AI analysis of future systems.',
  project_content: 'Full content here.',
  project_type: 'AI Tool',
  project_category: 'AI',
  project_client: 'NexGen',
  project_date: '2026',
  project_link: 'https://nexgen.ai',
  project_img_id: 1,
  project_gal_id: '1,2',
  ai_tech_stack: ['React', 'Gemini', 'Tailwind'],
  ai_architecture: 'Micro-kernel',
  ai_market_intel: 'High yield potential.',
  suggested_budget: '$100k',
  suggested_timeline: '4 months'
};

const renderWithProvider = (ui: React.ReactNode) => {
  return render(
    <LanguageProvider>
      {ui}
    </LanguageProvider>
  );
};

describe('ProjectNeuralPresentation', () => {
  it('should not render when isOpen is false', () => {
    const { container } = renderWithProvider(
      <ProjectNeuralPresentation 
        project={mockProject} 
        isOpen={false} 
        onClose={() => {}} 
      />
    );
    expect(container.firstChild).toBeNull();
  });

  it('should render identity slide when isOpen is true', async () => {
    renderWithProvider(
      <ProjectNeuralPresentation 
        project={mockProject} 
        isOpen={true} 
        onClose={() => {}} 
      />
    );
    expect(await screen.findByText('01 / IDENTITY')).toBeInTheDocument();
    const title = await screen.findByTestId('slide-title');
    expect(title.textContent).toContain('Neural Test Project');
  });

  it('should navigate between slides', async () => {
    renderWithProvider(
      <ProjectNeuralPresentation 
        project={mockProject} 
        isOpen={true} 
        onClose={() => {}} 
      />
    );

    // Finding the next arrow button using data-testid
    const nextBtn = screen.getByTestId('next-slide');
    
    fireEvent.click(nextBtn);
    
    // Wait for the next slide to appear (AnimatePresence)
    expect(await screen.findByText('02 / ARCHITECTURE')).toBeInTheDocument();
    expect(await screen.findByText(/Micro-kernel/i)).toBeInTheDocument();
    
    // Check tech stack tags (case-insensitive)
    expect(await screen.findByText(/Gemini/i)).toBeInTheDocument();
  });

  it('should call onClose when Terminate Stream is clicked', () => {
    const onCloseMock = vi.fn();
    renderWithProvider(
      <ProjectNeuralPresentation 
        project={mockProject} 
        isOpen={true} 
        onClose={onCloseMock} 
      />
    );

    const closeBtn = screen.getByTestId('close-presentation');
    fireEvent.click(closeBtn);
    expect(onCloseMock).toHaveBeenCalled();
  });
});
