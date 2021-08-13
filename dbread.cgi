#!/usr/local/bin/python3

import cgi, json
import mysql.connector
import cgi, cgitb
cgitb.enable(display=False)
cgitb.enable(logdir="/var/www/html/avasant1/finalproj/cgi-logs/")



def main():
    print("Content-Type: application/json\n\n")
    form = cgi.FieldStorage()
    term = form.getvalue('data')
    
    try:   
        conn = mysql.connector.connect(user='avasant1', password='Amoeba@06', host='localhost', database='avasant1')
        cursor = conn.cursor()
        
        qry1 = """
            SELECT accession, description, seqlen FROM transcripts 
            WHERE description LIKE %s
        
        """
        cursor.execute(qry1, ('%' + str(term) + '%', ))
        
        
        products = {"match_count": 0, "pdts": list() }
        for (accession, description, seqlen) in cursor:        
            products["pdts"].append({"accession": accession,"description":description,"seqlen":seqlen})
            products["match_count"] += 1          
        
        print(json.dumps(products))
    except:
        cgi.print_exception()
    finally:
        if conn.is_connected():
           cursor.close()
           conn.close()
    
   
 

if __name__ == '__main__':
    main()
