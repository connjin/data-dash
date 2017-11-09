var wageData; 

$(document).ready(function() {
	loadData(); 
}); 

function loadData() {
	$.ajax({
		method: "GET",
		url: "data/wage-gap-recent.json", 
		dataType: "json", 
		success: parseData
	}); 

	//parseData(); 
}

function parseData(data) {
	wageData = []; 

	$.each(data, function(i, item) {
		wageData.push({
			"id": item.id, 
			"value": parseFloat(item.value)
		});
	})
	
	console.log(wageData); 
	buildMap(); 
}

function buildMap() {
	var wageChart = AmCharts.makeChart("wagemapdiv", {
		"type": "map", 
		"theme": "light", 
		"colorSteps": 5,

	
		"dataProvider": {
			"map": "worldLow", 
			"areas": wageData
		}, 

		"areasSettings": {
			"autoZoom": true, 
		}, 

		"valueLegend": {
			"right": 10, 
			"minValue": "3.3", 
			"maxValue": "36.7"
		}, 

		"export": {
			"enabled": false
		}, 

		"balloon": {
			"adjustBorderColor": true, 
			"color": "#000000", 
			"fillColor": "#FFFFFF"
		}, 

		"zoomControl": {
			"zoomControlEnabled": false, 
			"homeButtonEnabled": false 
		}, 

		"areasSettings": {
			"color": "#FFCA57"
		}
		 
	}
	); 

	wageChart.balloonLabelFunction = function(wageData, value) { //return percent value on country hover
		return wageData.title + " " + wageData.value + "%"; 
	}
}