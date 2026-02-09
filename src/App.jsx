import React from 'react';
import AspectRatioContainer from './components/AspectRatioContainer';
import GameContainer from './components/GameContainer';

function App() {
  return (
    <AspectRatioContainer>
      <GameContainer />
    </AspectRatioContainer>
  );
}

export default App;
