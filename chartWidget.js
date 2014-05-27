
function initializeChartWidget($) {
	var chartWidget = 
	{
		chartTypes : ['pie', 'bar', 'column', 'histogram'],
		initalize : function() {
			chartWidget._intializeCharts($("table.chart"));
		},
		_intializeCharts : function($tables) {
			$tables.each(function(){
				var $table = $(this);
				var $chart = chartWidget._convertTableToChart($table);
				var chartType = chartWidget._getChartTypeOfTable($table);
				var data = google.visualization.arrayToDataTable(chartWidget._tableToArray($table));				
				var options = chartWidget._generateOptionsFromTable($table);

				chartWidget._generateChart($chart, chartType, data, options);
			});
		},
		_convertTableToChart : function($table){
			var $chart = $table.data("$chart");

			if($chart == null){
				$chart = $("<div style='width:100%; height:600px' />");

				//remove table and show chart
				$table.hide();
				$table.after($chart);

				//save chart to table
				$table.data("$chart", $chart);
			}

			return $chart;
		},
		_generateChart : function($chart, chartType, data, options) {
			var chartMethod = null;

			//create chartMethod
			switch(chartType) {
				case "histogram" :
					chartMethod = chartWidget._capitalizeFirstLetter(chartType);
					break;
				default : 
					chartMethod = chartWidget._capitalizeFirstLetter(chartType)+"Chart";
					break;
			}

			console.log(chartMethod);

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
				string = parseFloat(string);
			return string;				
		},
		_capitalizeFirstLetter : function(string) {
			if(string != null)
				return string.charAt(0).toUpperCase() + string.slice(1);
		}
	};

	//initialization
	var resizeTimeoutId;
	
	$(window).resize(function(){
		clearTimeout(resizeTimeoutId);

		resizeTimeoutId = setTimeout(function(){
			chartWidget.initalize();
		},20);
	});

	chartWidget.initalize();
}

google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(function() {
	jQuery(document).ready(initializeChartWidget);
});
