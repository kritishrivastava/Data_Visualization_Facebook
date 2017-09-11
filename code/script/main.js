var fileName;	
fileName = "../data/Facebook_output.csv"; // by default
var yScatterPlotLabel;
var xScatterPlotLabel;
var zScatterPlotLabel;
var yBarChartLabel;
var xLineChartLabel;
var yLineChartLabel;
var xHeatMapLabel;
var yHeatMapLabel;
var yHistogramLabel;
var colorHeatMapLabel;
					
var experiments;
var data;	
var scatterPlotTypeToolTip;
var barChart = dc.barChart("#graph1");
var pieChart = dc.pieChart("#graph2");
var scatterPlot = dc.scatterPlot("#graph3");
var lineChart = dc.lineChart("#graph4");
var heatMap = dc.heatMap("#graph5");
var histogram = dc.barChart("#graph6");
var scatterPlotDimension;
var	scatterPlotGroup;
var colorScale = d3.scale.ordinal()
	.domain(["default", "Video", "Photo", "Status","Link", "Red","White","Paid","Unpaid"])
//		.range(["#DDDDDD", "#5BC0EB", "#FDE74C", "#9BC53D","#E55934","#5BC0EB", "#FDE74C","#5BC0EB", "#FDE74C"]); 
//		.range(["#DDDDDD", "#540D6E", "#EE4266", "#E55812","#3BCEAC","#5BC0EB", "#FDE74C","#5BC0EB", "#FDE74C"]); 
//			.range(["#DDDDDD", "#540D6E", "#95C623", "#EE4266","#F2AF29","#5BC0EB", "#FDE74C","#5BC0EB", "#FDE74C"]);
	.range(["#DDDDDD", "#5D2E8C", "#CCFF66", "#2EC4B6","#FF6666","#5BC0EB", "#FDE74C","#5BC0EB", "#FDE74C"]); 
var numberFormat = d3.format('.2f');
var monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
var weekArray = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat','Sun'];
var heatMapColorScale = ["#dcffc9", "#0e3191"];

window.onload = function() {
	readFile("../data/Facebook_output.csv");
};
		
