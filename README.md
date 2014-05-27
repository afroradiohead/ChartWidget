ChartWidget
===========

Simple jQuery Chart Widget with Google Charts

#How to use
##Requires
```
  	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
    <script type="text/javascript" src="https://www.google.com/jsapi"></script>
    <script type="text/javascript" src="chartWidget.js"></script>
```
##Avaiable Classes
chart.pie, chart.donut, chart.column, chart.bar, chart.histogram

##Examples
```
<table class='chart pie' style="width:70%; height:300px;">
	<caption>Pie Chart</caption>
	<thead>
		<tr>
			<td>Task</td>
			<th>Hours Per Day</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<th>Jumping</th>
			<td>15</td>
		</tr>
		<tr>
			<th>Flying</th>
			<td>34</td>
		</tr>			
	</tbody>  
</table>  

<table class='chart bar' style="width:800px">
	<caption>Bar Chart</caption>
	<thead>
		<tr>
			<td>Task</td>
			<th>Hours Per Day</th>
			<th>Intensity</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<th>Jumping</th>
			<td>15</td>
			<td>55</td>
		</tr>
		<tr>
			<th>Flying</th>
			<td>34</td>
			<td>13</td>
		</tr>			
	</tbody>  
</table>  

<table class='chart column'>
	<caption>Column Chart</caption>
	<thead>
		<tr>
			<td>Task</td>
			<th>Hours Per Day</th>
			<th>Intensity</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<th>Jumping</th>
			<td>15</td>
			<td>55</td>
		</tr>
		<tr>
			<th>Flying</th>
			<td>34</td>
			<td>13</td>
		</tr>			
	</tbody>  
</table>  

<table class='chart histogram'>
	<caption>Histogram Chart</caption>
	<thead>
		<tr>
			<td>Dinosaur</td>
			<th>Length</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<th>Acrocanthosaurus (top-spined lizard)</th>
			<td>12.2</td>
		</tr>
		<tr>
			<th>Albertosaurus (Alberta lizard)</th>
			<td>9.1</td>
		</tr>
		<tr>
			<th>Allosaurus (other lizard)</th>
			<td>12.2</td>
		</tr>
		<tr>
			<th>Apatosaurus (deceptive lizard)</th>
			<td>22.9</td>
		</tr>			
	</tbody>  
</table>  

<table class='chart donut'>
	<caption>Donut Chart</caption>
	<thead>
		<tr>
			<td>Dinosaur</td>
			<th>Length</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<th>Acrocanthosaurus (top-spined lizard)</th>
			<td>12.2</td>
		</tr>
		<tr>
			<th>Albertosaurus (Alberta lizard)</th>
			<td>9.1</td>
		</tr>
		<tr>
			<th>Allosaurus (other lizard)</th>
			<td>12.2</td>
		</tr>
		<tr>
			<th>Apatosaurus (deceptive lizard)</th>
			<td>22.9</td>
		</tr>			
	</tbody>  
</table>  
```
##Result
![alt text](https://github.com/afroradiohead/ChartWidget/raw/master/screenshot.png "Screenshot")

