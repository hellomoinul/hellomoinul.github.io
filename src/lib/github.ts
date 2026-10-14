export const GITHUB_USERNAME = "hellomoinul";

// The topic tag YOU add on github.com repo > About > Topics.
// Only repos with this topic (plus ALWAYS_SHOW) appear as portfolio projects.
export const SHOWCASE_TOPIC = "showcase";

// Forks are hidden by default, except these two college projects
// you already showcase manually.
export const ALWAYS_SHOW = ["Tax-Management-System", "fantasy_cricket_app"];

// Never show these, even if tagged.
export const EXCLUDED_REPOS = ["hellomoinul", "hellomoinul.github.io"];

// Cover screenshots stored inside the project repos themselves (raw URLs).
// Add an entry here when you upload a screenshot to a repo — the
// Featured Projects card will use it instead of the gradient fallback.
export const REPO_COVERS: Record<string, string> = {
  "diabetes-risk-prediction":
    "https://raw.githubusercontent.com/hellomoinul/diabetes-risk-prediction/main/Public/Screenshot%202026-10-14%20194554.png",
};

export function getRepoCover(repoName: string): string | undefined {
  return REPO_COVERS[repoName];
}

export interface GithubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  fork: boolean;
  archived: boolean;
  homepage: string | null;
  language: string | null;
  topics: string[];
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  pushed_at: string;
  updated_at: string;
}

export interface GithubUser {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  blog: string | null;
  location: string | null;
  public_repos: number;
  followers: number;
  following: number;
}

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url, {
    headers: { Accept: "application/vnd.github+json" },
  });
  if (!res.ok) {
    throw new Error(`GitHub API ${res.status} for ${url}`);
  }
  return res.json() as Promise<T>;
}

export function fetchGithubUser(username = GITHUB_USERNAME): Promise<GithubUser> {
  return fetchJson<GithubUser>(`https://api.github.com/users/${username}`);
}

export function fetchGithubRepos(username = GITHUB_USERNAME): Promise<GithubRepo[]> {
  return fetchJson<GithubRepo[]>(
    `https://api.github.com/users/${username}/repos?per_page=100&sort=pushed&direction=desc`
  );
}

/** The single rule the bot follows. Edit constants above, not this function. */
export function isShowcaseRepo(repo: GithubRepo): boolean {
  if (EXCLUDED_REPOS.includes(repo.name)) return false;
  if (ALWAYS_SHOW.includes(repo.name)) return true;
  if (repo.fork) return false;
  if (repo.archived) return false;
  return repo.topics?.includes(SHOWCASE_TOPIC) ?? false;
}

export function getShowcaseRepos(all: GithubRepo[]): GithubRepo[] {
  return all.filter(isShowcaseRepo).sort((a, b) => +new Date(b.pushed_at) - +new Date(a.pushed_at));
}

export function getTotalStars(repos: GithubRepo[]): number {
  return repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0);
}

/** Top languages from repo.language field — no extra API calls needed. */
export function getTopLanguages(repos: GithubRepo[], limit = 6): { name: string; count: number }[] {
  const map = new Map<string, number>();
  for (const r of repos) {
    if (!r.language) continue;
    if (EXCLUDED_REPOS.includes(r.name)) continue;
    map.set(r.language, (map.get(r.language) || 0) + 1);
  }
  return [...map.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}
