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

function App() {
  return (
    <>
      <AuthProvider>
        <NavigationComponent />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
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
