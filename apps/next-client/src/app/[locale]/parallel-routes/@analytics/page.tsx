import Link from 'next/link';

export default function Page() {
  return (
    <div style={{ padding: '20px', backgroundColor: 'powderblue' }}>
      <p>Analytics Page</p>
      <Link href="/parallel-routes/info" className="text-yellow-600 underline">
        View Info
      </Link>
    </div>
  );
}
