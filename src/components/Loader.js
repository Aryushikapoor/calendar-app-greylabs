// Loader.js
import React from 'react';
import styled from 'styled-components';

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Loader = () => {
  return (
    <LoaderContainer>
      <div className="spinner"></div>
      <style jsx>{`
        .spinner {
          width: 40px;
          height: 40px;
          border: 6px solid #f3f3f3; /* Light grey */
          border-top: 6px solid #3498db; /* Blue */
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </LoaderContainer>
  );
};

export default Loader;
