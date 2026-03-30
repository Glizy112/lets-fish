import { useEffect } from 'react';
import API from './services/api';

function App() {
  useEffect(() => {
    API.get('/')
      .then(res => console.log(res.data))
      .catch(err => console.error(err));
  }, []);

  return <h1>Let's Fish 🎣</h1>;
}

export default App;