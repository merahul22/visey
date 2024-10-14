import { redirect } from 'next/navigation';

export default function Home() {
  // TODO: Redirect accordingly based on current auth status

  redirect('/login')
}
