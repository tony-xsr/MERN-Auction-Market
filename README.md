# MERN-Auction-Market
Auction Marketplace with MERN

### Prerequisites:
You must have Docker Installed in your System !
 
![MERN DOCKER diagram](https://github.com/tony-xsr/MERN-Auction-Market/blob/bd164740cbd2e4a04ebc61d120d65d47ea81f816/documents/images/3-tier-diagram.png?raw=true)
### Project Structure:

 # MERN-Auction-Market
Auction Marketplace with MERN

### Prerequisites:
You must have Docker Installed in your System !
 
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
│── ... docker-compose-prod.yml (copy to docker-compose for product )
│── ... docker-compose-dev.yml (copy to docker-compose for dev )
│── ... docker-compose.yml
└── ... (other project-related files and directories)

```