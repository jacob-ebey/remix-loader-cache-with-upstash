import { Link } from "remix";

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome to Remix</h1>
      <ul>
        <li>
          <Link to="/slow/1">Slow item 1</Link>
        </li>
        <li>
          <Link to="/slow/1">Slow item 2</Link>
        </li>
        <li>
          <Link to="/slow/1">Slow item 3</Link>
        </li>
      </ul>
    </div>
  );
}
