from datetime import datetime

if __name__ == "__main__":
    # FIND DOUBLE NAMES
    node_dblp_file = open('data_set/Nodes', 'r')
    node_dblp_lines = node_dblp_file.readlines()

    edge_dblp_file = open('data_set/Edges', 'r')
    edge_dblp_lines = edge_dblp_file.readlines()

    node_arxiv_file = open('data_set_with_arxiv/Nodes', 'r')
    node_arxiv_lines = node_arxiv_file.readlines()

    edge_arxiv_file = open('data_set_with_arxiv/Edges', 'r')
    edge_arxiv_lines = edge_arxiv_file.readlines()

    nodes_to_add = []
    edges_to_add = []

    # dblp_nodes_dict = {}
    arxiv_nodes_dict = {}
    dblp_id_in_arxiv = {}
    
    # dblp_edges_dict = {}
    arxiv_edges_dict = {}

    print("Start")
    print(datetime.now().strftime("%H:%M:%S"))

    # for dblp_node in node_dblp_lines:
    #     dblp_id = dblp_node.split(',')[0]
    #     dblp_name = dblp_node.split(',')[1]
    #     dblp_nodes_dict[dblp_id] = dblp_name
    
    print("Finished to add DBLP Nodes")
    print(datetime.now().strftime("%H:%M:%S"))

    for arxiv_node in node_arxiv_lines:
        arxiv_id = arxiv_node.split(',')[0]
        arxiv_name = arxiv_node.split(',')[1]
        arxiv_nodes_dict[arxiv_name] = arxiv_id

    print("Finished to add Arxiv Nodes")
    print(datetime.now().strftime("%H:%M:%S"))

    for dblp_node in node_dblp_lines:
        find = False
        dblp_id = dblp_node.split(',')[0]
        dblp_name = dblp_node.split(',')[1]
        arxiv_id = arxiv_nodes_dict.get(dblp_name)
        if arxiv_id == None:
            nodes_to_add.append(dblp_node)
        else:
            dblp_id_in_arxiv[dblp_id] = arxiv_id

    
    print('Done Nodes')
    print(datetime.now().strftime("%H:%M:%S"))

    # for dblp_edge in edge_dblp_lines:
    #     dblp_id = dblp_edge.split(',')[0]
    #     dblp_name = dblp_edge.split(',')[1]
    #     dblp_edges_dict[dblp_id] = dblp_name
    
    print("Finished to add DBLP Edges")
    print(datetime.now().strftime("%H:%M:%S"))

    for arxiv_edge in edge_arxiv_lines:
        arxiv_id1 = arxiv_edge.split(',')[0]
        arxiv_id2 = arxiv_edge.split(',')[1].split('\n')[0]
        arxiv_edges_dict[arxiv_id1 + "," + arxiv_id2] = 1
        arxiv_edges_dict[arxiv_id2 + "," + arxiv_id1] = 1

    print("Finished to add Arxiv Edges")
    print(datetime.now().strftime("%H:%M:%S"))

    for dblp_edge in edge_dblp_lines:
        find = False
        dblp_id1 = dblp_edge.split(',')[0]
        dblp_id2 = dblp_edge.split(',')[1].split('\n')[0]
        # Update id to Arxiv numbers
        arxiv_maybe_id1 = dblp_id_in_arxiv.get(dblp_id1)
        arxiv_maybe_id2 = dblp_id_in_arxiv.get(dblp_id2)
        if not arxiv_maybe_id1 == None:
            dblp_id1 = arxiv_maybe_id1
        if not arxiv_maybe_id2 == None:
            dblp_id2 = arxiv_maybe_id2
        # Search in Arxiv if exist
        if (arxiv_edges_dict.get(dblp_id1 + ',' + dblp_id2) == None) & (arxiv_edges_dict.get(dblp_id2 + ',' + dblp_id1) == None):
            edges_to_add.append(dblp_id1 + ',' + dblp_id2 + '\n')
        
        
            
    print("Done, write to testfile")
    print(datetime.now().strftime("%H:%M:%S"))
    nodesTestFile = open('nodesTestFile', 'w+')
    for line in nodes_to_add:
        nodesTestFile.write(line)
    edgesTestFile = open('edgesTestFile', 'w+')
    for line in edges_to_add:
        edgesTestFile.write(line)
