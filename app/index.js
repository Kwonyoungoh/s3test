import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './index.scss';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={
            <>
              <div>Hello!! This is S3 hosting. hosting is good</div>
              <div> cdn cache test </div>
              <div> Redeployment </div>
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
};

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);