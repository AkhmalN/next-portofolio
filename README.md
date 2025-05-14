# Portfolio Website

This is a personal portfolio website built using **Next.js (App Router)**, **Tailwind CSS**, and **MongoDB**. It showcases projects, skills, and experiences in a modern and responsive design.

## Features

- **Next.js (App Router)**: Simplified routing and optimized performance.
- **Tailwind CSS**: Utility-first CSS framework for fast and responsive styling.
- **MongoDB**: Database for storing project and contact form data.
- Fully responsive design for all devices.
- Dynamic project and blog sections.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/portfolio-next.git
cd portfolio-next
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add the following:

```env
MONGODB_URI=your-mongodb-connection-string
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

To deploy the application, you can use platforms like **Vercel** or **Netlify**. Ensure your environment variables are set up in the deployment platform.

---

Built with ❤️ using Next.js (App Router), Tailwind CSS, and MongoDB.

## Updated Folder Structure

```
/app          # Next.js App Router structure
  /admin      # Admin dashboard and related pages
  /api        # API routes for server-side logic
  /auth       # Authentication-related pages
  /docs       # Documentation pages
/components   # Reusable React components
/context      # React context for state management
/hooks        # Custom React hooks
/lib          # Libraries and helper functions
/styles       # Global and component-specific styles
/utils        # Utility functions
```