//Read file name and set global attributes
function readFilename(fileSelected) {			
	if (fileSelected.value == "Facebook"){
			fileName = "../data/Facebook_output.csv";
			//Change y axis radio buttons
			$("label[for='y1']")[0].innerHTML = "Comments";
			$("label[for='y2']")[0].innerHTML = "Shares";
			$("label[for='y11']")[0].innerHTML = "Average Lifetime Engaged Users";
			$("label[for='y21']")[0].innerHTML = "Average Lifetime Post Total Impressions";
			document.getElementById("barGraphHeading").innerHTML = "Bar Graph: Post Weekday vs Average Lifetime Engaged	Users";
			document.getElementById("pieChartHeading").innerHTML = "Pie Chart: Type of Post Content";
			document.getElementById("scatterPlotHeading").innerHTML = "Scatter Plot: Number of Likes vs Number of Comments for a post";
			document.getElementById("lineChartHeading").innerHTML = "Line Chart: Post Month vs Number of posts";
			document.getElementById("y11").checked = true;
			document.getElementById("y1").checked = true;
			document.getElementById("z1color").checked = true;
			document.getElementById("color1").checked = true; //heatmap
			document.getElementById("y1histo").checked = true; //histogram
			document.getElementById("formForColorSelection").style.visibility="initial";	
			document.getElementById("selectDimensionText").style.display="block";
			document.getElementById("graph5").style.display="block";
			//document.getElementById("formForxAxisSelectionLineGraph").style.display="block";					
			document.getElementById("radioButtonsForxAxisSelection").style.visibility = "initial";
			document.getElementById("barGraphDescription").innerHTML = "Description: This graph shows the trend in the Average Engaged Users and Post Impressions for different days of the week. On an average, more users engage in the posts on a Wednesday than any other day of the week. Also, total impressions for a post is highest on Thursdays (mid-week) and decreases on weekends with lowest average impressions on Sundays. This suggests that in order to get more impressions and user engagement on a post, weekdays should be preferred over weekends.";
			document.getElementById("scatterPlotDescription").innerHTML = "Description: This graph shows the relation between number of comments/shares with number of likes on a post. For most posts, the number of likes is significantly more than the number of comments/shares. In general, the number of likes/comments/shares for photos and status as more as compared to videos and links. The posts of type photos have significant outliers.";
			document.getElementById("pieChartDescription").innerHTML = "Description: It can be observed that most of the posts are of type photos and least of type links. For majority of the posts, Facebook was not paid for advertising.";
			document.getElementById("lineChartDescription").innerHTML = "Description: It can be observed that number of the posts put up on the page, steadily increased in the first quarter of the year. The number of posts per month almost doubled by the end of the year. Month of October saw maximum posts. Also, most posts are put up late night (after mid-night) or mid-day (10 am- 1pm) and it significantly decreased during the evening hours.";
			document.getElementById("histogram").style.display="block";	
			document.getElementById("heatMap").style.display="block";
		//	weekArray = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
			
	}else{
			fileName = "../data/WineQuality_output.csv";
			//Change y axis radio buttons				
			$("label[for='y1']")[0].innerHTML = "Fixed Acidity";
			$("label[for='y2']")[0].innerHTML = "Volatile Acidity";
			$("label[for='y11']")[0].innerHTML = "Average Alcohol Content";
			$("label[for='y21']")[0].innerHTML = "Average Sulphates";
			document.getElementById("barGraphHeading").innerHTML = "Bar Graph: Wine Quality vs Average Alcohol Content";
			document.getElementById("pieChartHeading").innerHTML = "Pie Chart: Type of Wine";
			document.getElementById("scatterPlotHeading").innerHTML = "Scatter Plot: pH Level vs Fixed Acidity";
			document.getElementById("lineChartHeading").innerHTML = "Line Chart: Wine Quality vs Number of Wines";
			document.getElementById("y11").checked = true;
			document.getElementById("y1").checked = true;
			//document.getElementById("formForColorSelection").style.display="none";	
			document.getElementById("formForColorSelection").style.visibility = "hidden";					
			document.getElementById("radioButtonsForxAxisSelection").style.visibility = "hidden";
			document.getElementById("selectDimensionText").style.display="none";
			document.getElementById("graph5").style.display="none";
			//document.getElementById("formForxAxisSelectionLineGraph").style.display="none";
			document.getElementById("barGraphDescription").innerHTML = "Description: It can be observed that the average alcohol content in wines under test lies between 9.8-12.2. As the alcohol content in the wine increases, its quality improves. Also, the average sulphates in wine with highest quality (9) is significantly lesser than the sulphates in any other wine. This implies that a high quality wine will usually have more alcohol and lesser sulphates.";
			document.getElementById("scatterPlotDescription").innerHTML = "Description: Two distinct clusters for white (yellow) and red (blue) wine for acidity vs pH level are visible. In general, the acidity in white wine is lesser than the red wine.";
			document.getElementById("pieChartDescription").innerHTML = "Description: This graph clearly states that approximately 75% of the wines in this study are white wines.";
			document.getElementById("lineChartDescription").innerHTML = "Description: Most of the wines considered in this study have quality between 4-8 with maximum wines (almost 45% of all wines) of the quality 6. Very few wines have quality more than 8 and only 5 wines out of all 6497 wines are of the quality 9. ";
			document.getElementById("histogram").style.display="none";	
			document.getElementById("heatMap").style.display="none";
		//	barChartnames = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
	}
	readFile(fileName);
}

