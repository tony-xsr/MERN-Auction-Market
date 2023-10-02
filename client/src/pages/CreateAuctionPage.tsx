// Home.tsx
import React from 'react'; 
import CreateAuction from '../components/CreateAuction';

const CreateAuctionPage: React.FC = () => {
  return (  
      <div className='home'>
        <CreateAuction></CreateAuction>
      </div>
        
  );
};

export default CreateAuctionPage;
