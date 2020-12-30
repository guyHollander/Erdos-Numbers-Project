import subprocess
import sys
import os
import time

def install_package(package):
    subprocess.check_call([sys.executable, "-m", "pip", "install", package])
def uninstall_package(package):
    subprocess.check_call([sys.executable, "-m", "pip", "uninstall", package])

import xml.etree.ElementTree as ET
import urllib.request

DEBUG = False
NAMES = False
NAME = False
DATA = False

VALID_LIMIT = 5
STEP = 50

def remove_duplicats(x):
  return list(dict.fromkeys(x))

def request(name, start):
    url = ('http://export.arxiv.org/api/query?search_query=au:' + '%20'.join(name.split(' ')) +
            '&start='+ str(start) + '&max_results=' + str(STEP))
    data = urllib.request.urlopen(url).read()
    if DATA:
        print(data)
    return data

def parse_xml(xml_string):
    root = ET.fromstring(xml_string)
    return root


def run_on_xml(xml_root, name):
    co_authors = []
    article_co = []
    valid_counter = 0
    to_stop = False
    results_counter = 0
    for child in xml_root:
        if 'entry' in child.tag:
            if DEBUG:
                print('\nENTRY')
            valid = False
            for cchild in child:
                results_counter += 1
                if 'author' in cchild.tag:
                    if DEBUG:
                        print('AUTHOR')
                    cname = cchild[0]
                    # for cname in cchild:
                    if DEBUG:
                        print(cname.text)
                    if cname.text == name:
                        valid = True
                    if (len(cname.text.split(' ')) > 1) & ('univ' not in cname.text.lower()) & ('science' not in cname.text.lower()) & ('institute' not in cname.text.lower()):
                        article_co.append(cname.text)
            valid_counter += 1
            if valid:
                co_authors.extend(article_co)
                valid_counter = 0
            if valid_counter == VALID_LIMIT:
                to_stop = True
                break
    co_authors = remove_duplicats(co_authors)
    if name in co_authors:
        co_authors.remove(name)
    if results_counter < STEP:
        to_stop = True
    return co_authors, to_stop

def all_co_authors(name):
    start = 0
    co_authors = []
    is_done = False
    while not is_done:
        api_response = request(name, start)
        xml_root = parse_xml(api_response)
        response, is_done = run_on_xml(xml_root, name)
        co_authors.extend(response)
        start += STEP
        if DEBUG:
            print('END')
    if NAMES:
        print(co_authors)
    return co_authors

if __name__ == "__main__":
    name = "Kimberly L. H. Carpenter"
    if NAME:
        print('%20'.join(name.split(' ')))
    co_authors = all_co_authors(name)
