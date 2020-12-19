# FIND DOUBLE EDGES
edge_file = open('data_set/Edges', 'r')
edge_lines = edge_file.readlines()

double = []

for i in range(len(edge_lines)):
    edge_first = edge_lines[i].split(',')[0]
    edge_second = edge_lines[i].split(',')[1].replace('\n','')
    subject = edge_lines[i]
    reversed_edge = f'{edge_second},{edge_first}\n'
    if subject in double:
        continue
    if reversed_edge in double:
        continue
    for j in range(i+1, len(edge_lines)):
        candidate = edge_lines[j]
        if (reversed_edge == candidate) | (subject == candidate):
            print('ERROR!!!, Double ' + subject)
            double.extend([subject,reversed_edge])