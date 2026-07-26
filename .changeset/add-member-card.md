---
"@sipe-team/member-card": minor
---

Add MemberCard component

- Ported from sipe.team's `UserCard` into the design system
- Uses semantic design tokens for colors, spacing, radius, and typography
- Composes `@sipe-team/avatar` for the profile image and `@sipe-team/typography` for text
- Supports 7 social icon types: GitHub, LinkedIn, Instagram, YouTube, Kakao, Email, Link (with automatic URL normalization)
- Includes `isOrganizer` badge, `introduce`, and `review` sections
- Provides `filled` (default) and `outline` variants
