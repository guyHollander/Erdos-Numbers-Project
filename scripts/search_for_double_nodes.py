# FIND DOUBLE NAMES
node_file = open('data_set_with_arxiv/Nodes', 'r')
node_lines = node_file.readlines()

double = []
nodes_numbers = {}
nodes_names = {}

for node in node_lines:
    node_number = node.split(',')[1]
    node_name = node.split(',')[0]
    if nodes_numbers.get(node_number) == None:
        nodes_numbers[node_number] = 1
    else:
        print('ERROR!!!, Double Number' + node_number)
        double.append(node_number)
    if nodes_numbers.get(node_name) == None:
        nodes_numbers[node_name] = 1
    else:
        print('ERROR!!!, Double Number' + node_name)
        double.append(node_name)
    
print(double)
