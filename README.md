This is a simple demo of how to run a Node.js server on a Kubernetes cluster.

The Node.js server code is car.js. It returns a few attributes like model, make
and year of a car given its Vehicle Identification Number (vin). The server runs
on port 3000.

_Steps to run the demo:_

* First run:  
`kubectl create -f deployment.yaml`

* Let the pods be up and running:  
`kubectl get pods -l app=nodeapp`

* Then run:  
`kubectl create -f service.yaml`  
The service runs on port 6000

* Retrieve the Service IP address and port:  
`export SERVICE_IP=$(kubectl get service nodeapp-service -o go-template='{{.spec.clusterIP}}')`  
`export SERVICE_PORT=$(kubectl get service nodeapp-service -o go-template='{{(index .spec.ports 0).port}}')`  
`echo "$SERVICE_IP:$SERVICE_PORT"`  

* Then create a pod running busybox and create shell into it:  
`kubectl run busybox  --generator=run-pod/v1 --image=busybox --restart=Never --tty -i --env "SERVICE_IP=$SERVICE_IP" --env "SERVICE_PORT=$SERVICE_PORT"`

* Now inside the busybox shell, try to access the service:  
`wget -qO- http://$SERVICE_IP:$SERVICE_PORT/car/3FADP4BJ5FM141037`  
The response should be like:  
`3FADP4BJ5FM141037:{"make":"toyota","model":"highlander","year":2017}`  
Exit the busybox pod.

Alternatively, use the service spec with NodePort (`service.nodeport.yaml`).  
The nodePort specified in this service spec is 30003.  
In that case, the service can be accessed from any of the Kubernetes nodes.  
Find the IP address of a Kubernetes node using the command:  
`kubectl describe node <node_name>`  
Then access the service using curl:  
`curl http://NODE_IP_ADDRESS:30003/car/3FADP4BJ5FM141037`
