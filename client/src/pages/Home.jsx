import { Link } from 'react-router';

export default function Home() {
  return (
    <main className="main">
      <h1 className="heading">Home Page</h1>
      <div className="mt-8 flex flex-col items-center space-y-4">
        <Link
          to="/login"
          className="link bg-blue-500 hover:bg-blue-600"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="link bg-green-500 hover:bg-green-600"
        >
          Register
        </Link>
      </div>
    </main>
  );
}
