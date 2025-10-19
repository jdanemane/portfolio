# Portfolio with Supabase CMS

This is a portfolio website with a Supabase backend CMS integration. The project allows you to manage your portfolio content through a web interface with real-time data synchronization.

## Features

- **Real-time Data**: Portfolio data is stored in Supabase and synced in real-time
- **Content Management**: Full CRUD operations for sections and portfolio items
- **Responsive Design**: Works on desktop and mobile devices
- **Admin Interface**: Toggle between view and edit modes
- **Type Safety**: Full TypeScript support with generated database types

## Setup Instructions

### 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Note down your project URL and anon key from the project settings

### 2. Set Up Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```

2. Fill in your Supabase credentials in `.env.local`:
   ```
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

### 3. Set Up the Database

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Copy and paste the contents of `supabase/schema.sql`
4. Run the SQL to create the necessary tables and policies

### 4. Install Dependencies and Run

```bash
npm install
npm run dev
```

## Database Schema

The project uses three main tables:

- **profiles**: Stores basic profile information (name, tagline)
- **sections**: Portfolio sections (About, Experience, Projects, etc.)
- **portfolio_items**: Individual items within sections

## Usage

### View Mode
- Browse your portfolio content
- Navigate between sections and items
- View detailed information about each item

### Admin Mode
- Click the "Edit Content" button to enter admin mode
- Manage your profile information
- Add, edit, or delete sections
- Add, edit, or delete portfolio items
- All changes are automatically saved to Supabase

## Development

### Project Structure

```
src/
├── components/          # React components
├── lib/                # Supabase client configuration
├── services/           # Data service layer
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

### Key Files

- `src/lib/supabase.ts` - Supabase client configuration
- `src/services/portfolioService.ts` - Data service for CRUD operations
- `src/types/database.ts` - Database type definitions
- `supabase/schema.sql` - Database schema

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your environment variables in Vercel's dashboard
4. Deploy!

### Other Platforms

Make sure to:
1. Set the environment variables
2. Build the project: `npm run build`
3. Serve the `build` directory

## Troubleshooting

### Common Issues

1. **Blank page**: Check that your environment variables are set correctly
2. **Database errors**: Ensure the schema has been applied to your Supabase project
3. **Authentication issues**: Verify your Supabase URL and anon key

### Getting Help

- Check the Supabase documentation: [supabase.com/docs](https://supabase.com/docs)
- Review the console for error messages
- Ensure all dependencies are installed correctly
