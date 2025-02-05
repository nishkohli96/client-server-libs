import Link from 'next/link';

/**
 * @sales is a slot, which will not be used as part of route in navigation,
 * so the link click will redirect to parent-route/detail where parent-route
 * in this case is parallel-routes.
 */
export default function Page() {
  return (
    <div>
      <p>Sales Page</p>
      <Link href="/parallel-routes/detail" className="text-yellow-600 underline">
        View Detail
      </Link>
    </div>
  );
}
