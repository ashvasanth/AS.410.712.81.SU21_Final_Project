#!/usr/local/bin/python3
from Bio import SeqIO
import cgi, cgitb
import json
cgitb.enable(display=False)
cgitb.enable(logdir="/var/www/html/avasant1/finalproj/cgi-logs/")

def main():
    print("Content-Type: application/json\n\n")
    #get the selected value from the form
    form = cgi.FieldStorage()
    term = form.getvalue('data') 
    
    #fname = './FASTA/'+term+'.fasta'
    fname = './FASTA/'+term
    
    
    results = { 'match_count': 0, 'matches': list() }
    try:
        for seq_record in SeqIO.parse(fname, "fasta"):        
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
        