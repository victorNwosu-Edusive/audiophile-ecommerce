# TODO: Convert Project from JSX to TypeScript

## Overview
Convert all JSX files to TSX, add TypeScript types, and update configurations.

## Steps
1. Update index.html to reference main.tsx instead of main.jsx
2. Update eslint.config.js to include TypeScript files (.ts, .tsx)
3. Rename all .jsx files to .tsx:
   - src/App.jsx -> src/App.tsx
   - src/main.jsx -> src/main.tsx
   - src/components/Footer.jsx -> src/components/Footer.tsx
   - src/components/Navbar.jsx -> src/components/Navbar.tsx
   - src/components/scrolltotop.jsx -> src/components/scrolltotop.tsx
   - src/components/ThankYouModal.jsx -> src/components/ThankYouModal.tsx
   - src/context/CartContext.jsx -> src/context/CartContext.tsx
   - src/pages/Checkout.jsx -> src/pages/Checkout.tsx
   - src/pages/Earphones.jsx -> src/pages/Earphones.tsx
   - src/pages/Headphones.jsx -> src/pages/Headphones.tsx
   - src/pages/Home.jsx -> src/pages/Home.tsx
   - src/pages/OrderConfirmation.jsx -> src/pages/OrderConfirmation.tsx
   - src/pages/ProductDetails.jsx -> src/pages/ProductDetails.tsx
   - src/pages/Speakers.jsx -> src/pages/Speakers.tsx
4. Add TypeScript types to each component (props, state, etc.)
5. Update imports in renamed files
6. Test build and lint

## Progress
- [x] Step 1: Update index.html
- [x] Step 2: Update eslint.config.js
- [x] Step 3: Rename files
- [ ] Step 4: Add types to components
- [ ] Step 5: Update imports
- [ ] Step 6: Test
