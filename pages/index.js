import Link from "next/link";

export default function Home() {
  return (
    <div className="main">
      <h2>
        You haven't saved any cocktails yet...
        <Link className="link" href="/addimage">
          Get started!
        </Link>
      </h2>
    </div>
  );
}
