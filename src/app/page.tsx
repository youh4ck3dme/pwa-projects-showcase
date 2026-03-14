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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
            Naše projekty <span className="text-primary-600">+ AI</span>
          </h1>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl">
            Prehľad našich najnovších realizácií podporený inteligentným vyhľadávaním a analýzou trhu.
          </p>
        </div>

        <ProjectsClient initialProjects={projects || []} />
      </div>
    );
  } catch (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="text-2xl font-bold text-red-600">Chyba pri načítaní projektov</h2>
        <p className="text-gray-600 mt-2">Skontrolujte pripojenie k internetu alebo API URL.</p>
      </div>
    );
  }
}