function readFile(fileName){
	d3.csv(fileName, function(error, inputData) {
		inputData.forEach(function(x) {
			if(fileName == "../data/Facebook_output.csv"){
				x.xBarChart = x["Post Weekday"];
				x.y1BarChart = +x["Lifetime Engaged Users"];
				x.y2BarChart = +x["Lifetime Post Total Impressions"];
				x.dimensionPieChart = x.Type;
				x.dimensionPieChart1 = x.Paid;
				x.xScatterPlot = +x.like;
				x.y1ScatterPlot = +x.comment;
				x.y2ScatterPlot	= +x.share;
				x.z1ScatterPlot = x.Type;
				x.z2ScatterPlot = x.Paid;
				x.dimensionLineChart = +x["Post Month"];
				x.dimensionLineChart1 = +x["Post Hour"];
				x.y1LineChart = +x["Page total likes"];
				x.xHeatMap = +x["Post Month"];
				x.yHeatMap = +x["Post Hour"];
				x.xHistogram = +x["Post Hour"];
				x.yHistogram = +x["Lifetime Post Consumers"];
				x.y2Histogram = +x["Lifetime Post Consumptions"]
				x.colorHeatMap = +x["Total Interactions"];
				x.color2HeatMap = +x["Lifetime Post Total Reach"];
				yBarChartLabel = "Average Lifetime Engaged Users";
				xBarChartLabel = "Post Weekday";
				yScatterPlotLabel = "Comments";
				xScatterPlotLabel = "Likes";
				zScatterPlotLabel = "Type of Content"
				scatterPlotTypeToolTip = "Post Type";
				xLineChartLabel = "Post Month";
				yLineChartLabel = "Number of Posts";
				xHeatMapLabel = "Post Month";
				yHeatMapLabel = "Post Hour";
				yHistogramLabel = "Lifetime Post Consumers";
				colorHeatMapLabel = "Total Interactions";
				heatMapColorScale = ["#dcffc9", "#0e3191"];
			}else{
				x.xBarChart = +x.quality;
				x.y1BarChart = +x.alcohol;
				x.y2BarChart = +x.sulphates;
				x.dimensionPieChart = x.Type;
				x.xScatterPlot = +x.pH;
				x.y1ScatterPlot = +x["fixed acidity"];
				x.y2ScatterPlot	= +x["volatile acidity"];					
				x.dimensionLineChart = +x.quality;
				x.y1LineChart = +x["residual sugar"];
				yBarChartLabel = "Average Alcohol Content";
				xBarChartLabel = "Quality";
				yScatterPlotLabel = "Fixed Acidity";
				xScatterPlotLabel = "pH Level";
				zScatterPlotLabel = "Wine Type"
				scatterPlotTypeToolTip = "Wine Type";
				xLineChartLabel = "Quality";
				yLineChartLabel = "Number of Wines";
			}
		});
		experiments = inputData;
		data = crossfilter(experiments);
		drawGraphs();
	});
 }
 
function changeColor(colorSelected){
	if( colorSelected.value == "z1color"){
		if (fileName == "../data/Facebook_output.csv"){
			zScatterPlotLabel = "Type of Content";
			document.getElementById("pieChartHeading").innerHTML = "Pie Chart: Type of Post Content";
			}else{
			//	yScatterPlotLabel = "Fixed Acidity";
			}
	}
	else if( colorSelected.value == "z2color"){
		if (fileName == "../data/Facebook_output.csv"){
			zScatterPlotLabel = "Paid";
			document.getElementById("pieChartHeading").innerHTML = "Pie Chart: Type of Advertising";
		}else{
		//	yScatterPlotLabel = "Volatile Acidity";
		}
	}
	drawPieChart();
	drawScatterPlot();
	dc.renderAll();
};	

function changeAxisHistogram (axisSelected){
	if( axisSelected.value == "y1"){
		if (fileName == "../data/Facebook_output.csv"){
			yHistogramLabel = "Lifetime Post Consumers";
			document.getElementById("histogramHeading").innerHTML = "Histogram: Post Hour vs Average Lifetime Post Consumers";
			}else{
			//	yScatterPlotLabel = "Fixed Acidity";
			}
	}
	else if( axisSelected.value == "y2"){
		if (fileName == "../data/Facebook_output.csv"){
			yHistogramLabel = "Lifetime Post Consumptions";
			document.getElementById("histogramHeading").innerHTML = "Histogram: Post Hour vs Average Lifetime Post Consumptions";
		}else{
		//	yScatterPlotLabel = "Volatile Acidity";
		}
	}
	drawHistogram();
	dc.renderAll();
};

 
function changeColorHeatmap(colorSelected){
	if( colorSelected.value == "color1"){
		if (fileName == "../data/Facebook_output.csv"){
			colorHeatMapLabel = "Total Interactions";
			document.getElementById("heatMapHeading").innerHTML = "HeatMap: Total Interactions for Month of Post vs Hour of Post";
			heatMapColorScale = ["#dcffc9", "#0e3191"];
			}else{
			//	yScatterPlotLabel = "Fixed Acidity";
			}
	}
	else if( colorSelected.value == "color2"){
		if (fileName == "../data/Facebook_output.csv"){
			colorHeatMapLabel = "Total Reach";
			document.getElementById("heatMapHeading").innerHTML = "HeatMap: Total Reach for Month of Post vs Hour of Post";
			heatMapColorScale = ["#ffe6e6", "#b30000"];
			//["#dcffc9", "#0e3191"];
		}else{
		//	yScatterPlotLabel = "Volatile Acidity";
		}
	}
	drawHeatMap();
	dc.renderAll();
};	
	 
