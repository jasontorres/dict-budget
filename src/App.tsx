import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Portal from './pages/Portal';
import Review from './pages/Review';
import Future from './pages/Future';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Portal />} />
        <Route path="/review" element={<Review />} />
        <Route path="/future" element={<Future />} />
      </Routes>
    </BrowserRouter>
  );
}
