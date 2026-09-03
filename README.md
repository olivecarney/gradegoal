# GradeGoal

GradeGoal is a modern, responsive web application built with **React**, **TypeScript**, and **Vite** designed to help students calculate the grades they need on upcoming finals or assignments to reach their target course grade.

## Features

* **Dynamic Grade Calculation**: Uses a real-time `useMemo` calculation to determine the exact percentage needed on remaining coursework based on current assignment weights and scores.
* **Target Setting**: Easily set and adjust your goal grade (e.g., 90%).
* **Assignment Management**: Add, update, or delete multiple assignments with specific weights and scores.
* **Status Indicators**:
* **🎉 You're Safe**: Displayed when your target is already met based on current scores.
* **🎯 Needed**: Shows the specific percentage required on the remaining weight.
* **💀 Impossible**: Alerts you if the target grade is mathematically unattainable.


* **Dark Mode Support**: Built-in theme toggling using `next-themes` and a custom `ThemeProvider`.
* **Modern UI**: Styled with **Tailwind CSS** and **Shadcn UI** components (Card, Input, Button, Label) for a clean, professional look.

## Tech Stack

* **Framework**: [React 19](https://react.dev/)
* **Build Tool**: [Vite](https://vitejs.dev/)
* **Language**: [TypeScript](https://www.typescriptlang.org/)
* **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
* **Components**: [Shadcn UI](https://ui.shadcn.com/) (Radix UI primitives)
* **Icons**: [Lucide React](https://lucide.dev/)

## Getting Started

### Prerequisites

* [Node.js](https://nodejs.org/)
* [Bun](https://bun.sh/) (Recommended, as indicated by `bun.lock`) or `npm`/`yarn`

### Installation

1. **Clone the repository**:
```bash
git clone https://github.com/olivecarney/gradegoal.git
cd gradegoal

```


2. **Install dependencies**:
```bash
bun install

```


3. **Run the development server**:
```bash
bun run dev

```


4. **Build for production**:
```bash
bun run build

```



## Project Structure

* `src/App.tsx`: The main application logic and grade calculation engine.
* `src/components/AssignmentRow.tsx`: A reusable component for managing individual assignment inputs.
* `src/components/ui/`: Contains primitive UI components like buttons, inputs, and cards.
* `src/components/theme-provider.tsx`: Logic for handling light and dark mode.

## Linting

The project uses ESLint with type-aware rules for TypeScript and React. To run the linter:

```bash
bun run lint
```
