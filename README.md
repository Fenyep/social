# Makiti Social Application

A modern web application built with Next.js, React, and TypeScript.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

* [Node.js](https://nodejs.org/) (version 18.17 or later)
* [npm](https://www.npmjs.com/), [yarn](https://yarnpkg.com/), or [pnpm](https://pnpm.io/) package manager
* [Git](https://git-scm.com/) (for cloning the repository)

## Getting Started

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd <your-project-name>
```

### 2. Install Dependencies

Using npm:

```bash
npm install
```

Using yarn:

```bash
yarn install
```

Using pnpm:

```bash
pnpm install
```

### 3. Run the Development Server

Using npm:

```bash
npm run dev
```

Using yarn:

```bash
yarn dev
```

Using pnpm:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Available Scripts

* `npm run dev` - Starts the development server
* `npm run build` - Creates an optimized production build
* `npm run start` - Starts the production server
* `npm run lint` - Runs ESLint to check for code issues
* `npm run type-check` - Runs TypeScript type checking

## Project Structure

```
├── public/          # Static files
├── src/
│   ├── app/         # App Router pages and layouts
│   ├── components/  # Reusable React components
│   └── entities/    # The utility interfaces to manage objects likes Users and Posts
├── .env.example     # Environment variables template
├── .gitignore       # Git ignore rules
├── next.config.js   # Next.js configuration
├── package.json     # Dependencies and scripts
└── README.md        # This file
```

## Deployment

### Vercel

The app is deployed on [Vercel](https://vercel.com/).
