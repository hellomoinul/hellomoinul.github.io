import { useQuery } from "@tanstack/react-query";
import {
  GITHUB_USERNAME,
  fetchGithubRepos,
  fetchGithubUser,
  getShowcaseRepos,
  getTopLanguages,
  getTotalStars,
} from "@/lib/github";

export function useGithubUser() {
  return useQuery({
    queryKey: ["github-user", GITHUB_USERNAME],
    queryFn: () => fetchGithubUser(),
    staleTime: 1000 * 60 * 60, // 1 hour — 60 req/hr unauthenticated limit
    retry: 1,
  });
}

export function useGithubRepos() {
  const reposQuery = useQuery({
    queryKey: ["github-repos", GITHUB_USERNAME],
    queryFn: () => fetchGithubRepos(),
    staleTime: 1000 * 60 * 60,
    retry: 1,
  });

  const all = reposQuery.data ?? [];
  const showcase = getShowcaseRepos(all);

  return {
    ...reposQuery,
    allRepos: all,
    showcaseRepos: showcase,
    showcaseCount: showcase.length,
    totalRepos: all.length,
    totalStars: getTotalStars(all),
    topLanguages: getTopLanguages(all),
  };
}
