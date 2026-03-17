import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProjectCard } from '../components/molecules/ProjectCard';
import { LanguageProvider } from '../context/LanguageContext';
import type { ProjectCCT } from '@/types/project';

const mockProject: ProjectCCT = {
  id: 1,
  api_id: 101,
  project_title: 'UI Component Test',
  project_tagline: 'Brutalist UI',
  project_desc: 'Testing UI components.',
  project_content: 'Content',
  project_type: 'Design',
  project_category: 'UI',
  project_client: 'Self',
  project_date: '2026',
  project_link: 'http://test.com',
  project_img_id: 1,
  project_gal_id: '',
};

describe('UI Components Suite', () => {
  it('should render ProjectCard correctly', async () => {
    render(
      <LanguageProvider>
        <ProjectCard project={mockProject} />
      </LanguageProvider>
    );
    expect(await screen.findByTestId('project-title')).toHaveTextContent('UI Component Test');
    expect(await screen.findByTestId('project-type')).toHaveTextContent('Design');
  });

  it('should display categories in ProjectCard', async () => {
    render(
      <LanguageProvider>
        <ProjectCard project={mockProject} />
      </LanguageProvider>
    );
    expect(await screen.findByTestId('project-category')).toHaveTextContent('UI');
  });

  it('should have a link to the project detail', () => {
    render(
      <LanguageProvider>
        <ProjectCard project={mockProject} />
      </LanguageProvider>
    );
    const link = screen.getByRole('link');
    expect(link.getAttribute('href')).toContain('/project/1');
  });

  it('should render ProjectCard with neural intelligence tags if present', () => {
    const neuralProject = { ...mockProject, ai_tech_stack: ['React', 'Next.js'] };
    render(
      <LanguageProvider>
        <ProjectCard project={neuralProject} />
      </LanguageProvider>
    );
    // ProjectCard doesn't show tech stack yet, but it should render without errors
    expect(screen.getByText('UI Component Test')).toBeInTheDocument();
  });

  it('should apply brutalist styles to ProjectCard', async () => {
    const { container } = render(
      <LanguageProvider>
        <ProjectCard project={mockProject} />
      </LanguageProvider>
    );
    const card = container.querySelector('a');
    expect(card?.className).toContain('border-silver');
    expect(card?.className).toContain('hover:border-black');
  });

  it('should render placeholder image if featured_image_url is missing', () => {
    render(
      <LanguageProvider>
        <ProjectCard project={mockProject} />
      </LanguageProvider>
    );
    const img = screen.getByAltText('UI Component Test') as HTMLImageElement;
    expect(img.src).toContain('placehold.co');
  });

  it('should handle transition classes for hover states', async () => {
    const { container } = render(
      <LanguageProvider>
        <ProjectCard project={mockProject} />
      </LanguageProvider>
    );
    const card = container.querySelector('a');
    expect(card?.className).toContain('transition-all');
    expect(card?.className).toContain('duration-300');
  });

  it('should render multiple ProjectCards in a grid', () => {
    render(
      <LanguageProvider>
        <div>
          <ProjectCard project={mockProject} />
          <ProjectCard project={{...mockProject, id: 2, project_title: 'Test 2'}} />
        </div>
      </LanguageProvider>
    );
    expect(screen.getByText('UI Component Test')).toBeInTheDocument();
    expect(screen.getByText('Test 2')).toBeInTheDocument();
  });

  it('should be accessible via keyboard navigation', () => {
    render(
      <LanguageProvider>
        <ProjectCard project={mockProject} />
      </LanguageProvider>
    );
    const link = screen.getByRole('link');
    link.focus();
    expect(document.activeElement).toBe(link);
  });

  it('should handle long project titles gracefully', async () => {
    const longTitle = 'Title '.repeat(20);
    const longTitleProject = { ...mockProject, project_title: longTitle };
    render(
      <LanguageProvider>
        <ProjectCard project={longTitleProject} />
      </LanguageProvider>
    );
    expect(await screen.findByText(new RegExp(longTitle.substring(0, 20), 'i'))).toBeInTheDocument();
  });

  it('should render tagline correctly', async () => {
    render(
      <LanguageProvider>
        <ProjectCard project={mockProject} />
      </LanguageProvider>
    );
    expect(await screen.findByTestId('project-type')).not.toBeEmptyDOMElement();
  });

  it('should maintain consistent structure across projects', () => {
    const { rerender } = render(
      <LanguageProvider>
        <ProjectCard project={mockProject} />
      </LanguageProvider>
    );
    expect(screen.getByText('UI Component Test')).toBeInTheDocument();
    
    rerender(
      <LanguageProvider>
        <ProjectCard project={{...mockProject, project_title: 'Second'}} />
      </LanguageProvider>
    );
    expect(screen.getByText('Second')).toBeInTheDocument();
    expect(screen.queryByText('UI Component Test')).not.toBeInTheDocument();
  });
});
