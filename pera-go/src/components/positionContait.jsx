import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PositionContent = () => {
  const { path } = useParams();
  const { positions } = useSelector((state) => state.positions);

  // Fetched position directly from Redux state
  const fetchedPosition = positions.find((position) => position.name === path.split('/').pop());

  return (
    <div>
      <header>
        <button>{path}</button>
        <button>Back</button>
      </header>
      <main>
        {fetchedPosition ? (
          <div>
            <h1>{fetchedPosition.name}</h1>
            <p>{fetchedPosition.description}</p>
            {/* Employee cards */}
          </div>
        ) : (
          <p>Position not found</p>
        )}
      </main>
    </div>
  );
};

export default PositionContent;
