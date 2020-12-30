import subprocess
import sys
import os
import time

def install_git_package(package):
    subprocess.check_call(["pip3", "install", "-U", package])

def install_package(package):
    subprocess.check_call([sys.executable, "-m", "pip", "install", package])

try:
    import dblp
except:
    install_git_package('git+https://github.com/scholrly/dblp-python')
    import dblp

try:
    import pyorcid as orcid
except:
    install_git_package('git+https://github.com/vdmitriyev/pyorcid.git')
    import pyorcid as orcid

try:
    from unidecode import unidecode
except:
    install_package('unidecode')
    from unidecode import unidecode

# if you want to restart this script, put 0 in "save_position" file
round = 10

Debug = False
ERRORS_ALLOWED = 60
fail_counter = 0


def get_new_id(node_file):
    return int(node_file[len(node_file)-1].split(',')[0]) + 1

def find_first_and_last(normalized_splitted):
    is_assigned = False
    first = ''
    last = ''
    for i in range(len(normalized_splitted)):
        if normalized_splitted[i].find('.') == -1:
            if is_assigned == False:
                first = normalized_splitted[i]
                is_assigned = True
            last = normalized_splitted[i]
    return is_assigned, first, last


def choose_name(name, options):
    option_names = list(map(lambda x: unidecode(x.name.lower()), options))
    print(option_names)
    candidate = 0
    splitted_name = name.replace('\n','').split(' ')
    for i in range(len(option_names)):
        option = option_names[i]
        is_assigned, first, last = find_first_and_last(splitted_name)
        if not is_assigned:
            return -1
        find_first = option.find(first)
        find_last = option.find(last)
        cond = True
        if (option.find(first) != -1) & (option.find(last) != -1):
            if find_first > 0:
                if option[find_first - 1].isalpha() == True:
                    cond = False
            if find_first + len(first) < len(option):
                if option[find_first + len(first)].isalpha() == True:
                    cond = False
            if find_last > 0:
                if option[find_last - 1].isalpha() == True:
                    cond = False
            if find_last + len(last) < len(option):
                if option[find_last + len(last)].isalpha() == True:
                    cond = False
            if cond:
                return i
    if len(option_names) == 0:
        return -1
    return candidate


def search_node_in_file_and_add_if_needed(author_name, first, last, node_file, list_to_append):
    if Debug:
        print('first: ' + first)
        print('last: ' + last)
        print(author_name)
    for node in node_file:
        find_first = node.find(first)
        find_last = node.find(last)
        if (find_first != -1) & (find_last != -1):
            if (node[find_first - 1].isalpha() == False) & (node[find_first + len(first)].isalpha() == False) & \
                (node[find_last - 1].isalpha() == False) & (node[find_last + len(last)].isalpha() == False):
                if Debug:
                    print(node)
                founded_node_id = int(node.split(',')[0])
                return node_file, list_to_append, founded_node_id
        if author_name in node:
            if Debug:    
                print(node)
            founded_node_id = int(node.split(',')[0])
            return node_file, list_to_append, founded_node_id

    # Not found
    new_id = get_new_id(node_file)
    node = f'{new_id},{author_name}\n'
    node_file.append(node)
    list_to_append.append(node)
    if Debug:
        print(list_to_append)
    return node_file, list_to_append, new_id


def search_edge_in_file_and_add_if_needed(id1, id2, edge_file, list_to_append):
    edge_option_1 = f'{id1},{id2}\n'
    edge_option_2 = f'{id2},{id1}\n'
    for edge in edges_by_lines:
        if (edge == edge_option_1) | (edge == edge_option_2):
            return edge_file, list_to_append
    # Not found
    edge_file.append(edge_option_1)
    list_to_append.append(edge_option_1)
    return edge_file, list_to_append
            
def save_current(list_of_nodes_to_add, list_of_edges_to_add, id_of_searched):
    appended_nodes = open('data_set/Nodes','a')
    appended_edges = open('data_set/Edges','a')

    print(list_of_nodes_to_add)
    print(list_of_edges_to_add)

    for line in list_of_nodes_to_add:
        appended_nodes.write(line)
    for line in list_of_edges_to_add:
        appended_edges.write(line)

    appended_nodes.close()
    appended_edges.close()
    position_saver = open('scripts/save_position', 'w+')
    position_saver.seek(0)
    position_saver.write(str(id_of_searched + 1))
    position_saver.close()

    return id_of_searched + 1



