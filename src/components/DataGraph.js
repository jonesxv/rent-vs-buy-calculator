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
		CalcElem["investmentGain"] = investmentGain;

		let assetInvestementGain = parseFloat(v["asset investment gain"])
			? parseFloat(v["asset investment gain"])
			: 0;
		CalcElem["assetInvestementGain"] = assetInvestementGain;

		//Affects Mortgage form.
		let interest =
			parseFloat(v["interest"]) > 0 ? parseFloat(v["interest"]) : 0;
		CalcElem["interest"] = interest;

				let monthlyInterest = interest /12

		// let monthlyMortgage =
		// 	parseFloat(v["cost"]) > 0 ? parseFloat(v["cost"]) : 0;
		let downPayment =
			parseFloat(v["down payment"]) > 0
				? parseFloat(v["down payment"])
				: 0;
		CalcElem["downPayment"] = downPayment;

		//P = L[c(1 + c)n]/[(1 + c)n - 1]
		let monthlyMortgage =
			parseFloat(v["home value"]) > 0
				? (parseFloat(v["home value"]) - downPayment) *
				  ((monthlyInterest * 0.01 * ((1 + monthlyInterest * 0.01) ** (25*12))) /
						((((1 + monthlyInterest * 0.01) ** (25*12)) - 1)))
				: 0;
		CalcElem["monthlyMortgage"] = Math.round(monthlyMortgage);

		//Remaining Income for EITHER form
		let moneyAvailAfterRent =
			housingIncome - monthlyUtilities - monthlyRent;
		CalcElem["moneyAvailAfterRent"] = Math.round(moneyAvailAfterRent);

		let moneyAvailAfterMortgage =
			housingIncome - monthlyUtilities - monthlyMortgage;
		CalcElem["moneyAvailAfterMortgage"] = Math.round(moneyAvailAfterMortgage);

		let totalRent = monthlyRent + monthlyUtilities;
		let totalMortgage = monthlyMortgage + monthlyUtilities;
		CalcElem["totalRent"] = totalRent;

		//RENT GRAPHING

		//calcval function---------------------
		//i: year (index)
		//f: futureValue passed as a param. Updates futureValue in outer scope.
		//m: money that is available to be invested. moneyAvailAfterRent || moneyAvailAfterMortgage
		//t: type ('rent','mortgage',null)
		//mortAppr: futureValueMortgageApprec updater
		let calcval = (i, f, m, t, mortAppr) => {
			if (t == "rent") {
				futureValueRentStocks = (f + m) * (1 + investmentGain * 0.01);
				return futureValueRentStocks - totalRent * (i + 1);
			} else {
				// if (i == 0) {
				// 	console.log(
				// 		"vars at yr 1 mort==:" + f,
				// 		m,
				// 		investmentGain,
				// 		futureValueMortgageStocks,
				// 		totalMortgage,
				// 		calculated
				// 	);
				// }
				futureValueMortgageStocks =
					(f + m) * (1 + investmentGain * 0.01);
				//FVn = P[(1+c)n - 1]/c
				futureValueMortgageApprec = (mortAppr + (monthlyMortgage - monthlyInterest) ) * (1 + assetInvestementGain * 0.01);
				return (futureValueMortgageStocks+ futureValueMortgageApprec) - totalMortgage * (i + 1);
			}
		};
		//Initialize the returns on investments as 0.
		let futureValueRentStocks = 0 + downPayment;
		let futureValueMortgageStocks = 0;
		let futureValueMortgageApprec = 0 + downPayment
		//-------------------------------------

		//Calculate for each year. x: year, y: money.
		for (let i = 0; i < 12; i++) {
			// console.log("future val:" + futureValue);
			rentDataPoints[i] = {
				x: i + 1,
				y: calcval(
					i,
					futureValueRentStocks,
					moneyAvailAfterRent,
					"rent"
				)
			};

			mortgagedataPoints[i] = {
				x: i + 1,
				y: calcval(
					i,
					futureValueMortgageStocks,
					moneyAvailAfterMortgage,
					"mortgage",
					futureValueMortgageApprec
				)
			};
			//console.log(rentDataPoints[i]);
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
				includeZero: false,
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
					dataPoints: mortgagedataPoints
				}
			]
		};
		return (
			<div>
				<div>
					<h1>{JSON.stringify(this.props)}</h1>
					<h2>Rent Story</h2>
					<p>You pay a monthly rent of {CalcElem.totalRent}</p>
					<p>
						You immediately invest your down payment money of{" "}
						{CalcElem.downPayment} in the stock market at a return
						of {CalcElem.investmentGain}%.
					</p>
					<p>
						Each month you invest {CalcElem.moneyAvailAfterRent} in
						the stock market at a return of{" "}
						{CalcElem.investmentGain}%, and you earn compounding
						interest. (compounded monthly)
					</p>
					{/* --------------------- */}
					{/* --------------------- */}
					{/* --------------------- */}
					<h2>Buy Story</h2>
					<p>You pay an amortized monthly mortgage of {CalcElem.monthlyMortgage}.</p>
					<p>
						You immediately contribute {CalcElem.downPayment} as an investment
						in your home principal value at a return of
						{CalcElem.assetInvestementGain}%.
					</p>
					<p>
						Each month you invest {CalcElem.moneyAvailAfterMortgage}{" "}
						in the stock market at a return of{" "}
						{CalcElem.investmentGain}%, and you earn compounding
						interest. (compounded monthly)
					</p>
					<p>
						In addition, the value of your home increases at a rate
						of {CalcElem.assetInvestementGain}%.
					</p>

					<h3></h3>
					<h2>{JSON.stringify(mortgagedataPoints)}</h2>
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
