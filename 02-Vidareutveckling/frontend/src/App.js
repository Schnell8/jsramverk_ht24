import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StartView from './views/01-Start';
import RegisterView from './views/02-Register';
import LoginView from './views/03-Login';
import HomeView from './views/04-Home';
import AddDocumentView from './views/05-AddDocument';
import ShareDocumentView from './views/06-ShareDocument';
import EditDocumentView from './views/07-EditDocument';
import ViewSharedDocumentView from './views/08-ViewSharedDocument';

//style
import "./App.css"

const App = () => {
    return (
        <Router>
          <Routes>
            <Route path="/" element={<StartView />} />
            <Route path="/register" element={<RegisterView />} />
            <Route path="/login" element={<LoginView />} />
            <Route path="/home" element={<HomeView />} />
            <Route path="/home/add_document" element={<AddDocumentView />} />
            <Route path="/home/share_document/:docId" element={<ShareDocumentView />} />
            <Route path="/home/edit_document/:docId" element={<EditDocumentView />} />
            <Route path="/view_shared_document/:docId" element={<ViewSharedDocumentView />} />
          </Routes>
        </Router>
    );
};

export default App;