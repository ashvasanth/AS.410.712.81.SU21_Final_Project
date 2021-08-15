#!/usr/local/bin/python3
from os import listdir
from os.path import isfile, join
import cgi, json

import cgi, cgitb
cgitb.enable(display=False)
cgitb.enable(logdir="/var/www/html/avasant1/finalproj/cgi-logs/")


mypath = "./FASTA/"
def main():
    print("Content-Type: application/json\n\n")
    
    
    try: 
        fnames = [f for f in listdir(mypath) if isfile(join(mypath, f))]                  
        
        flist = { "pdts": list() }
        for files in fnames:   
            flist["pdts"].append({"filename":files})
                     
        
        print(json.dumps(flist))
    except:
        cgi.print_exception()
    
   
 

if __name__ == '__main__':
    main()
