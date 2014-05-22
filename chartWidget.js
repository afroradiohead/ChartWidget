
function initializeChartWidget($) {
	var chartWidget = 
	{
		initalize : function() {
			chartWidget._intializeCharts($("table"));
		},
		_intializeCharts : function($tables) {
			$tables.filter("[chart]").each(function(){
				var $chart  = $("<div/>");
				var $table = $(this);
				var chartType = $table.attr("chart");
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
				//throw error - cannot create a chart with the table's attribute
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
		_parsePotentialInteger : function(string){
			if($.isNumeric(string))
				string = parseInt(string);
			return string;				
		},
		_generateOptionsFromTable : function($table) {
			return {
				title: $table.children("caption").text()
			};
		},
		_capitalizeFirstLetter : function(string) {
			return string.charAt(0).toUpperCase() + string.slice(1);
		}
	};

	chartWidget.initalize();
}

google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(function() {
	jQuery(document).ready(initializeChartWidget);
});
