import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignInForm from './components/SignInForm';
import Table from './components/Table';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<SignInForm/>}
      />
      <Route path="/table" element={<Table/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
