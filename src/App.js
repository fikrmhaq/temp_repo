import { useEffect } from 'react';
import './App.css';
import Routes from './Routes/Routes';
import Services from './services/Services';

const App = () => {

  return <Routes path={window.location.pathname}/>
}

export default App;
