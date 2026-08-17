# Classification Labels

Every non-trivial statement in this project's documentation must carry one of these
labels. This is inherited directly from the original Master Specification governance
model and applies to all folders, not just 02_MASTER_SPECIFICATION.

| Label | Meaning |
|---|---|
| `[SOURCE-DERIVED FACT]` | What the authoritative GIX Nexus source material states. |
| `[STAKEHOLDER DECISION]` | Explicitly supplied or approved by the project owner. |
| `[PRODUCT DECISION]` | Confirmed decision about what the platform does — only once actually approved. |
| `[ARCHITECTURAL DECISION]` | Confirmed structural/technical decision. |
| `[DESIGN DECISION]` | Confirmed visual/interaction/UX decision. |
| `[REQUIRED]` | Confirmed requirement, including project-wide governance mandates. |
| `[PROPOSED/FUTURE]` | A recommendation or possible direction not yet approved. |
| `[OPEN QUESTION]` | Genuinely unresolved, needs stakeholder clarification. |
| `[REQUIRES VERIFICATION]` | Plausible but needs evidence before being treated as established. |
| `[INFERENCE]` | An interpretation derived from source material — never presented as fact. |

**Rule:** a statement never moves from `[PROPOSED/FUTURE]` or `[INFERENCE]` to
`[PRODUCT DECISION]` / `[STAKEHOLDER DECISION]` through repetition or confident
phrasing. It moves only when a corresponding record exists in
`03_GOVERNANCE/decisions/` or `03_GOVERNANCE/adrs/`.
