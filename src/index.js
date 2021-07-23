import React from 'react';
import ReactDOM from 'react-dom';
import '../src/index.css'
import Users from './components/users/users.jsx';


ReactDOM.render(
  <React.StrictMode>
    <Users />
  </React.StrictMode>,
  document.getElementById('root')
);