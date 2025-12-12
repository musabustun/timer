# Timer Project

A personal, mobile-first countdown timer application built with Next.js 15, Prisma, and Tailwind CSS.
Designed for tracking special dates with rich media notes and notifications.

## Features

- **Countdown Timers**: Track days, hours, minutes, and seconds to target dates.
- **Admin Panel**: Secure dashboard (`/yonet`) to manage timers and settings.
- **Recurring Events**: Support for yearly recurring events (e.g., anniversaries, birthdays).
- **Rich Media**: Attach text, audio, and video memories to each timer.
- **Privacy**: Public access protected by a customizable access code.
- **PWA**: Installable on mobile devices with local notification support.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Database**: SQLite with Prisma
- **Styling**: Tailwind CSS
- **Monorepo**: NPM Workspaces

## Getting Started

### Prerequisites

- Node.js 18+
- NPM

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Initialize the database:
   ```bash
   cd packages/database
   npx prisma db push
   ```

### Running the App

To start the development server:

```bash
npm run dev
```

The application will be available at [http://localhost:3004](http://localhost:3004).

### Access

- **Public Home**: [http://localhost:3004](http://localhost:3004)
  - Default Code: `byz`
- **Admin Panel**: [http://localhost:3004/yonet](http://localhost:3004/yonet)
  - Default Password: `admin123`
