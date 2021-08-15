// Function to get FASTA header of selected file from drop down list.
function getfsheader( term ) {
	 
	// hide and clear the previous results, if any
    $('#results').hide();
	$('#searchfasta').hide();
	$('#searchfasta>sfheader').hide();
	$('#searchfasta>tbody').empty();
	$('#db_results').hide();	
	$('#match_res').hide();
	$('#db_res').hide();
	
	//retrieve value of the selected item
    var sel_item = $('#fileval option:selected').text();
	
	 // transforms all the form parameters into a string we can send to the server
    var frmStr = $('#fasta_in').serialize();	
	
    $.ajax({
        url: "./getfheader.cgi?data=" + sel_item,
        dataType: 'json',
        data: sel_item,
        success: function(data, textStatus, jqXHR) {			
            processJSON(data);
        },
        error: function(jqXHR, textStatus, errorThrown){
            alert("Failed to perform FASTA header search! textStatus: (" + textStatus +
                  ") and errorThrown: (" + errorThrown + ")");
        }
    });
}
// this processes a passed JSON structure representing the match and draws it
//  to the result table
function processJSON( data ) {    
    
    // this will be used to keep track of row identifiers
    var next_row_num = 1;
	
    // iterate over each match and add a row to the result table for each
    $.each( data.matches, function(i, item) {
		var this_row_id = 'result_row_' + next_row_num++;
    
        // create a row and append it to the body of the table
        $('<tr/>', { "id" : this_row_id } ).appendTo('#searchfasta>tbody');
        
        // add the accession column
        $('<td/>' ).prepend($('<a></a>').attr({ href: "https://www.ncbi.nlm.nih.gov/nuccore/"+item.accession, target:"_blank" }).text(item.accession)).appendTo('#' + this_row_id);
        
        // add the description column
        $('<td/>', { "text" : item.description } ).appendTo('#' + this_row_id);
		
		// add the description column
        $('<td/>', { "text" : item.sequence_length } ).appendTo('#' + this_row_id);

    });
    $('#results').show();
	$('#searchfasta').show();
	$('#searchfasta>sfheader').show();
	$('#sbox').show();
	$('#match_res').hide();
	$('#sec_space').hide();
	
    
}



//Called when the user clicks on the dropdown, generates the items for dropdown list.
function searchdpfiles() {
	$('fileval').empty();
	$.ajax({
        url: "./retfiles.cgi",
        dataType: 'json',        
        success: function(data, textStatus, jqXHR) {			
           
			var $dropdown = $("#fileval");
			$.each( data.pdts, function(i, item) {
			
				$dropdown.append($("<option />").val(this.item).text(this.filename));
				
			});
        },
        error: function(jqXHR, textStatus, errorThrown){
            alert("Failed to get drop down list! textStatus: (" + textStatus +
                  ") and errorThrown: (" + errorThrown + ")");
        }
    });
	
}

//execute file search for search string input by Ajax call
function searchdb( term ) {
	
	// hide and clear the previous results, if any
	$('#results').hide();
	$('#searchfasta>sfheader').hide();
    $('#db_results').hide();
	$('#dbval>sdbheader').hide();
	$('#dbval').hide();	
	$('#dbval>tbody').empty();
	$('#searchfasta>tbody').empty();
	$('#match_res').hide();
	
	
	//retrieve value of the search string
	var searchterm = $('#fs_searchterm').val();		
	
	$.ajax({
        url: "./dbread.cgi?data=" + searchterm,
        dataType: 'json',
        data: searchterm,
        success: function(data, textStatus, jqXHR) {	
            showdbtable(data);
        },
        error: function(jqXHR, textStatus, errorThrown){
            alert("Failed to perform DB search! textStatus: (" + textStatus +
                  ") and errorThrown: (" + errorThrown + ")");
        }
    });
	
}
//Function to generate dynamic table to display Search DB results
function showdbtable( data ) {
			
	// set the span that lists the match count
    $('#match_count').text( data.match_count );
	
    if(data.match_count ==0){
		
		$('#db_results').show();
		$('#dbval').hide();
		$('#searchfasta>sdbheader').hide();
		$('#sbox').show();
		$('#match_res').hide();
		$('#db_res').show();
		$('#sec_space').hide();		
		
	}
	
	else {
		
		// set the span that lists the match count
		$('#match_count').text( data.match_count );
		// this will be used to keep track of row identifiers
		var next_row_num = 1;
		
		// iterate over each match and add a row to the result table for each
		$.each( data.pdts, function(i, item) {
			
			var this_row_id = 'result_row_' + next_row_num++;
		
				// create a row and append it to the body of the table
				$('<tr/>', { "id" : this_row_id } ).appendTo("#dbval>tbody");
			
				// add the accession column		   
				$('<td/>', { "text" : item.accession } ).appendTo('#' + this_row_id);
				
				// add the description column
				$('<td/>', { "text" : item.description } ).appendTo('#' + this_row_id);
				
				// add the sequence length column
				$('<td/>', { "text" : item.seqlen } ).appendTo('#' + this_row_id);
				

		});
    
		// now show the result section and search box that was previously hidden
		$('#db_results').show();
		$('#dbval').show();
		$('#dbval>sdbheader').show();
		$('#results').hide();
		$('#sbox').show();
		$('#match_res').hide();
		$('#db_res').show();
		$('#sec_space').hide();
			
	}
	
}

