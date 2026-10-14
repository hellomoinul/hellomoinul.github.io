// Case-study bullets distilled from each project's own README —
// no invented claims. Keyed by lowercase repo name; featured cards
// with a githubLink resolve through the same map.

const HIGHLIGHTS: Record<string, string[]> = {
  "tax-management-system": [
    "NID-based registration and login with hashed passwords",
    "Taxpayer dashboard: Paid / Unpaid / Overdue status, payment history, profile edits",
    "Add Land, Income and Business tax entities with automatic tax-amount calculation",
    "Admin dashboard: full CRUD over all records plus cross-table search",
    "Normalized MySQL schema — UserSignup, TaxPayers, TaxPayment, LandTax, IncomeTax, BusinessTax",
  ],
  fantasy_cricket_app: [
    "Single Flutter/Dart codebase for Android, iOS and web",
    "Full auth UI flow: splash, login, signup, password reset, user profile",
    "Match experience: home, match details, scoreboard, score and squad screens",
    "News section with article detail views",
  ],
  "diabetes-risk-prediction": [
    "4-model binary-classification pipeline (Logistic Regression, Decision Tree, SVM, XGBoost) on 100k Kaggle rows",
    "Principled model shortlist — Linear Regression and KNN excluded with documented reasoning",
    "Leakage-safe ColumnTransformer pipelines with stratified 70/15/15 split and a 0.9118 majority-class baseline",
    "Imbalance handled via class weights (no resampling), so metrics reflect a real screening population",
    "One-command scoring on new datasets (PREDICT.md) plus a Google Colab guide",
  ],
  niterclearanceportal: [
    "10-office sequential clearance mirroring the physical form, enforced at the database level",
    "QR-verifiable digital certificates with NCP-ID and registrar signature on final approval",
    "Separate student, office-staff and admin portals with bulk review actions",
    "Auto-escalation to Administration after 3 rejections, full audit trail and email/in-app notifications",
    "Public certificate verification without login, plus an admin-managed academic calendar",
  ],
  networking: [
    "6 Cisco Packet Tracer topologies: static routing, RIP, DHCP, a combined build and an exam lab",
    "Static routes, RIP dynamic routing, DHCP pools, subnetting and LAN design",
    "Explorable in Simulation and Realtime modes with CLI inspection on every device",
  ],
  "voboghure-39a07f26": [
    "Private multi-community platform: join via code, approval flow, one-tap community switcher",
    "Event → Story → Memory pipeline with reactions, comments and link-based galleries (zero media storage)",
    "Role-based access with admin panel, member profiles and activity history",
    "Real-time database-trigger notifications; Supabase Auth, RLS and Realtime throughout",
    "Full dark/light theming, tested with Vitest",
  ],
};

export function getHighlights(key: string | undefined | null): string[] {
  if (!key) return [];
  return HIGHLIGHTS[key.toLowerCase()] ?? [];
}
