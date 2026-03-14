import { useQuery } from '@tanstack/react-query';
import { fetchProjects, fetchProject } from '../api/projects';

export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
    staleTime: 5 * 60 * 1000,
  });
};

export const useProject = (id: string | number | undefined) => {
  return useQuery({
    queryKey: ['project', id],
    queryFn: () => fetchProject(id!),
    enabled: !!id,
  });
};