function changeXAxisLineGraph(axisSelected){
	if( axisSelected.value == "x1"){
		if (fileName == "../data/Facebook_output.csv"){
			xLineChartLabel = "Post Month";
			document.getElementById("lineChartHeading").innerHTML = "Line Chart: Post Month vs Number of posts";
			}else{
			//	yScatterPlotLabel = "Fixed Acidity";
			}
	}
	else if( axisSelected.value == "x2"){
		if (fileName == "../data/Facebook_output.csv"){
			xLineChartLabel = "Post Hour";
			document.getElementById("lineChartHeading").innerHTML = "Line Chart: Post Hour vs Number of posts";
		}else{
		//	yScatterPlotLabel = "Volatile Acidity";
		}
	}
	drawLineChart();
	dc.renderAll();
};

function changeAxis(axisSelected){
	if( axisSelected.value == "y1"){
		if (fileName == "../data/Facebook_output.csv"){
			yScatterPlotLabel = "Comments";
			document.getElementById("scatterPlotHeading").innerHTML = "Scatter Plot: Number of Likes vs Number of Comments for a post";
			}else{
				yScatterPlotLabel = "Fixed Acidity";
			document.getElementById("scatterPlotHeading").innerHTML = "Scatter Plot: pH Level vs Fixed Acidity";
			}
	}
	else if( axisSelected.value == "y2"){
		if (fileName == "../data/Facebook_output.csv"){
			yScatterPlotLabel = "Shares";
			document.getElementById("scatterPlotHeading").innerHTML = "Scatter Plot: Number of Likes vs Number of Shares for a post";
		}else{
			yScatterPlotLabel = "Volatile Acidity";
			document.getElementById("scatterPlotHeading").innerHTML = "Scatter Plot: ph Level vs Volatile Acidity";
		}
	}
	drawScatterPlot();
	dc.renderAll();
};

function changeAxisGraph1(axisSelected){
	if( axisSelected.value == "y11"){
		if (fileName == "../data/Facebook_output.csv"){
			yBarChartLabel = "Average Lifetime Engaged Users";
			document.getElementById("barGraphHeading").innerHTML = "Bar Graph: Post Weekday vs Average Lifetime Engaged	Users";
		}else{
			yBarChartLabel = "Average Alcohol Content";
			
			document.getElementById("barGraphHeading").innerHTML = "Bar Graph: Wine Quality vs Average Alcohol Content";
		}
	}
	else if( axisSelected.value == "y21"){
		if (fileName == "../data/Facebook_output.csv"){
			yBarChartLabel = "Average Lifetime Post Total Impressions";					
			document.getElementById("barGraphHeading").innerHTML = "Bar Graph: Post Weekday vs Average Lifetime Total Impressions";
		}else{
			yBarChartLabel = "Average Sulphates";					
			document.getElementById("barGraphHeading").innerHTML = "Bar Graph: Wine Quality vs Average Sulphates";
		}
	}
	drawBarChart();
	dc.renderAll();
};
 
function drawGraphs(){
	drawLineChart(); 			
	drawPieChart();
	drawBarChart();	
	drawScatterPlot();
	if(fileName == "../data/Facebook_output.csv")
	{
		drawHeatMap();
		drawHistogram();
	}
	dc.renderAll();
}	

