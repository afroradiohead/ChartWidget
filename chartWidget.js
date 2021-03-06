
function initializeChartWidget($) {
	var chartWidget = 
	{
		chartTypes : ['pie', 'bar', 'column', 'histogram', 'donut'],
		donutHoleRadius : .5,
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
			var width = $table[0].style.width != "" ? $table[0].style.width : '100%';
			var height = $table[0].style.height != "" ? $table[0].style.height : '450px';	


			if($chart == null){
				$chart = $("<div style='width:"+width+"; height:"+height+"' />");
				$chart.addClass($table.attr("class"));

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

				$(this).children("td, th").each(function(){
					dataCells.push(chartWidget._parsePotentialInteger($(this).text()));
				});
					
				dataRows.push(dataCells);
			});

			return dataRows;
		},
		_getChartTypeOfTable : function($table) {
			for(i in chartWidget.chartTypes){
				var chartType = chartWidget.chartTypes[i];

				if(chartType == "donut"){
					chartWidget.chartTypeIsDonut = true;
					return "pie";
				}
				else if($table.hasClass(chartType)){
					return chartType;
				}
			}
		},
		_generateOptionsFromTable : function($table) {
			var isDonut = $table.hasClass("donut");

			return {
				title: $table.children("caption").text(),
				legend: {
					position : "bottom"
				},
				pieHole : isDonut ? chartWidget.donutHoleRadius : 0,
				colors: ['#00205c', '#ee7624', '#e1d1a7', '#5b8ab5', '#b7ce97', '#968c83']
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
