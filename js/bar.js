var wageData = []; 

var data; 
var gap = []; 
var title = []; 

$(document).ready(function() {
	loadData(); 
}); 

function loadData() {
	$.ajax({
		method: "GET",
		url: "data/wage-gap-recent-ordered.json", 
		dataType: "json", 
		success: parseData
	}); 

	//parseData(); 
}

function parseData(data) {
	for (var i = 0; i < data.length; i++) {
		gap.push(data[i]["value"]); 
		title.push(data[i]["title"]); 
	}
	
	//console.log(wageData); 
	buildMap(); 
}

function buildMap() {
	//bar chart
	var bar = c3.generate({
		bindto: "#bar", 
		data: {
			columns: [gap], 
			type: 'bar', 
			data_order: 'desc'
		}, 

		axis: {
			x: {
				type: 'category', 
				categories: title, 
				tick: {
					rotate: -20
				}
			}
		},

		legend: {
			show: false
		}, 

		bar: {
			width: {
				ratio: 0.5
			}
		}
	}); 

}