function drawHistogram()
{
	var histogramXKey = "Post Hour";
//	var histogram = dc.barChart('#histogram'),
	var	histogramDim = data.dimension(function (d) {
				return d.xHistogram;
			});

	var XHistogramGroup = histogramDim.group().reduce(
		//add
		function(p,v){
			p.count++;
			if(yHistogramLabel == "Lifetime Post Consumers")
				p.sum += v.yHistogram;
			else if(yHistogramLabel == "Lifetime Post Consumptions")
					p.sum += v.y2Histogram;
			p.avg = p.sum/p.count;
			p.xHistogram= v.xHistogram;
			return p;
		},
		//remove
		function(p,v){
			p.count--;
			if(yHistogramLabel == "Lifetime Post Consumers")
				p.sum -= v.yHistogram;
			else if(yHistogramLabel == "Lifetime Post Consumptions")
					p.sum -= v.y2Histogram;
			p.avg = p.sum/p.count;
			p.xHistogram= v.xHistogram;
			return p;
		},
		//init
		function(p,v){
			 return {count:0, avg:0, sum:0,xHistogram:0};
		}
	);

	histogram
		.width(950)
		.height(400)
		.margins({top: 10, right: 70, bottom: 59, left: 58})
		.dimension(histogramDim)
		.group(XHistogramGroup)
		.valueAccessor(function(kv) { return kv.value.avg; })
		.elasticY(true)
		.centerBar(false)
		.brushOn(false)
		.gap(0)
		.x(d3.scale.linear().domain([1, 24]))
		.renderHorizontalGridLines(true)
		.xAxisLabel(histogramXKey)
		.yAxisLabel(yHistogramLabel)
		.renderTitle(true)
		.title(function (p) {
			  var avgApprox = d3.round(p.value.avg,2);
				var hour;
				if (p.value.xHistogram<12) {
					hour = p.value.xHistogram +" am";
				} else if (p.value.xHistogram == 12){
					hour = p.value.xHistogram + " noon";
				} else {
					hour = (p.value.xHistogram - 12) + " pm";
				}
      return [ histogramXKey + ": " + hour + "\n" + yHistogramLabel + ": " + avgApprox] ;
  })	;

		<!-- histogram.yAxis().tickFormat(function(d) { -->
			<!-- return intToString(d); -->
		<!-- }); -->

		histogram.xAxis().tickFormat(function(d) {
			if (d<12) {
				return d +" am";
			} else if (d == 12){
				return d + " noon";
			} else {
				return (d - 12) + " pm";
			}
		});
		histogram.xAxis().ticks(24);  
}

function drawHeatMap()
{
	var heatMapDimension = data.dimension(function(d) { return [ d.xHeatMap, d.yHeatMap]; }),
	heatMapGroup = heatMapDimension.group().reduceSum(function(d) { 
	if(colorHeatMapLabel == "Total Interactions")
		return d.colorHeatMap; 
	else if(colorHeatMapLabel == "Total Reach")
		return d.color2HeatMap;
	});

	// ["#dcffc9", "#0b2775"];
	var minInteractions=0;
	var maxInteractions=0;

	heatMap
		.width(900)
		.height(500)
		.margins({top: 10, right: 70, bottom: 30, left: 48})
		.dimension(heatMapDimension)
		.group(heatMapGroup)
		.keyAccessor(function(d) { return +d.key[0]; })
		.valueAccessor(function(d) { return +d.key[1]; })
		.colorAccessor(function(d) { 
				if(minInteractions > +d.value) 
					minInteractions = +d.value;
				if(maxInteractions < +d.value)
					maxInteractions = +d.value;
				return +d.value; 
			})
		.xBorderRadius(0)
		.yBorderRadius(0)
		.colsLabel(function(d) {
		  return monthArray[d-1];
		})
		.rowsLabel(function(d) {
			if (d<12) {
				return d +" am";
			} else if (d == 12){
				return d + " noon";
			} else {
				return (d - 12) + " pm";
			}
		})
		.title(function(d) {
			if(colorHeatMapLabel == "Total Interactions")
				return "Month:   " + monthArray[d.key[0]-1] + "\n" +
							 "Hour:  " + d.key[1] + "\n" +
							 "Total post interactions: " + 	d.value;
			else if(colorHeatMapLabel == "Total Reach")
				return "Month:   " + monthArray[d.key[0]-1] + "\n" +
							 "Hour:  " + d.key[1] + "\n" +
							 "Total post reach: " + 	d.value;			
		})
		.linearColors(heatMapColorScale)
	//	.colors(heatColorMapping);
		.calculateColorDomain();
		
	var range = maxInteractions - minInteractions;
	var heatArr = [];
	for (var i = 0; i < 12; i++) {
		heatArr.push({
			val: minInteractions + i / 11 * range,
			index: i
		});
	}
	var ndx = crossfilter(heatArr);
	var keyHeatmap = ndx.dimension(function(d) {
		return [d.index, 1];
	});
	var keyHeatmapGroup = keyHeatmap.group().reduceSum(function(d) {
		return d.val;
	});
	var heatmapChart = dc.heatMap("#heatmapKey");
	var heatColorMapping = function(d) {
		return d3.scale.linear().domain([minInteractions, maxInteractions]).range(heatMapColorScale)(d);
	};
	heatColorMapping.domain = function() {
		return [minInteractions, maxInteractions];
	};
	heatmapChart.width(900)
				.height(80)
				.margins({top: 8, right: 70, bottom: 40, left: 78})
				.dimension(keyHeatmap)
				.group(keyHeatmapGroup)
				.colorAccessor(function(d) {
					return d.value;
				})
				.keyAccessor(function(d) { return d.key[0]; })
				.valueAccessor(function(d) { return d.key[1]; })
				.colsLabel(function(d){
					return heatArr[d].val.toFixed(0);
				})
				.rowsLabel(function(d) {
					return colorHeatMapLabel;
				})
				.transitionDuration(0)
				.colors(heatColorMapping)
				.calculateColorDomain();
	heatmapChart.xBorderRadius(0);
	heatmapChart.yBorderRadius(0);
}

