import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1>main page</h1>
      <Link href={'/posts'} className="btn btn-success">next Post</Link>

    </>
  );
}
