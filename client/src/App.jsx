import { Routes, Route } from 'react-router';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import RecipeList from './components/RecipeList';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import NavigationComponent from './components/NavigationComponent';
import { AuthProvider } from './contexts/AuthContext';
import Favorites from './pages/Favorites';
import RecipeDetail from './components/RecipeDetail';
import GuestRoute from './components/GuestRoute';

function App() {
  return (
    <>
      <AuthProvider>
        <NavigationComponent />
        <Routes>
          <Route
            index
            element={
              <GuestRoute>
                <Home />
              </GuestRoute>
            }
          />
          <Route
            path="/register"
            element={
              <GuestRoute>
                <Register />
              </GuestRoute>
            }
          />
          <Route
            path="/login"
            element={
              <GuestRoute>
                <Login />
              </GuestRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={<RecipeList />} />
            <Route path="favorites" element={<Favorites />} />
            <Route path="recipe/:id" element={<RecipeDetail />} />
          </Route>
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
