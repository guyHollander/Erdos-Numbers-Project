# FIND DOUBLE EDGES
edge_file = open('data_set_with_arxiv/Edges', 'r')
edge_lines = edge_file.readlines()

edges = {}
double = []


for edge in edge_lines:
    if edges.get(edge) == None:
        edges[edge] = 1
    else:
        print('ERROR!!!, Double ' + edge)
        double.append(edge)
    edge_first = edge.split(',')[0]
    edge_second = edge.split(',')[1].replace('\n','')
    swapped_edge = f'{edge_second},{edge_first}\n'
    if edges.get(swapped_edge) == None:
        edges[swapped_edge] = 1
    else:
        print('ERROR!!!, Double ' + edge + ' and ' + swapped_edge)
        double.append(swapped_edge)


print(double)