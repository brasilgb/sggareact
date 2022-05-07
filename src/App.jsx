import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import AppRoutes from './routes';
import Footer from './components/Footer'
import { AuthProvider } from './contexts/auth';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="flex flex-row min-h-screen bg-gray-100 text-gray-800">
          <div className="flex flex-col flex-grow md:ml-0 transition-all duration-150 ease-in">
            <NavBar />
            <div className="flex flex-col flex-grow p-4">
              <AppRoutes />
            </div>
            <Footer />
          </div>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