function drawLineChart()
{
	var lineChartDimension = data.dimension(function(d){			
				if(xLineChartLabel == "Post Hour")
					return d.dimensionLineChart1; 
				else if(xLineChartLabel == "Post Month")
					return d.dimensionLineChart;
				else
					return d.dimensionLineChart;
			}),
			lineChartDimensionGroup  = lineChartDimension.group().reduceCount();
	
	lineChart
		.width(450)
		.height(325)
		.margins({top: 10, right: 10, bottom: 45, left: 60})
		.dimension(lineChartDimension)
		.group(lineChartDimensionGroup)
		.yAxisLabel(yLineChartLabel)
		.xAxisLabel(xLineChartLabel)
		.renderHorizontalGridLines(true)
		.brushOn(false)
		.mouseZoomable(true)
		.xyTipsOn(true)
		.x(d3.scale.linear().domain([
			d3.min(experiments, function(d) { 
				if(xLineChartLabel == "Post Hour")
					return d.dimensionLineChart1; 
				else if(xLineChartLabel == "Post Month")
					return d.dimensionLineChart;
				else
					return d.dimensionLineChart; }), 							
			d3.max(experiments, function(d) { 
				if(xLineChartLabel == "Post Hour")
					return d.dimensionLineChart1; 
				else if(xLineChartLabel == "Post Month")
					return d.dimensionLineChart;
				else
					return d.dimensionLineChart; })
		]))
		.elasticY(true)
		lineChart.xAxis().tickFormat(function (d) { 
			if(xLineChartLabel == "Post Month")
				{return monthArray[d-1]; }
			else if(xLineChartLabel == "Post Hour"){
				if (d<12) {
					return d +" am";
				} else if (d == 12){
					return d + " noon";
				} else {
					return (d - 12) + " pm";
				}
			}
			else	
				return d;
		 });
}

function drawPieChart()
{
	var pieChartDimension = data.dimension(function(d) { 
				if(zScatterPlotLabel == "Paid")
					return d.dimensionPieChart1; 
				else if(zScatterPlotLabel == "Type of Content")
					return d.dimensionPieChart;
				else
					return d.dimensionPieChart;
			}),
			pieChartGroup = pieChartDimension.group().reduceCount();
	pieChart
		.width(450)
		.height(325)
		.radius(100)
		.innerRadius(50)
		.externalLabels(55)
		.drawPaths(true)
		.minAngleForLabel(0.25)
		.dimension(pieChartDimension)
		.group(pieChartGroup)
		.legend(dc.legend())
		.colors(function (d) {
			return colorScale(d);
		})
		.on('pretransition', function(pieChart) {
pieChart.selectAll('text.pie-slice').text(function(d) {
    return d.data.key;
})
		});
}

