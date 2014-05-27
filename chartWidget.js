
function initializeChartWidget($) {
	var chartWidget = 
	{
		chartTypes : ['pie'], 
		initalize : function() {
			chartWidget._intializeCharts($("table.chart"));
		},
		_intializeCharts : function($tables) {
			$tables.each(function(){
				var $chart  = $("<div/>");
				var $table = $(this);
				var chartType = chartWidget._getChartTypeOfTable($table);
				var data = google.visualization.arrayToDataTable(chartWidget._tableToArray($table));				
				var options = chartWidget._generateOptionsFromTable($table);

				chartWidget._generateChart($chart, chartType, data, options);

				//remove table and show chart
				$table.hide();
				$table.after($chart);
			});
		},
		_generateChart : function($chart, chartType, data, options) {
			var chartMethod = chartWidget._capitalizeFirstLetter(chartType)+"Chart";

			try {
				chart = new google.visualization[chartMethod]($chart[0]);
				chart.draw(data, options);	
				return chart;	
			} catch (error) {
				var chartTypeText = chartWidget.chartTypes.join(" or ");
				$chart.html("no valid chart type was defined. Please add (" + chartTypeText + ") as a class");
			}	
		},
		_tableToArray : function ($table) {
			var dataRows = [];

			$table.find("tr").each(function(){
				var dataCells = [];

				$(this).children("td,th").each(function(){
					dataCells.push(chartWidget._parsePotentialInteger($(this).text()));
				});
					
				dataRows.push(dataCells);
			});

			return dataRows;
		},
		_getChartTypeOfTable : function($table) {
			for(i in chartWidget.chartTypes){
				var chartType = chartWidget.chartTypes[i];

				if($table.hasClass(chartType))
					return chartType
				
			}
		},
		_generateOptionsFromTable : function($table) {
			return {
				title: $table.children("caption").text(),
				legend: {
					position : "bottom"
				}				
			};
		},
		_parsePotentialInteger : function(string){
			if($.isNumeric(string))
				string = parseInt(string);
			return string;				
		},
		_capitalizeFirstLetter : function(string) {
			if(string != null)
				return string.charAt(0).toUpperCase() + string.slice(1);
		}
	};

	chartWidget.initalize();
}

google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(function() {
	jQuery(document).ready(initializeChartWidget);
});
