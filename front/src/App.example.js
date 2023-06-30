import React, { useEffect } from 'react';
import sendEvent from './sdk/clientTracker';
import './sdk/mouseTracking';

function App() {

  useEffect(() => {
    // Ici, le tracking de la souris démarre automatiquement
    // dès que le composant App est monté grâce à l'import ci-dessus.
  }, []);

    const handleClick = () => {
        sendEvent('buttonClick', { buttonName: 'My Button' }, 300);
    }

    return (
        <div className="App">
            <button onClick={handleClick}>
                Click me
            </button>
        </div>
    );
}

export default App;
