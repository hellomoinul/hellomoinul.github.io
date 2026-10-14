import { useQuery } from "@tanstack/react-query";
import {
  DEFAULT_SKILL_CODES,
  GITHUB_USERNAME,
  fetchGithubRepos,
  fetchGithubUser,
  fetchProfileSkillCodes,
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

/**
 * Languages synced with the GitHub profile README LANGS block
 * (refreshed daily by its sync Action). Falls back to the last
 * known list when offline — same icons, same order, both places.
 */
export function useProfileSkills() {
  const query = useQuery({
    queryKey: ["profile-skills", GITHUB_USERNAME],
    queryFn: () => fetchProfileSkillCodes(),
    staleTime: 1000 * 60 * 60,
    retry: 1,
  });

  return {
    ...query,
    skillCodes: query.data ?? DEFAULT_SKILL_CODES,
    isLive: !!query.data,
  };
}
