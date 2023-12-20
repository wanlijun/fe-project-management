import { redirect } from 'next/navigation'
export default function Home() {
  redirect('/login')
  return (
    <main>
      hello word
    </main>
  )
}
