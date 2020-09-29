const PathFinder = require('./algorithmv1'); 

var fs = require('fs');
filename = process.argv[2];

fs.readFile(filename, 'utf8', function(err, data) {
  if (err) throw err;
  
  lines = data.split('\n');
  //First Line Parsing
  line1 = lines[0].split(';');

  arrivalTime = line1[0];
  arrivalTimeMin = parseInt(arrivalTime.split(':')[0])*60+parseInt(arrivalTime.split(':')[1]);
  start = line1[1];
  finishCity = line1[2].trim();

  //Second Line Parsing
  nbHoraires = parseInt(lines[1]);

  //Create Graph
  graph = {
    finish: {}
   };

  //Parsing the rest of the lines
  //initializing graph objects
  for(var i = 2;i < lines.length;i++){

    horaire = lines[i].trim().split(';');
    if(horaire[1] == start){
        graph['start'] = {};
    }
    else {
        graph[horaire[1]] = {};
    }
  }

  //creating graph structure
  for(var i = 2;i < lines.length;i++){

    horaire = lines[i].trim().split(';');

    //Converting hours to minutes
    depart = parseInt(horaire[0].split(':')[0])*60+parseInt(horaire[0].split(':')[1]);
    duree  = parseInt(horaire[3].split(':')[0])*60+parseInt(horaire[3].split(':')[1]);

    //replacing starting city with start attribute
    if(horaire[1] == start && horaire[2] == finishCity){
        graph['start']['finish'] = [duree,depart];
    }
    else if(horaire[1] === start){
        graph['start'][horaire[2]] = [duree,depart];
    } else if(horaire[2] === finishCity){
        graph[horaire[1]]['finish'] = [duree,depart];
    }
    else {
        graph[horaire[1]][horaire[2]] = [duree,depart];
    }

  }

  //console.log(graph);
  //console.log(arrivalTimeMin);

  Results = PathFinder.shortestPath(graph,arrivalTimeMin);

  //Total Travelling Time is Results[0]

  //Arrival Time
  ArrivalHr = Math.trunc(Results[1]/60)%24;
  ArrivalMin = Results[1]%60;

  //adding 0s in case time is one digit
  ArrivalHrStr = (ArrivalHr.toString().length === 2 ) ? ArrivalHr.toString() : '0'+ArrivalHr.toString();
  ArrivalMinStr = (ArrivalMin.toString().length === 2 ) ? ArrivalMin.toString() : '0'+ArrivalMin.toString();

  //Output
  console.log(ArrivalHrStr+':'+ArrivalMinStr);

});
