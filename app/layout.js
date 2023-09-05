// "use client"; // Client Component
import Link from 'next/link'
import './globals.css'
// import { useEffect, useState } from 'react' // Client Component

// import { Inter } from 'next/font/google'
// const inter = Inter({ subsets: ['latin'] })

// Server Component ?? 
export const metadata = {
  title: 'Web tutorials',
  description: 'SeungBae',
}
/**/
export default async function RootLayout({ children }) {
  // Client Component 일 경우
  /*
  const [topics, setTopics] = useState([]);
  useEffect(()=>{
    fetch('http://localhost:9999/topics')
    .then(resep=>resep.json())
    .then(result=>{
        setTopics(result);
    });
  },[])
  */

  // Server Componetn 일 경우
  const resp = await fetch('http://localhost:9999/topics');
  // next: { revalidation: 0 } : 캐시를 0초 동안 생성함
  // 생성 된 캐시 지우기 : Revaildation 참고
  const topics = await resp.json();
  return (
    <html>
      <body>
        <h1><Link href="/">WEB</Link></h1>
        <ol>
          {topics.map((topic)=>{
            return <li key={topic.id}><Link href={`/read/${topic.id}`}>
              {topic.title}</Link></li>
          })}
        </ol>
          {children}
          <ul>
            <li><Link href="/create">Create</Link></li>
            <li><Link href="/update">Update</Link></li>
            <li><input type="button" value="delete" /></li>
          </ul>
        </body>
    </html>
  )
}
