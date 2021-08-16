
*  ABOUT *

The FASTA manipulation tool is an application for reading FASTA files and saving them
to the MySQL database.

Souce code can be obtained here:/var/www/html/avasant1/finalproj

Location of tar file: /var/www/html/avasant1/finalproj.tar


Demo using a FASTA file repository:
http://bfx3.aap.jhu.edu/avasant1/finalproj/fprocess.html

The application uses MySQL server hosted in the Bfx3 class server. The database used is 'avasant1'.
The FASTA information is saved to the table 'transcripts'.

* REQUIREMENTS *

Storage requirements for the application mainly involves storage space
for the FASTA files in the folder "FASTA". The directory must be present in the path : ./finalproj/FASTA


There are no special memory/CPU requirements.

The code uses Python OS modules and the BioPython package to parse FASTA files.
The calls to the CGI scripts from the JavaScript event handlers are made using AJAX calls. The CGIs return JSON objects 
back to the JavaScript functions, which are then used to dynamically generate content for the HTML page.


* DETAILED USAGE *

1. There are three search options provided. 
	a. In the top panel, on to the left, the user may select a FASTA file from the dropdown. 
	   The dropdown lists the available files present in the FASTA repository. 
	b. The search on the top-right, allows the user to retrieve the FASTA information based on the 
	   search term.This would be ideal to see the FASTA already saved in the database.
	c. Free text search- this option is provided as a second level search option, where the user
	   can enter a search term and the program searches and lists information of all FASTA files in the 
	   directory containing the search string. 

2. The tabular display of the FASTA header resulting from the search of the FASTA file from the dropdown,
has the accession number as a hyperlink, taking the user to the NCBI page for the corresponding record
in a new tab on the browser. The other columns of the table are description and sequence length. 

3. The table generated from the 'Search from database' search is a table with the available FASTA records with
accession, description, and sequence length fields. 

4. The 'Free text search' option is enabled only after the user performs the search on the left dropdown or
searches the database. The user input search string is checked against all the files in the FASTA directory, 
and the files with matching search criteria are retrieved and displayed in the tabular format. The sequence information
is also available for viewing. 
Each record in the table comes with a "Save to DB" button, on click of which the corresponding record would be saved
in the 'transcripts' table of 'avasant1' database. User-friendly messages are displayed to indicate whether the data was 
saved successfully or if the data was already present in the database.

5. Error handling: To ensure that the program does not terminate for lack of valid user input, appropriate error-handling
has been implemented. A click on submit before selecting a file from the dropdown, or without entering a search term in the 
search boxes will result in the program displaying a error message in red asking the user to make the selection or enter the
search term before clicking submit. 


*DEMO DATA *

FASTA files necessary for the application is available at /var/www/html/avasant1/finalproj/FASTA

Below is the table structure of 'transcripts' table:

+-------------+--------------+------+-----+---------+-------+
| Field       | Type         | Null | Key | Default | Extra |
+-------------+--------------+------+-----+---------+-------+
| accession   | varchar(50)  | NO   | PRI | NULL    |       |
| description | varchar(255) | NO   |     | NULL    |       |
| seqlen      | smallint(6)  | YES  |     | NULL    |       |
| sequence    | text         | YES  |     | NULL    |       |
+-------------+--------------+------+-----+---------+-------+




