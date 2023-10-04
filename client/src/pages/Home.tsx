// Home.tsx
import React from 'react';
import MyAuctions from '../components/MyAuctions';
import AuctionFeed from '../components/AuctionsFeed';
import UserInfo from '../components/UserInfo';

const Home: React.FC = () => {
  return (  
      <div className='home'>
        <div className="container" style={{display:'flex',flexDirection:'row', flex:3}}>
        <div className="left-column"  > 
          <AuctionFeed />  
        </div>
        <div className="right-column" style={{flex:1 ,backgroundColor:'#e0e0e0',flexDirection:'column', marginTop:50}}>
            <div style={{flex:1, backgroundColor:'#e0e0e0', height:300,  width:'100%', marginTop:350 }}>
              <UserInfo /> 
            </div>
            <MyAuctions />
        </div>
        </div>

      </div>
        
  );
};

export default Home;
