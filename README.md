## Install dependencies

npm install

#### or

yarn install

## Run the development server

npm run dev

#### or

yarn dev

## Features Implemented

- Display single-choice and number-type questions.
- Automatically navigate to the next question on selection (for single-choice).
- “Next” button for number-type questions, disabled if input is empty.
- Progress bar showing current question out of total.
- URL query (`?q=<index>`) syncs with current question, enabling back/forward browser navigation (with Tab keyboard button to navigate).
- Input styling with custom fonts and RGBA-based borders.
- Responsive layout with Tailwind CSS.

## Next Steps / Future Improvements

- Animations for smoother transitions between questions.
- Answer persistence to localStorage or backend so progress isn’t lost on refresh.
- Results page summarizing answers at the end of the quiz.
- Validation for number questions beyond min/max constraints.
- Unit and integration tests for components and navigation logic.
- Split QuizPageClient component to more components (like Button and etc.).
- Add TypeScript types (and/or interfaces) where (`any`) used.

## Key Technical Decisions

- Next.js + React for SSR, routing, and modern component architecture.
- Tailwind CSS with custom fonts and arbitrary RGBA values for fast, responsive styling.
- URL-based question index to enable browser back/forward navigation without additional state management libraries.
- Conditional rendering for question visibility (`visibleIf`) to support dynamic quiz logic.
- Local state (`useState`) for tracking answers and current question, simple and sufficient for single-user session.
