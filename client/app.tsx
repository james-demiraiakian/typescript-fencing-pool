import React from 'react';
import { createRoot } from 'react-dom/client';
import './reset.css';
// import './global.css';
import fooListFn from './components/foo-list';
import {
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';
import Auth from './components/Auth/Auth';
import Dashboard from './components/Dashboard/Dashboard';

const FooList = fooListFn();
const container =
  document.getElementById('app') || document.createElement('div');
container.id = 'app';
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
