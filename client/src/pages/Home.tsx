// Home.tsx
import React from 'react';
import MyAuctions from '../components/MyAuctions';

const Home: React.FC = () => {
  return (  
      <div className='home'>
        <div className="container">
        <div className="left-column"> 
        </div>
        <div className="right-column">
            <MyAuctions />
        </div>
        </div>

      </div>
        
  );
};

export default Home;
