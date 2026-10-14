export const GITHUB_USERNAME = "hellomoinul";

// Account creation date (api.github.com/users/hellomoinul → created_at).
// Used for the Years Learning counter — ticks up automatically, no API call.
export const GITHUB_ACCOUNT_CREATED = "2023-12-31T04:32:39Z";

export function yearsSince(isoDate: string, now = new Date()): number {
  const msPerYear = 365.25 * 24 * 60 * 60 * 1000;
  return Math.max(0, Math.floor((now.getTime() - new Date(isoDate).getTime()) / msPerYear));
}

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
  "voboghure-39a07f26":
    "https://raw.githubusercontent.com/hellomoinul/voboghure-39a07f26/main/public/Screenshot%202026-04-16%20150925.png",
  "niterclearanceportal":
    "https://raw.githubusercontent.com/hellomoinul/niterclearanceportal/main/public/Screenshot%202026-10-14%20194129.png",
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

// ---------------------------------------------------------------------------
// Profile README skills sync.
// Single source of truth: the LANGS block in hellomoinul/hellomoinul README,
// refreshed daily by its sync-dynamic Action (top languages across owned repos).
// The portfolio parses the same skillicons list, so both stay in sync with
// zero manual edits. Falls back to DEFAULT_SKILL_CODES when offline.
// ---------------------------------------------------------------------------

export const PROFILE_README_URL = `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${GITHUB_USERNAME}/main/README.md`;

export const DEFAULT_SKILL_CODES = ["ts", "py", "c", "css", "js", "dart", "html"];

export const SKILL_NAMES: Record<string, string> = {
  ts: "TypeScript",
  js: "JavaScript",
  py: "Python",
  c: "C",
  cpp: "C++",
  java: "Java",
  dart: "Dart",
  html: "HTML",
  css: "CSS",
  matlab: "MATLAB",
  react: "React",
  flutter: "Flutter",
  tailwind: "Tailwind CSS",
  supabase: "Supabase",
  postgres: "PostgreSQL",
  mysql: "MySQL",
  git: "Git",
  vercel: "Vercel",
  vscode: "VS Code",
  vite: "Vite",
};

export function skillName(code: string): string {
  return SKILL_NAMES[code.toLowerCase()] ?? code.toUpperCase();
}

export function skillIconUrl(code: string): string {
  return `https://skillicons.dev/icons?i=${code.toLowerCase()}&theme=dark`;
}

/** Extract skillicons codes from the <!-- LANGS:START --> block of a README. */
export function parseSkillCodesFromReadme(md: string): string[] {
  const block = md.match(/<!--\s*LANGS:START\s*-->([\s\S]*?)<!--\s*LANGS:END\s*-->/);
  if (!block) return [];
  const url = block[1].match(/skillicons\.dev\/icons\?i=([a-z0-9_,+-]+)/i);
  if (!url) return [];
  return url[1].split(",").map((c) => c.trim().toLowerCase()).filter(Boolean);
}

export async function fetchProfileSkillCodes(): Promise<string[]> {
  const res = await fetch(PROFILE_README_URL);
  if (!res.ok) throw new Error(`Profile README ${res.status}`);
  const codes = parseSkillCodesFromReadme(await res.text());
  if (codes.length === 0) throw new Error("No LANGS block found");
  return codes;
}
