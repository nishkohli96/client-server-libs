# DOCKER

1.  `docker pull`: Pull an image from registory

2.  `docker run <container-name>`: Runs the container with its default command. Use `-d` flag to run in detached mode.

3. `docker run <container-name> <cmd-name>`: Runs container with specified cmd ( may not be the default cmd)

4.  `docker ps`: List running containers

5.  `docker ps -a`: List running & stopped containers

6.  `docker images`: Shows all images available to run

7.  `docker scan <container-name>`: Scan image for any security vulnerability

8.  `docker create <container-name>`: creates a new container & returns it’s id

9.  `docker start <container-name>`: gives the id  of the container and starts it

10. `docker start <container-name> -a`: Starts and shows the output of the container on the console.

11. `docker logs <container-id>`: Shows all output after starting a container. Doesn’t rerun the stopped container 

12.  `docker image inspect <container-name>`: Get image info

13. `docker stop <container-id>`: Stops the container but allows it to run the container shutdown process within 10 secs, else switches to `docker kill`.

14. `docker kill <container-id>`:  Stops container but doesn’t allow it to run the container shutdown process.

15. `docker rm <container-id>`: Removes the container, needs to be stopped first before removing. Else simply using `docker rm -f <the-container-id>` to stop and remove a container.

16. `docker exec -it <container-id> <some external cmd>`: Pass some input cmd to an already running container. For example,

    ```
    docker run redis  // start the container
    docker exec -it 8e2ea5e5da51 redis-cli  // start redis-cli after running redis
    ```

17. `docker exec -it <container-id> sh`: Starts a shell script inside the container where you can run cmds like `mkdir`, `ls` etc. Use it on an already running container. 

18. `docker run - it <container-name> sh`: Same as above, but this starts a container and then runs the external cmd.

19. `docker build . -`  Executes **“Dockerfile”** commands

20. `docker build -f Dockerfile.dev .`: Runs a dockerfile with specific name for a specific environment, say development.

21. `docker build -t <dockierid>/<repo-name>:latest`: Build image with name say `nish1896/firstimg`. Now you can simply run `docker run nish1896/firstimg:<version num>`.

22. `docker rmi <image-name:tag-name>`: Removes that tag-name from docker

23. `docker system prune`: Removes all containers from the system, would have to redownload to run again.

24. `docker commit -c 'CMD ["redis-server"]' CONTAINERID`

    For Windows,
    `docker commit -c "CMD 'redis-server'" CONTAINERID`

25. `docker run -p p1:p2 <container name/id>`: When running a nodejs server on docker, it would initially run as an isolated machine, so we use port mapping. p1 is the external port, and p2 is the port you are running on docker container. So now, it will redirect traffic to docker nodejs app running inside the container.

26. `docker push <img-name>`: Push image to docker-hub

27. `docker-compose up`: Run images in `docker-compose.yml` file

28. `docker-compose up --build`: Re-build your docker image and then run images in `docker-compose.yml` file
 
29. `docker-compose up -d`: Launch in background

30. `docker-compose -f docker-compose.json up`: Run docker-compose with a different fileName

docker-compose down - stop containers

docker-compose ps - list all containers running within docker-compose.yml file. Wud throw an err if it doesnt find  docker-compose.yml in your pwd

docker Quickstart (recommended)
docker run -it -p 3000:3000 -v /app/node_modules -v ${PWD}:/app -e CHOKIDAR_USEPOLLING=true CONTAINER_ID
GitBash
winpty docker run -it -p 3000:3000 -v /app/node_modules -v "/$(PWD)":/app -e CHOKIDAR_USEPOLLING=true CONTAINER_ID
PowerShell
docker run -it -p 3000:3000 -v /app/node_modules -v /c/Users/username/frontend:/app -e CHOKIDAR_USEPOLLING=true CONTAINER_ID
	To start react app docker container for windows
docker run -p 3000:3000 -v app/node_modules -v $(pwd):/app <container-id>

To run and reload react app on change in src code. v app/node_modules means put a bookmark on the node_modules folder. -v $(pwd):/app means map the pwd into the ‘/app’ folder so that we dont hav to re-build everytime the app code is modified.

docker run -it <container-id> npm run test -- --coverage - to override default cmd. “-- --coverage” is to exit the program after all tests executed. If flag not specified, it will wait for user input to proceed further. 

docker attach <container-id> - stdin to the default process of the container

docker run -p <ur-port-no>:80 <container-id> - to run static content hosted on nginx. The default port nginx uses is 80.  Now open localhost:<ur-port-no> and run the app.


KUBERNETES COMMANDS

Kubectl apply -f filename.yml - configure and start your k8 cluster

Kubetcl apply -f k8s - if your folder named k8s has multiple files, using this cmd we can run all of these at once.

Kubectl get pods - gets list of running pods ( kind: Pod )

Kubectl get services - gets list of running services  ( kind: Service )

minikube ip - ip of the running k8 cluster, in dev, won’t run on localhost, but wud run on this IP
Minikube start

Kubectl describe <obj-type> <obj-name> - get info about that cluster.  
Eg. kubectl describe pod client-pod 

      8.  Kubectl delete -f filename.yml - delete your running k8 cluster

      9.  kubectl get <obj-type> - get instances running, eg. kubectl get deployments

    10. Kubectl set image <obj-type> / <obj-name> <container-name> = <new-img> - 
          configure   to use newer/specific version of an image. 
          Eg: kubectl set image deployment/client-deployment client=latestimg:v5

     11. Eval $(minikube docker-env) - reconfigure docker env in the current terminal, wud list 
           all  containers running, by running docker ps after this command

     12. minikube docker-env - import docker vars into minkube, substitute of the above cmd

     13. Kubectl get storageclass -  shows options to create persistent volumes
 
     14. Kubectl get pv - shows list of persistent volumes 

     15. Kubectl create secret <type-of-secret> <secret-name> --from-literal key=value -   
           generate a secret env variable, esp passwords.
           Eg: kubectl create secret generic pgpassword --from-literal    
           MYPASSWORD=Passowrd123 
           Then retrieve it using kubectl get secrets
   
    16. Minikube dashboard - open active clusters and pods in browser




