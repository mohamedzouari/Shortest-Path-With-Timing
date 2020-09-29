### Concept
  - After Parsing the Input, we generate a graph from the structure with start and a finish
  - We Apply a shortest path algorithm based on dijkstra seach and we add a timing check in order to update the paths
  - The time units processing is based on minutes
  - side-note: since we only have HH:MM, we will suppose the trips happen in the same day.

### Execution
  - In order to execute the program we need to run **node parsing.js base.txt**
  - base.txt is the input file you can tweak it to perform different  tests
  - fs library is required to execute the script
  - algorithmv0, is an experimental version of the algorithm where we execute it on static integers