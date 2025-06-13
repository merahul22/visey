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

### Opportunity Management Updates
- Added new component `components/forms/opportunity-form.tsx`:
  - Created reusable form component for both creating and editing opportunities
  - Uses existing PostFundingOpportunityForm component
  - Added handling for initialData in edit mode
  - Added proper TypeScript typings for props
- Updated `app/(protected)/(main)/edit-funding-opportunity/[opportunityId]/page.tsx`:
  - Created new page for editing opportunities
  - Added security checks to ensure only business owners can edit their opportunities
  - Added redirect logic for invalid access
- Updated `/opportunities` page:
  - Added client-side actions menu for each opportunity
  - Added toast message for upcoming promotion feature
  - Improved type safety and error handling
  - Enhanced UI/UX with tooltips and loading states

## Planned Future Changes
- Implement proper promotion logic for businesses
- Add promotion status tracking in database
- Add promotion management UI for business owners
- Add promotion validation and payment integration
