// var React = require('react');
// var Component = React.Component;
// var CanvasJSReact = require('../lib/canvasjs.react');
// var CanvasJS = CanvasJSReact.CanvasJS;
// var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
// var dataPoints =[];
// class DataGraph extends Component {
 
// 	render() {	
// 		const options = {
// 			theme: "light2",
// 			title: {
// 				text: "Stock Price of NIFTY 50"
// 			},
// 			axisY: {
// 				title: "Price in USD",
// 				prefix: "$",
// 				includeZero: false
// 			},
// 			data: [{
// 				type: "line",
// 				xValueFormatString: "MMM YYYY",
// 				yValueFormatString: "$#,##0.00",
// 				dataPoints: dataPoints
// 			}]
// 		}
// 		return (
// 		<div>
// 			<CanvasJSChart options = {options} 
// 				 onRef={ref => this.chart = ref}
// 			/>
// 			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
// 		</div>
// 		);
// 	}
	
// 	componentDidMount(){
// 		var chart = this.chart;
// 		fetch('https://canvasjs.com/data/gallery/react/nifty-stock-price.json')
// 		.then(function(response) {
// 			return response.json();
// 		})
// 		.then(function(data) {
// 			for (var i = 0; i < data.length; i++) {
// 				dataPoints.push({
// 					x: new Date(data[i].x),
// 					y: data[i].y
// 				});
// 			}
// 			chart.render();
// 		});
// 	}
// }
 
// export default DataGraph;   

import React, { Component } from 'react';
import CanvasJSReact from '../lib/canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


var dataPoints = [
	{
			"x": 1,
			"y": 8561.3
	},
	{
			"x": 2,
			"y": 8879.6
	},
	{
			"x": 3,
			"y": 9173.75
	},
	{
			"x": 4,
			"y": 9304.05
	},
	{
			"x": 5,
			"y": 9621.25
	},
	{
			"x": 6,
			"y": 9520.9
	},
	{
			"x": 7,
			"y": 10077.1
	},
	{
			"x": 8,
			"y": 9917.9
	},
	{
			"x": 9,
			"y": 9788.6
	},
	{
			"x": 10,
			"y": 10335.3
	},
	{
			"x": 11,
			"y": 10226.55
	},
	{
			"x": 12,
			"y": 10530.7
	}
];

class DataGraph extends Component {

	render() {
		const options = {
			theme: "light2",
			title: {
				text: "Renting vs. Buying"
			},
			axisY: {
				title: "Total Cost",
				prefix: "$",
				includeZero: false
			},
			data: [{
				type: "line",
				xValueFormatString: "MMM YYYY",
				yValueFormatString: "$#,##0.00",
				dataPoints: dataPoints
			},
			{
				type: "line",
				xValueFormatString: "MMM YYYY",
				yValueFormatString: "$#,##0.00",
				dataPoints: dataPoints.map(data => {
					return {
						...data,
						y: data.y *10
					}
				})
			}
		]
		}
		
		console.log('Rent Data: '+JSON.stringify(this.props.rentData));
		return (
			<div>
				<CanvasJSChart options = {options}
						/* onRef = {ref => this.chart = ref} */
				/>
			</div>
		);
	}
}

export default DataGraph;