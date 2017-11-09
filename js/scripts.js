$(document).ready(function() {
	loadData(); 
}); 

function loadData() {
	$.ajax({
		type: "GET", 
		url: "wage-over-time.json", 
		dataType: "json", 
		success: parseData
	}); 
	//parseData(); 
}

function parseData() {
	//loop through loaded json data to formate and store vars.

	createCharts(); 
}

function createCharts() {

	
}