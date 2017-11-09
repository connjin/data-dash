var wageData = []; 

var data; 
var gap; 
var title; 

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
	gap = ['']; 
	title = ['']; 

	for (var i = 0; i < data.length; i++) {
		gap.push(data[i]["value"]); 
		title.push(data[i]["title"]); 
	}

	$.each(data, function(i, item) {
		wageData.push({
			"id": item.id, 
			"value": parseFloat(item.value)
		});
	})
	
	//console.log(wageData); 
	buildMap(); 
}

function buildMap() {
	//bar chart
	var bar = c3.generate({
		bindto: "#bar", 
		data: {
			json: [gap], 
			type: 'bar', 
			order: 'desc'
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

	//line graph
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
			"color": "#d1ebe1", 
			"colorSolid": "#70806c"
		}
		 
	}
	); 

	wageChart.balloonLabelFunction = function(wageData, value) { //return percent value on country hover
		return wageData.title + " " + wageData.value + "%"; 
	}
}