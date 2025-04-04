# 24/7 Elite Concierge Service

A luxury concierge web application targeting affluent Arab tourists visiting Moscow. The platform offers exclusive, personalized services with a premium user experience.

## Features

- **Elegant User Interface**: Luxurious design that reflects the premium nature of the service
- **User Authentication**: Secure, token-based login tied to user's email
- **Interactive Dashboard**: Personalized welcome and service browsing
- **Service Catalog**: Browse and filter services by category
- **Booking System**: Add services to your concierge list and submit requests
- **Concierge Communication**: Direct message feature to communicate with your personal concierge
- **Data Persistence**: All user data and requests stored securely in Supabase

## Service Categories

- Shopping
- Dining & Culinary
- Culture & History
- Transport
- Medical & Wellness
- Nightlife & Events
- Travel Support

## How to Use

1. **Book a Concierge**: Visit the home page and use the "Book Now" button to schedule a concierge
2. **Log In**: Use the "Log In" button in the navigation and enter your email
3. **Browse Services**: Explore the various service categories in your personalized dashboard
4. **Make Requests**: Add desired services to your concierge list and submit your requests
5. **Communicate**: Use the "Message Concierge" button for direct communication

## Development

This is a Next.js project using TypeScript, Tailwind CSS, and Supabase for the backend.

### Getting Started

```bash
# Install dependencies
npm install

# Create a .env.local file with your Supabase credentials
cp .env.local.example .env.local

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

### Setting Up Supabase

1. Create a Supabase account at [supabase.com](https://supabase.com)
2. Create a new project
3. Get your project URL and anon key from Settings > API
4. Add them to your `.env.local` file
5. Run the database migrations:
   - You can manually execute the SQL in `supabase/migrations/` in the Supabase SQL editor
   - Or use the Supabase CLI to run migrations

### Database Structure

The application uses two main tables:

**users**

- `id`: UUID (primary key, references auth.users)
- `email`: TEXT
- `name`: TEXT
- `concierge_end_date`: TIMESTAMP WITH TIME ZONE
- `created_at`: TIMESTAMP WITH TIME ZONE

**concierge_requests**

- `id`: UUID (primary key)
- `user_id`: UUID (references users.id)
- `service_id`: TEXT
- `service_name`: TEXT
- `category`: TEXT
- `quantity`: INTEGER
- `status`: TEXT ('pending', 'confirmed', 'completed', 'cancelled')
- `submitted_at`: TIMESTAMP WITH TIME ZONE

## Technologies Used

- Next.js
- TypeScript
- Tailwind CSS
- Framer Motion
- Supabase (Authentication & Database)
- React Hot Toast (Notifications)

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
