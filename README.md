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


### How to run the App ?

In Development Mode :
First copy the content of docker-compose-dev.yml to docker-compose.yml

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


### Orthers docker command
Clean docker cache - volumes & containers
`docker system prune --volumes`

### Videos Demo 

Run Demo Auction Website
<video width="320" height="240" controls>
  <source src="https://github.com/tony-xsr/MERN-Auction-Market/blob/main/documents/files/auction_demo.mp4" type="video/mov">
  Your browser does not support the video tag.
</video>
![https://github.com/tony-xsr/MERN-Auction-Market/blob/main/documents/files/auction_demo.mp4](https://github.com/tony-xsr/MERN-Auction-Market/blob/main/documents/files/auction_demo.mp4)


Run Demo How To Start Project with Docker.
<video width="320" height="240" controls>
  <source src="https://github.com/tony-xsr/MERN-Auction-Market/blob/main/documents/files/deploy_project_demo.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>
![https://github.com/tony-xsr/MERN-Auction-Market/blob/main/documents/files/deploy_project_demo.mp4](https://github.com/tony-xsr/MERN-Auction-Market/blob/main/documents/files/deploy_project_demo.mp4)


OR you can access to see the video here via Google Drive
![https://drive.google.com/drive/folders/1ocQ0GPQgX13xnVLtZpqd8kkIdIZw9FWd?usp=sharing](https://drive.google.com/drive/folders/1ocQ0GPQgX13xnVLtZpqd8kkIdIZw9FWd?usp=sharing)