function showhide(){
	$('#db_results').hide();
	$('#dbval').hide();
	$('#searchfasta').hide();
	$('#searchfasta>sfheader').hide();
	$('#dbval>sdbheader').hide();
	$('#results').hide();
	$('#sbox').hide();
	$('#match_res').hide();
	$('#db_res').hide();

}
$(document).ready( function() {
	
	$('#fileval').click( function() {
		showhide();
        //Call function to populate drop down only if empty
		if($('#fileval option:selected').text()== ""){			
			searchdpfiles();		
		}		
        return false;  // prevents 'normal' form submission
    });	
	
	// Called when a user clicks submit:select gene to investigate		
	$('#submit').click( function() {
		showhide();
		$('#msg').text( "");			
		var fname = $('#fileval option:selected').text();
		//Form validation for user input before submit.
		if(fname == ""){			
			$('#msg').html("Select a file from the dropdown and then click submit.");			
		}
		else {			
			getfsheader();	
		}
        	
        return false;  // prevents 'normal' form submission
    });	
	
	 // Called when the user search submit to DB 	
	$('#fs_submit').click(function(){
		showhide();
		var sterm = $('#fs_searchterm').val();
		var fname = $('#fileval option:selected').text();
		//Form validation for user input before submit.
		if (fname == ""){			
			$('#msg').html("Select a file from the dropdown and then click submit.");		
		}
		//If drop down not selected, then append the error message
		if(sterm == ""){
			$('#msg').append("\nPlease enter a search term and then click submit.");	
		}
		else{
			$('#msg').text( "");
			searchdb();
		}
		
		return false;		
	});
	// Called when the user submits free text search. 	
	$('#search_submit').click( function() {	
		showhide();	
		$('#search2').text( "")		
		var term = $('#search_term').val();
		//Form validation for user input before submit.
		if(term == ""){			
			$('#search2').html("Please enter a search term and then click submit.");	
			$('#sbox').show();
			$('#sec_space').show();	
		}
		else {
			searchfiles();	
		}
        	
        return false;  // prevents 'normal' form submission
    });	
	
	
});

//execute FASTA file search for search string
function searchfiles( term ) {
	
	$('#sbox').show();
	$('#searchfasta>tbody').empty(); 
	$('#dbval>tbody').empty();
	$('#searchval>tbody').empty();
	$('#fs_results').hide();
	$('#searchval').hide();
	$('#searchval>ftheader').hide();
	$('#db_res').hide();
	$('#sec_space').show();
	
	//retrieve value of the search string
	var searchterm = $('#search_term').val();	
	
	
	// transforms all the form parameters into a string we can send to the server
    var frmStr = $('#file_search').serialize();	
	
	$.ajax({
        url: './searchfiles.cgi',
        dataType: 'json',
        data: frmStr,
        success: function(data, textStatus, jqXHR) {				
            genTable(data);
        },
        error: function(jqXHR, textStatus, errorThrown){
            alert("Failed to perform FASTA file search! textStatus: (" + textStatus +
                  ") and errorThrown: (" + errorThrown + ")");
        }
    });
}
function genTable( data ) { 
	
    // set the div text that lists the match count	
	$('#f_match').html(data.match_count+ " match(es) found.");
	
	if(data.match_count ==0){
		$('#fs_results').show();
		$('#searchval').hide();
		$('#sbox').show();
		$('#match_res').hide();	
		$('#results').show();		
		$('#searchval>ftheader').hide();
		$('#f_match').show();	
		$('#sec_space').hide();		
		
	}
	
	else {
		
		// this will be used to keep track of row identifiers
		var next_row_num = 1;
		
		// iterate over each match and add a row to the result table for each
		$.each( data.matches, function(i, item) {
			var this_row_id = 'result_row_' + next_row_num++;
			
			
			// create a row and append it to the body of the table
			$('<tr/>', { "id" : this_row_id } ).appendTo("#searchval>tbody");
			
			// add a checkbox to each row in the table
			$('<td/>').html('<input type="submit" name="savedb" id="savedb" value="Save to DB" />').appendTo('#' + this_row_id);
			
			// add the accession column		   			
			$('<td/>', { "text" : item.accession } ).appendTo('#' + this_row_id);
			
			// add the description column
			$('<td/>', { "text" : item.description } ).appendTo('#' + this_row_id);
			
			// add the sequence length column
			$('<td/>', { "text" : item.sequence_length } ).appendTo('#' + this_row_id);
			// add the sequence length column
			$('<td />', { "text" : item.sequence } ).appendTo('#' + this_row_id);			
		
		});
    
		// now show the result section and search box that was previously hidden
	
		$('#fs_results').show();
		$('#searchval').show();
		$('#searchval>ftheader').show();
		$('#sbox').show();
		$('#match_res').hide();	
		$('#results').hide();
		$('#db_results').hide();
		$('#f_match').show();	
	}    
		
}
//Called on click of SaveDB button
$(document).on('click', '#savedb', function() {		
		
		$('#match_res').hide();	
		$('#sMsg').text( "");
		
		
		var $item = $(this).closest("tr").find('td:nth-child(2)');
		
		
		$.each($item, function(key, value){			
			var acc = $(value).text();
			
			$.ajax({
				url: "./dbwrite.cgi?data=" + acc,				
				dataType: 'json',				
				success: function(data) {
					$('#sMsg').text( data.dbstatus);	
					if(data.dbstatus == 'Data saved successfully.'){						
						$("#sMsg").css("color", "green");
					}
					else {						
						$("#sMsg").css("color", "blue");
					}
					
					$('#match_res').show();	
					$('#f_match').hide();						
				},
				error: function(jqXHR, textStatus, errorThrown){
					alert("Failed to perform search! textStatus: (" + textStatus +
						  ") and errorThrown: (" + errorThrown + ")");
				}
			});		
			
		})	
	return false;
});

