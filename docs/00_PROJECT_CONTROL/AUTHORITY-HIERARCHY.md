# Authority Hierarchy

When two documents disagree, resolve using this order:

1. **`01_SOURCE_BASELINE/frozen/Source-Baseline-v1.0.md`** — facts about the real
   company. Nothing overrides this except a formal new version of the baseline itself,
   traced back to an updated authoritative source.
2. **`03_GOVERNANCE/decisions/` and `03_GOVERNANCE/adrs/`** — the dated, individual
   decision records. Highest authority for anything that required a stakeholder choice
   (scope, architecture direction, feature approval).
3. **`02_MASTER_SPECIFICATION/` chapter prose** — the governed narrative. Authoritative
   for structure and requirements EXCEPT where it summarizes a decision — in that case
   it must match the governance artifact, and if it doesn't, the artifact wins and the
   chapter is stale (flag it, don't silently trust the prose).
4. **`05_ARCHITECTURE/`, `06_DESIGN/`** — supporting artifacts. Authoritative for detail
   (e.g., exact data model, exact token values) but must not contradict an approved
   spec chapter; if they do, that's a defect to resolve, not a tiebreak.
5. **`04_PRODUCT/`** — never authoritative. Working ideas only.
6. **`08_WORKING_DRAFTS/`** — never authoritative under any circumstance, regardless
   of how complete or polished a draft looks.

This hierarchy applies to both humans and AI agents. See also `CLAUDE.md` at repo root.
