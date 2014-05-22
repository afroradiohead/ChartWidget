function initializeChartWidget() {
	jQuery(document).ready(function($){
		var chartWidget = 
		{
			initalize : function() {
				chartWidget._intializePieCharts($("table.pie"));
			},
			_intializePieCharts : function($pieTables) {
				$pieTables.each(function(){
					var $pieTable = $(this);
					var $pieChart  = $("<div/>");
					var pieChartData = chartWidget._generatePieChartData($pieTable);
					var dataTable = google.visualization.arrayToDataTable(pieChartData);
					
					var options = {
						title: chartWidget._getTableCaption($pieTable),
					};

					var chart = new google.visualization.PieChart($pieChart[0]);
					chart.draw(google.visualization.arrayToDataTable(pieChartData), options);

					$pieTable.hide();
					$pieTable.after($pieChart);
				});
			},
			_generatePieChartData : function($pieTable) {
				var dataRows = [];

				$pieTable.find("tr").each(function(){
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
	});
}

google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(initializeChartWidget);
