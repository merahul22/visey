# Changes Log

This file tracks significant changes made to the codebase.

## May 28, 2025

### Business Card Navigation Changes
- Modified `components/cards/business-card.tsx`:
  - Removed Sheet/sidebar component for business cards
  - Added direct navigation to business page on card click
  - Added hover state for better UX
  - Improved TypeScript types by making optional props explicitly optional
  - Added e.stopPropagation() to service buttons to prevent unwanted navigation
  - Added transition animation for smoother interactions

### Promotion Feature (Temporary)
- Modified `components/cards/business-card.tsx`:
  - Commented out promotion badge display
  - Feature will be re-implemented later with proper business logic
  - Left the `promoted` field in TypeScript interface as optional for future use

### Promotion Feature Updates
- Modified `components/profile/BusinessProfilePublic.tsx`:
  - Commented out "promoted" text display in business details page
  - Matches previously commented out promotion badge in business cards

## Planned Future Changes
- Implement proper promotion logic for businesses
- Add promotion status tracking in database
- Add promotion management UI for business owners
- Add promotion validation and payment integration
