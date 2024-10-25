// Loader.js
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Lottie from 'react-lottie-player'; // Import from react-lottie-player

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f8f8f8;
`;

const Loader = () => {
  const [animationData, setAnimationData] = useState(null);

  // Load the animation JSON
  useEffect(() => {
    fetch('https://lottie.host/9422c6dc-7262-4ebf-80df-20af8641baa2/yz5R4LFwg8.json')
      .then((response) => response.json())
      .then((data) => setAnimationData(data))
      .catch((error) => console.error('Error loading animation:', error));
  }, []);

  if (!animationData) return <div></div>; // Fallback text during fetch

  return (
    <LoaderContainer>
      <Lottie
        loop
        play
        animationData={animationData}
        style={{ width: 500, height: 500 }}
      />
    </LoaderContainer>
  );
};

export default Loader;
