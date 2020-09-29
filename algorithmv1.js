

const findLowestWeightNode = (weights, processed) => {
    const knownNodes = Object.keys(weights);
    
    const lowestWeightNode = knownNodes.reduce((lowest, node) => {
    if (lowest === null && !processed.includes(node)) {
     lowest = node;
     }
   if (weights[lowest] && weights[node][0] < weights[lowest][0] && !processed.includes(node)) {    
   lowest = node;
    }
   return lowest;
   }, null);
   
  return lowestWeightNode;
 };


exports.shortestPath = (graph, arrivalTime) => {

    //the first elements that will be put in weights key must have a departure time > arrival time
    var startingNodes = {};
    for(let i in graph.start){
        if(graph.start[i][1] >= arrivalTime){
            startingNodes[i] = graph.start[i];
        }
    }
   
    // track lowest cost to reach each node  
    const weights = Object.assign({finish: [Infinity,Infinity]}, startingNodes); 

    //add the reached time init
    initChildren = startingNodes;
    for (let n in initChildren)  {
        weights[n][1] = initChildren[n][0] + initChildren[n][1] ;
    }
       
    // track nodes that have already been processed  
    const processed = [];
    //Next, we’ll set the initial value of the node being processed //using the lowestCostNode function. Then, we’ll begin a while loop, //which will continuously look for the cheapest node.
    let node = findLowestWeightNode(weights, processed);
       
    while (node) {
        //console.log(node)
        
    //Get the weight of the current node
    let weight = weights[node][0];
    //Get the time of the current node
    let reachedTime = weights[node][1];
    //Get all the neighbors of current node
    let children = graph[node]; 
    //Loop through each of the children, and calculate the weight to reach that child node. We'll update the weight of that node in the weights object if it is lowest or the ONLY weight available
    for (let n in children) {   
        let newWeight = weight + children[n][0];
        //updating reach time 
        weights[n][1] = children[n][1] + children[n][0];
 
        if ((!weights[n] || weights[n][0] > newWeight) && reachedTime <= children[n][1]) { 
          weights[n][0] = newWeight; 
            }
         }

     //push processed data into its data structure
     processed.push(node);
     // repeat until we processed all of our nodes.    
     node = findLowestWeightNode(weights, processed);
    }

    return weights.finish;

};