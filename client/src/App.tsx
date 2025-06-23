import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import ProjectsPage from './pages/ProjectsPage';
import IssuesPage from './pages/IssuesPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/registration' element={<RegistrationPage />} />
        <Route path='/dashboard' element={<ProjectsPage />} />
        <Route path='/issues/:id' element={<IssuesPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
