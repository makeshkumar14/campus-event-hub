import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BackgroundAnimation from './components/BackgroundAnimation';
import Navbar from './components/Navbar';
import ScrollProgress from './components/ScrollProgress';
import HomePage from './pages/HomePage';
import EventDetails from './components/EventDetails';

function App() {
  useEffect(() => {
    // Disable browser scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    // Force scroll to top on load
    window.scrollTo(0, 0);
  }, []);

  return (
    <Router>
      <BackgroundAnimation />
      <ScrollProgress />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/event/:id" element={<EventDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
