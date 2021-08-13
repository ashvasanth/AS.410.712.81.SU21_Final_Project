#!/usr/local/bin/python3
from Bio import SeqIO
from os import listdir
from os.path import isfile, join
import cgi, cgitb
import json
cgitb.enable(display=False)
cgitb.enable(logdir="/var/www/html/avasant1/finalproj/cgi-logs/")

mypath = "./FASTA/"

def main():
    print("Content-Type: application/json\n\n")
    #get the search term from the form
    form = cgi.FieldStorage()
    term = form.getvalue('search_term')    
    
    try:
        #get the file names in the FASTA folder
        fnames = [f for f in listdir(mypath) if isfile(join(mypath, f))]
        
        results = { 'match_count': 0, 'matches': list() }

        for filename in fnames:
            for seq_record in SeqIO.parse("./FASTA/"+filename, "fasta"):
                if (term in seq_record.id) or (term in seq_record.description) :                
                    accession = seq_record.id
                    desc = seq_record.description
                    seqlen = len(seq_record)
                    seq = str(seq_record.seq)
                    results['matches'].append({'accession':accession,'description':desc,'sequence_length':seqlen,'sequence':seq})
                    results['match_count'] += 1
            
        print(json.dumps(results))
    except:
        cgi.print_exception()
    
if __name__ == '__main__':
    main()
        