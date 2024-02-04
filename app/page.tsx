import Link from "next/link";

export default function Home() {
  return (
    <div className="text-center pt-32 text-2xl text-white font-bold">
      <div className="mb-16">I wrote this project to learn nextAuth once & for all</div>
      <p>
        Please go to 
        <Link href='/sign-in' className="px-2 font-bold text-red-800">sign in</Link>
        page...
      </p>
    </div>
  )
}
