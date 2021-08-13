#!/usr/local/bin/python3
from Bio import SeqIO
import cgi, json
import os
import mysql.connector
from os import listdir
from os.path import isfile, join
import cgi, cgitb
cgitb.enable(display=False)
cgitb.enable(logdir="/var/www/html/avasant1/finalproj/cgi-logs/")

mypath = "./FASTA/"

def main():
    print("Content-Type: application/json\n\n")
    form = cgi.FieldStorage()
    term = form.getvalue('data')
    
    try:   
        conn = mysql.connector.connect(user='avasant1', password='Amoeba@06', host='localhost', database='avasant1')
        cursor = conn.cursor()
        
        qry1 = """
            SELECT accession, description FROM transcripts 
            WHERE accession = %s
        
        """
        cursor.execute(qry1, (term,))
        
        
        products = {"match_count": 0, "pdts": list() }
        for (accession, description) in cursor:        
            products["pdts"].append({"accession": accession,"description":description})
            products["match_count"] += 1
        if(products["match_count"] >= 1):
            data = "Data already exists in DB, pick another record to save."        
            sresults = {"dbstatus": data}
            print(json.dumps(sresults))  
        else:       
            
            #get the file names in the FASTA folder
            fnames = [f for f in listdir(mypath) if isfile(join(mypath, f))]
        
            results = { 'match_count': 0, 'matches': list() }

            for filename in fnames:
                for seq_record in SeqIO.parse("./FASTA/"+filename, "fasta"):
                    if (term in seq_record.id) :                
                        accession = seq_record.id
                        desc = seq_record.description
                        seqlen = len(seq_record)
                        seq = str(seq_record.seq)
                        
            qry2 = """
                INSERT INTO transcripts (accession, description,seqlen,sequence ) VALUES (%s,%s,%s,%s)
            """
            cursor.execute(qry2, (accession,desc,seqlen,seq) )
            data = "Data saved successfully."
            
            sresults = {"dbstatus": data}
            
            conn.commit();
            print(json.dumps(sresults))
    except:
        cgi.print_exception()
    finally:
        if conn.is_connected():
           cursor.close()
           conn.close()
    
   
 

if __name__ == '__main__':
    main()
