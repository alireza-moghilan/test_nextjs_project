import Link from "next/link";
import { Button } from "antd";

export default function Home() {
  return (
    <>
      <h1>main page</h1>
      <Link href={'/posts'}><Button type="primary">next Post</Button></Link>

    </>
  );
}
