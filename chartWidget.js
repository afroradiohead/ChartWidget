
function initializeChartWidget($) {
	var chartWidget = 
	{
		initalize : function() {
			chartWidget._intializePieCharts($("table.pie"));
		},
		_intializePieCharts : function($tables) {
			$tables.each(function(){
				var $table = $(this);
				var $pieChart  = $("<div/>");
				var array = chartWidget._tableToArray($table);
				
				var options = {
					title: chartWidget._getTableCaption($table),
				};

				var chart = new google.visualization.PieChart($pieChart[0]);
				chart.draw(google.visualization.arrayToDataTable(array), options);

				$table.hide();
				$table.after($pieChart);
			});
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
		_parsePotentialInteger : function(value){
			if($.isNumeric(value))
				value = parseInt(value);
			return value;				
		},
		_getTableCaption : function($table){
			return $table.children("caption").text();
		}
	};

	chartWidget.initalize();
}

google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(function() {
	jQuery(document).ready(initializeChartWidget);
});