function drawScatterPlot()
{
	scatterPlotDimension = data.dimension(function(d) { 
		if (yScatterPlotLabel == "Comments" || yScatterPlotLabel == "Fixed Acidity"){
			if(zScatterPlotLabel == "Type of Content")
				return[ d.xScatterPlot, d.y1ScatterPlot,d.z1ScatterPlot]; 
			else if(zScatterPlotLabel == "Paid")
				return[d.xScatterPlot, d.y1ScatterPlot,d.z2ScatterPlot];
			else
				return[d.xScatterPlot, d.y1ScatterPlot,d.dimensionPieChart];
		}else if (yScatterPlotLabel == "Shares" || yScatterPlotLabel == "Volatile Acidity")	{	
			if(zScatterPlotLabel == "Type of Content")
				return[ d.xScatterPlot, d.y2ScatterPlot,d.z1ScatterPlot]; 
			else if(zScatterPlotLabel == "Paid")
				return[d.xScatterPlot, d.y2ScatterPlot,d.z2ScatterPlot];
			else	
				return[d.xScatterPlot, d.y2ScatterPlot,d.dimensionPieChart];
		}
	}),
	scatterPlotGroup = scatterPlotDimension.group();
	scatterPlot
		.width(500)
		.height(325)
		.x(d3.scale.linear().domain([d3.min(experiments, function(d) { return d.xScatterPlot; }),d3.max(experiments, function(d) { return d.xScatterPlot; })]))	
		//.symbolSize(8)
		//.excludedColor(9)  //check color numbers later
		.excludedOpacity(0.2)
		.clipPadding(10)
		.elasticY(true)
.elasticX(true)
		.brushOn(true)
		.transitionDuration(0)
	  .margins({top: 10, right: 125, bottom: 50, left: 50})
		.yAxisLabel(yScatterPlotLabel)
		.xAxisLabel(xScatterPlotLabel)
		.renderHorizontalGridLines(true)
.renderVerticalGridLines(true)
		.colorAccessor(function (d) {
			return d.key[2];
		})
		.colors(function (d) {
			return colorScale(d);
		})
		.renderLabel(true)
		.renderTitle(true)
		.title(function (p) {
                    return [scatterPlotTypeToolTip + ": " + p.key[2] + "\n" +
                       xScatterPlotLabel + ": " + p.key[0] + "\n" +
                       yScatterPlotLabel + ": " + p.key[1]] ;
            })
		.dimension(scatterPlotDimension)
		.group(scatterPlotGroup)
		.on("preRender", function(chart) {
			chart.rescale();
		})
		.on("preRedraw", function(chart) {
			chart.rescale();
		});
}

function drawBarChart(){
	var xBarChartDimension = data.dimension(function(d) { return d.xBarChart; }),
			yBarChartSumGroup  = xBarChartDimension.group().reduce(
				function reduceAdd(p,v){
					var yValue;
					if (yBarChartLabel == "Average Lifetime Engaged Users" || yBarChartLabel == "Average Alcohol Content")				
						yValue = v.y1BarChart; 
					else if (yBarChartLabel == "Average Lifetime Post Total Impressions" || yBarChartLabel == "Average Sulphates")	
						yValue = v.y2BarChart;
					++p.count;
					p.sum = p.sum + yValue;	
					p.avg = p.count ? p.sum / p.count : 0;
					p.xBarChart = v.xBarChart;
					return p;
				},
				function reduceRemove(p,v){
					var yValue;
					if (yBarChartLabel == "Average Lifetime Engaged Users" || yBarChartLabel == "Average Alcohol Content")				
						yValue = v.y1BarChart; 
					else if (yBarChartLabel == "Average Lifetime Post Total Impressions" || yBarChartLabel == "Average Sulphates")	
						yValue = v.y2BarChart;
					--p.count;
					p.sum = p.sum - yValue;
					p.avg = p.count ? p.sum / p.count : 0;
					p.xBarChart = v.xBarChart;
					return p;
				},
				function reduceInitial(){
					return{count: 0,	sum: 0, avg: 0 , xBarChart: 0};
				}
			);

	  barChart
.width(450)
.height(325)
		.barPadding(0.15)
.margins({top: 10, right: 125, bottom: 55, left: 65})
		//.centerBar(true)
		.x(d3.scale.ordinal())
.xUnits(dc.units.ordinal)
.brushOn(true)
.yAxisLabel(yBarChartLabel)
		.xAxisLabel(xBarChartLabel)
.dimension(xBarChartDimension)
.group(yBarChartSumGroup)
		.valueAccessor(function(p){return p.value.avg;})
		.elasticY(true)
.elasticX(true)
		.renderTitle(true)
		.title(function (p) {
			  var avgApprox = d3.round(p.value.avg,2);
      return [ xBarChartLabel + ": " + p.value.xBarChart + "\n" + yBarChartLabel + ": " + avgApprox] ;
  })	
		barChart.xAxis().tickFormat(function (d) { 
			if(yBarChartLabel == "Average Lifetime Engaged Users" || yBarChartLabel == "Average Lifetime Post Total Impressions" )
				{return weekArray[d-1]; }
			else	
				return d;
		 });
}
