import { BrowserRouter as Router } from 'react-router-dom';
import Public from './Routes/Public';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import AuthProvider from './Context/authContext';
import RouteTracker from './Context/RouteTracker';

function App() {
  return (
    <>
      <Router>
        <RouteTracker>
          <AuthProvider>
            <Navbar />
            <Public />
            <Footer />
          </AuthProvider>
        </RouteTracker>
      </Router>
    </>
  );
}

export default App;
