import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AllDocuments from './components/00-AllDocuments';
import CreateDocument from './components/01-CreateDocument';
import UpdateDocument from './components/02-UpdateDocument';
import Header from './components/Header';
import Footer from './components/Footer';

import './App.css';

function App() {
  return (
    <Router basename="/~chsc22/editor">
      <Header />
      <main className="main">
        <Routes>
            <Route path="/" element={<AllDocuments />} />
            <Route path="/create" element={<CreateDocument />} />
            <Route path="/update/:id" element={<UpdateDocument />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