if __name__ == "__main__":
    # gets the nodes in the beginning
    nodes = open('data_set/Nodes','r+')
    nodes_by_lines = nodes.readlines()
    
    # gets the current edges
    edges = open('data_set/Edges','r+')
    edges_by_lines = edges.readlines()

    nodes.close()
    edges.close()

    list_of_nodes_to_add = []
    list_of_edges_to_add = []

    # read the current position to start from
    position_saver = open('scripts/save_position', 'r+')
    position_saver.seek(0)
    position = int(position_saver.read())
    position_saver.close()

    # for inside use only:
    while True:
        try:
            for node_in_file in nodes_by_lines:
                name_to_find = node_in_file.split(',')[1].replace('_', ' ')
                id_of_searched = int(node_in_file.split(',')[0])
                print(name_to_find)
                print(id_of_searched)
                print(list_of_nodes_to_add)
                print(list_of_edges_to_add)

                # skip on passed ids
                if id_of_searched < position:
                    continue

                options = dblp.search(name_to_find)
                chosen_publisher_index = choose_name(name_to_find, options)
                print(chosen_publisher_index)
                if chosen_publisher_index != -1:
                    publisher = dblp.search(name_to_find)[chosen_publisher_index]
                    # run on every publications and adding it to "nodes_by_lines"
                    for article in publisher.publications:
                        authors_of_article = article.authors
                        print(authors_of_article)
                        for author in authors_of_article:
                            author = unidecode(author.lower())
                            if author != unidecode(publisher.name.lower()):
                                author_splitted = author.split(' ')
                                # normalizing names
                                normalized_author = ""
                                for i in range(len(author_splitted)):
                                    if author_splitted[i].isnumeric() == False:
                                        normalized_author = normalized_author + author_splitted[i] + '_'
                                normalized_author = normalized_author[:len(normalized_author)-1]
                                normalized_splitted = normalized_author.split('_')
                                

                                # find first and last name which not contain '.' in them
                                # first, last = find_first_and_last(normalized_splitted)
                                is_assigned, first, last = find_first_and_last(normalized_splitted)
                                if not is_assigned:
                                    continue
                                
                                # Search in Nodes file
                                nodes_by_lines, list_of_nodes_to_add, added_id = search_node_in_file_and_add_if_needed(normalized_author, first, last, 
                                                                        nodes_by_lines, list_of_nodes_to_add)
                                # do not add inside edge
                                if id_of_searched != added_id:
                                    # find if edge exists
                                    edges_by_lines, list_of_edges_to_add = search_edge_in_file_and_add_if_needed(id_of_searched, added_id, 
                                                                            edges_by_lines, list_of_edges_to_add)
                # save to file every "round" names
                if (id_of_searched % round == 0) & (id_of_searched != 0):
                    # adding all the and edges:
                    save_current(list_of_nodes_to_add, list_of_edges_to_add, id_of_searched)
                    # If you want to stop the script every X names - uncomment this
                    # break

                    list_of_nodes_to_add = []
                    list_of_edges_to_add = []
            break
        except KeyboardInterrupt:
            # quit
            print('bye bye')
            sys.exit()
        except SyntaxError:
            print('PROBLEM!!!')
            time.sleep(5)
            # adding all the and edges:
            position = save_current(list_of_nodes_to_add, list_of_edges_to_add, id_of_searched)

            list_of_nodes_to_add = []
            list_of_edges_to_add = []
        # return to the last saved position
        except:
            print('PROBLEM!!!')
            # wait for half minute before rerun
            time.sleep(60)
            # count the number of fails
            fail_counter += 1
            print (fail_counter)
            print ('Trying again')

            if fail_counter == ERRORS_ALLOWED:
                break

            # save the position of the current id to return to it
            position = save_current(list_of_nodes_to_add, list_of_edges_to_add, id_of_searched - 1)
            
            list_of_nodes_to_add = []
            list_of_edges_to_add = []

    print('too many errors')
    print('bye bye')

