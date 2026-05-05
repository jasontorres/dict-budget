import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Portal from './pages/Portal';
import Review from './pages/Review';
import Future from './pages/Future';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Portal />} />
        <Route path="/overview" element={<Portal />} />
        <Route path="/by-year" element={<Portal />} />
        <Route path="/programs" element={<Portal />} />
        <Route path="/objects" element={<Portal />} />
        <Route path="/methodology" element={<Portal />} />
        <Route path="/review" element={<Review />} />
        <Route path="/future" element={<Future />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
