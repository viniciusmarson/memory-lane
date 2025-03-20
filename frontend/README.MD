# Memory Lane Frontend

### Directory Overview

### `src/components/`

Contains reusable UI components that can be shared across different pages. Components are organized by their type:

- `buttons/`: Button components like NewMemoryButton
- `cards/`: Card components for displaying content
- `modals/`: Modal/dialog components

### `src/context/`

Contains React Context providers for global state management:

- `alert.tsx`: Manages global alerts

### `src/hooks/`

Contains custom React hooks for reusable logic:

- `useAlert.ts`: Hooks for use alert context

### `src/layouts/`

Contains layout components that wrap pages and provide consistent structure:

- `AuthedLayout.tsx`: Main layout for authenticated users, includes common elements like headers

### `src/pages/`

Contains components that represent full pages in the application:

- `Memories/`: Contains memory-related pages and components
  - `components/`: Components specific to the memories feature
  - `context.tsx`: Handle the data for the page
  - `controller.tsx`: Handle the page logic
  - `view.tsx`: Handle the page UI
  - `index.tsx`: Connect everything to export the page

### `src/services/`

Contains API service layers that handle communication with the backend:

- `memories.tsx`: Handles all memory-related API calls (create, read, update, delete)

### `src/types/`

Contains TypeScript type definitions:

- `memory.ts`: Defines types for memory-related data structures

### `src/utils/`

Contains utility functions and helper methods used across the application

## Getting Started

First install the dependencies:

```bash
yarn
```

Finally, run the development server:

```bash
yarn dev
```