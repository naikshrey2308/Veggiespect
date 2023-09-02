import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/navbar/navbar';
import Intro from './components/intro/intro';
import KnowMore from './components/know-more/know-more';
import Upload from './components/upload/upload';

function App() {
  return (
    <div>
      <Navbar />
      <Intro />
      <KnowMore />
      <Upload />
    </div>
  );
}

export default App;
