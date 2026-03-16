import { fetchProjects } from '@/api/projects';
import ProjectsClient from './ProjectsClient';

export const metadata = {
  title: 'Projekty | PWA Vzorkovník',
  description: 'Prehľad našich najnovších realizácií a projektov s AI asistenciou.',
};

export default async function ProjectsPage() {
  try {
    const projects = await fetchProjects();

    return (
      <div className="container-tight pt-24 pb-16">
        <div className="border-b-2 border-black pb-12">
          <span className="label-system text-[10px] block mb-6">PROJECTS / REPOSITORY / V4.0</span>
          <h1 className="text-6xl font-black tracking-tighter max-w-4xl leading-[0.9]">
            ENGINEERING <br /> THE FUTURE <br /> <span className="text-silver">OF PWA.</span>
          </h1>
          <p className="mt-12 text-lg font-medium text-charcoal max-w-xl leading-snug uppercase tracking-tight">
            SYSTEMATIC COLLECTION OF ADVANCED WEB IMPLEMENTATIONS AND AI-DRIVEN ARCHITECTURES.
          </p>
        </div>

        <ProjectsClient initialProjects={projects || []} />
      </div>
    );
  } catch {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="text-2xl font-bold text-red-600">Chyba pri načítaní projektov</h2>
        <p className="text-gray-600 mt-2">Skontrolujte pripojenie k internetu alebo API URL.</p>
      </div>
    );
  }
}
