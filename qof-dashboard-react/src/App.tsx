import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { Summary } from './pages/Summary';
import { Indicators } from './pages/Indicators';
import { PracticeDataProvider } from './context/PracticeDataContext';

export function App() {
  return (
    <PracticeDataProvider ods="E82031">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/summary" element={<Summary />} />
          <Route path="/indicators" element={<Indicators />} />
        </Routes>
      </BrowserRouter>
    </PracticeDataProvider>
  );
}
