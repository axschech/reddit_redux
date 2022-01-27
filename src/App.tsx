import React from 'react';
import logo from './logo.svg';

import './App.css';
import { Images } from './features/images/Images';

function App() {
  return (
    <div>
      <h1>Reddit Redux</h1>
      <div>
        <a href='https://github.com/axschech/reddit_redux.git'>Github</a>
      </div>
      <Images></Images>
    </div>
  );
}

export default App;
