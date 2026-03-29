import { redirect } from 'next/navigation';

export default function Home() {
  // Directly redirect to the dashboard chat
  // The (dashboard)/layout.tsx will handle redirecting to /login if unauthenticated
  redirect('/chat');
}
