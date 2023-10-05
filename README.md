# MERN-Auction-Market
Auction Marketplace with MERN

### Prerequisites:
You must have Docker Installed in your System !

### Docker Diagram
![MERN DOCKER diagram](https://github.com/tony-xsr/MERN-Auction-Market/blob/bd164740cbd2e4a04ebc61d120d65d47ea81f816/documents/images/3-tier-diagram.png?raw=true)

### Project Structure

```
my-project/
│
├── server/
│   ├── Dockerfile
│   ├── .env (create this file)
│   ├── .env.develop.example (copy and configure)
│   ├── .env.production.example (copy and configure)
│   ├── src/
│   │   ├── ... (server source files)
│   │
│   └── ... (other server-related files and directories)
│
├── client/
│   ├── .env (create this file)
│   ├── .env.develop.example (copy and configure)
│   ├── src/
│   │   ├── ... (client source files)
│   │
│   └── ... (other client-related files and directories)
│
├── Dockerfile (for the entire project)
│── docker-compose-prod.yml (copy to docker-compose for product )
│── docker-compose-dev.yml (copy to docker-compose for dev )
│── docker-compose.yml
└── ... (other project-related files and directories)

```

### Features
- Login / Register / Logout
- Create Auction
- Publish / Draft my Auction
- HomePage / Ongoing Auction News Feed 
- Join / BID  / Bid Revision Auction.
- User Balance (Lock/Available )
- Deposit money

### Server APIs 
- SIGN-UP `/api/auth/signup` 
- SIGN-IN `/api/auth/signin`
- SIGN-OUT `/api/auth/signout`
- CREATE AUCTION `api/auction/create`
- JOIN AUCTION `/api/auction/joinAuction`
- ADD MONEY `/api/auction/addmoney`
- MY AUCTIONS `/api/auction/myauctions`
- GET ALL AUCTIONS `/api/auction/getAllAuction`
- ALL AUCTIONS `/api/auction/getAllAuction`
- UPDATE AUCTION STATUS `/api/auction/update`

### Upcoming Features
- Enhance the Client Web User Experience (UX/UI).
- Resolve Issues Related to Locking/Unlocking User Balances.
- Address Auto-Unlocking Funds When a User's Bid Doesn't Reach the Minimum and the Auction Expires.
- Correct Bugs Related to Bidding in Auctions.

### GO LIVE URL   

BACKEND API URL    

[http://45.32.37.20:8080/](http://45.32.37.20:8080/)   


CLIENT    

[http://45.32.37.20:3000/](http://45.32.37.20:3000/)   


### How to run the App ?

In Development Mode :

First copy the content of `docker-compose-dev.yml` to `docker-compose.yml`

`docker compose down`

Run the app using :

`$ docker-compose up --build --remove-orphans`

or

`$ docker-compose up -d`

Above command will start the services on (-d) detach mode (similar like running the app in background)

Then you can check the status of the containers by running:

`$ docker ps`

The App should be App :

visit client : `http://localhost:3000`

visit server : `http://localhost:8080`

To check the status of the running containers :
`docker-compose ps`

In Production Mode :

First copy the content of `docker-compose-prod.yml` to `docker-compose.yml`
Run the app using :
 `$ docker-compose up --build -remove-orphans`
The App should be up at `http://localhost:8080`

### Others docker command
Clean docker cache - volumes & containers
`docker system prune --volumes`

### Videos Demo 

Run Demo Auction Website

[auction_demo.mp4](https://github.com/tony-xsr/MERN-Auction-Market/blob/main/documents/files/auction_demo.mp4)


Run Demo How To Start Project with Docker.

[deploy_project_demo.mp4](https://github.com/tony-xsr/MERN-Auction-Market/blob/main/documents/files/deploy_project_demo.mp4)


OR you can access to see the video here via Google Drive
[https://drive.google.com/drive/folders/1ocQ0GPQgX13xnVLtZpqd8kkIdIZw9FWd?usp=sharing](https://drive.google.com/drive/folders/1ocQ0GPQgX13xnVLtZpqd8kkIdIZw9FWd?usp=sharing)

### APIs Document
[https://documenter.getpostman.com/view/26331022/2s9YJexLKq](https://documenter.getpostman.com/view/26331022/2s9YJexLKq)




### POSTMAN  (A tool for testing APIs) API COLLECTIONS DOCUMENT
It's already in root project. You can import and open it with POSTMAN 
`AucductionAPIs.postman_collection.json`

### Server Document
[README.MD](https://github.com/tony-xsr/MERN-Auction-Market/tree/main/server)


### Client Document
[README.MD](https://github.com/tony-xsr/MERN-Auction-Market/tree/main/client)


### Build the image for server
Login       

`docker login`      

Build Docker        


 `docker tag myapp-server {docker_username}/myapp-server:1.0`       

 
`docker tag myapp-client {docker_username}/myapp-client:1.0`        

Push to docker server       

`docker push {docker_username}/myapp-client:1.0`        

`docker push {docker_username}/myapp-server:1.0`        


Login to your cloud server          

Login Docker and Pull      

`docker pull {docker_username}/myapp-client:1.0`          

`docker pull {docker_username}/myapp-server:1.0`        

`docker-compose up -d`      
