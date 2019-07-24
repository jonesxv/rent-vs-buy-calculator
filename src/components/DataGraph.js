import React, { Component } from "react";
import CanvasJSReact from "../lib/canvasjs.react";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

var mortgagedataPoints = [
	{
		x: 1,
		y: 8561.3
	},
	{
		x: 2,
		y: 8879.6
	},
	{
		x: 3,
		y: 9173.75
	},
	{
		x: 4,
		y: 9304.05
	},
	{
		x: 5,
		y: 9621.25
	},
	{
		x: 6,
		y: 9520.9
	},
	{
		x: 7,
		y: 10077.1
	},
	{
		x: 8,
		y: 9917.9
	},
	{
		x: 9,
		y: 9788.6
	},
	{
		x: 10,
		y: 10335.3
	},
	{
		x: 11,
		y: 10226.55
	},
	{
		x: 12,
		y: 10530.7
	}
];

var rentDataPoints = [
	{
		x: 1,
		y: 8561.3
	},
	{
		x: 2,
		y: 8879.6
	},
	{
		x: 3,
		y: 9173.75
	},
	{
		x: 4,
		y: 9304.05
	},
	{
		x: 5,
		y: 9621.25
	},
	{
		x: 6,
		y: 9520.9
	},
	{
		x: 7,
		y: 10077.1
	},
	{
		x: 8,
		y: 9917.9
	},
	{
		x: 9,
		y: 9788.6
	},
	{
		x: 10,
		y: 10335.3
	},
	{
		x: 11,
		y: 10226.55
	},
	{
		x: 12,
		y: 10530.7
	}
];

let CalcElem = {
	totalRent: 0
}

class DataGraph extends Component {


	// state = { value: 0,
	// 	fixedRent: 0 };

	// static getDerivedStateFromProps(props, current_state) {
	// 	if (current_state.value !== props.value) {
	// 		return {
	// 			value: props.value,
	// 			fixedRent: this.props.utilities
	// 		};
	// 	}
	// 	console.log(props)
	// 	return null;
	// }

	//v (value)
	calculateDataPoints = (v) =>
	{
		let totalRent = parseFloat(v['monthly rent']) + parseFloat(v.utilities)
		if(totalRent >0)
			{
				CalcElem.totalRent = totalRent
				for(let i=0;i<10;i++)
					{
						rentDataPoints[i] = {x:(i+1),y:parseInt(totalRent)*(i+1)}
						console.log(rentDataPoints[i])
					}
				}
		else
			{CalcElem.totalRent = 0}

		//

	}
	render() {
		this.calculateDataPoints(this.props)
		const mortgageTotal = this.props.mortgageTotal;
		const rentTotal = this.props.rentTotal;
		// if(this.setState({fixedRent: this.props.total + this.props.utilities})
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
			data: [
				{
					type: "line",
					xValueFormatString: "MMM YYYY",
					yValueFormatString: "$#,##0.00",
					dataPoints: rentDataPoints
				},
				{
					type: "line",
					xValueFormatString: "MMM YYYY",
					yValueFormatString: "$#,##0.00",
					dataPoints: mortgagedataPoints.map(data => {
						return {
							...data,
							y: data.y * 10
						};
					})
				}
			]
		};
		return (
			<div>
				<div>
					<h1>{JSON.stringify(this.props)}</h1>
					<h2>Fixed Rent: {CalcElem.totalRent} </h2>
					<h3></h3>
					<h2>{JSON.stringify(rentDataPoints)}</h2>
				</div>
				<CanvasJSChart
					options={options}
					/* onRef = {ref => this.chart = ref} */
				/>
			</div>
		);
	}
}

export default DataGraph;
