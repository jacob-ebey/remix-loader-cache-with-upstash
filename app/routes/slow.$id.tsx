import { Link, useLoaderData } from "remix";
import type { LoaderFunction } from "remix";

export let loader: LoaderFunction = async ({ params }) => {
  // get the cache key based on the request
  let cacheKey = `slow-item-${params.id}`;

  // check the cache
  let cacheResponse = await fetch(
    `https://${process.env.UPSTASH_URL}/get/${cacheKey}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.UPSTASH_TOKEN}`,
      },
    }
  );
  let cached =
    cacheResponse.status === 200
      ? await cacheResponse.json()
      : { result: null };

  // if the cache is valid, return it
  if (cached.result) return JSON.parse(cached.result);

  // simulate a slow API call
  await new Promise((resolve) => setTimeout(resolve, 2000));
  let data = {
    title: `Slow item ${params.id}`,
  };

  // cache the result
  await fetch(`https://${process.env.UPSTASH_URL}/set/${cacheKey}?EX=20`, {
    headers: {
      Authorization: `Bearer ${process.env.UPSTASH_TOKEN}`,
    },
    method: "post",
    body: JSON.stringify(data),
  });

  return data;
};

export default function SlowPage() {
  let { title } = useLoaderData();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>{title}</h1>
      <p>
        <Link to="/">Home</Link>
      </p>
    </div>
  );
}
