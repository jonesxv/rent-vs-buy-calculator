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
};

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
	calculateDataPoints = v => {
		//Affects either form.
		let housingIncome =
			parseFloat(v["income available for housing"]) > 0
				? parseFloat(v["income available for housing"])
				: 0;
		let monthlyUtilities =
			parseFloat(v.utilities) > 0 ? parseFloat(v.utilities) : 0;

		//Affects RENT form.
		let monthlyRent =
			parseFloat(v["monthly rent"]) > 0
				? parseFloat(v["monthly rent"])
				: 0;
		let investmentGain = parseFloat(v["investment gain"])
			? parseFloat(v["investment gain"])
			: 0;

		//Affects Mortgage form.
		let monthlyMortgage =
			parseFloat(v["cost"]) > 0 ? parseFloat(v["cost"]) : 0;

		//Remaining Income for EITHER form
		let moneyAvailAfterRent =
			housingIncome - monthlyUtilities - monthlyRent;
		let moneyAvailAfterMortgage =
			housingIncome - monthlyUtilities - monthlyMortgage;

		let totalRent = monthlyRent + monthlyUtilities;
				let totalMortgage = monthlyMortgage + monthlyUtilities;
		CalcElem["totalRent"] = totalRent;

		//RENT GRAPHING

		//calcval function---------------------
		//i: year (index)
		//f: futureValue passed as a param. Updates futureValue in outer scope.
		//m: money that is available to be invested. moneyAvailAfterRent || moneyAvailAfterMortgage
		//t: type ('rent','mortgage',null)
		let calcval = (i, f, m, t) => {
			if (t == "rent") {
				futureValueRent = (f + m) * (1 + investmentGain * 0.01);
				return futureValueRent - totalRent * (i + 1);
			} else {
				futureValueMortgage = (f + m) * (1 + investmentGain * 0.01);
				return futureValueMortgage - totalMortgage * (i + 1);
			}
		};
		//Initialize the returns on investments as 0.
		let futureValueRent = 0;
		let futureValueMortgage = 0;

		//-------------------------------------

		//Calculate for each year. x: year, y: money.
		for (let i = 0; i < 12; i++) {
			// console.log("future val:" + futureValue);
			rentDataPoints[i] = {
				x: i + 1,
				y: calcval(i, futureValueRent, moneyAvailAfterRent, 'rent')
			};

			mortgagedataPoints[i] = {
				x: i + 1,
				y: calcval(i, futureValueMortgage, moneyAvailAfterMortgage, 'mortgage')
			};
			console.log(rentDataPoints[i]);
		}
	};

	render() {
		this.calculateDataPoints(this.props);
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
					<h2>Total Rent: {CalcElem.totalRent} </h2>
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
