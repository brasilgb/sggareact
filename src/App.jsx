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
        <Sidebar />
        <div className="flex flex-col h-screen w-full pl-0 lg:pl-64 bg-gray-100">
          <Header />
          <div className="bg-gray-200 flex-grow p-4">
            <AppRoutes />
          </div>
          <Footer />
        </div>
      </AuthProvider>
    </Router>

  );
}

export default App;
