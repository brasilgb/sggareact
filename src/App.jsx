import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import AppRoutes from './routes';
import Footer from './components/Footer'
import { AuthProvider } from './contexts/auth';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="flex h-screen bg-gray-100">
          <Sidebar />
          <div className="flex flex-col flex-grow">
            <div className="flex flex-col flex-grow">
              <Header />
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
