import { Link } from 'react-router';
import useAuth from '../hooks/useAuth';

export default function NavigationComponent() {
  const { isAuthenticated, onLogout } = useAuth();

  return (
    <nav className="nav">
      <div>
        <Link to="/" className="link">
          Home
        </Link>
        {isAuthenticated && (
          <>
            <Link to="/dashboard" className="link">
              Recipes
            </Link>
            <Link to="/dashboard/favorites" className="link">
              Favorites
            </Link>
          </>
        )}
      </div>
      <ul className="flex gap-10">
        {!isAuthenticated ? (
          <>
            <li>
              <Link to="/login" className="link">
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" className="link">
                Register
              </Link>
            </li>
          </>
        ) : (
          <li>
            <button
              onClick={onLogout}
              className="text-lg text-gray-700 hover:text-red-500 transition-colors"
            >
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}
