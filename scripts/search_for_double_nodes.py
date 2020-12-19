# FIND DOUBLE NAMES
node_file = open('data_set/Nodes', 'r')
node_lines = node_file.readlines()

double = []

for i in range(len(node_lines)):
    subject = node_lines[i].split(',')[1].replace('\n','')
    subject_id = node_lines[i].split(',')[0]
    id_list = [subject_id]
    if subject in double:
        continue
    for j in range(i+1, len(node_lines)):
        candidate = node_lines[j].split(',')[1].replace('\n','')
        candidate_id = node_lines[j].split(',')[0]
        if subject == candidate:
            print('ERROR!!!, Double ' + subject)
            double.append(candidate)
            id_list.append(candidate_id)
    if len(id_list) > 1:
        print(id_list)