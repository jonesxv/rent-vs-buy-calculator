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

var futureValueRentStocksStore = [];
var futureValueMortgageStocksStore = [];
var futureValueMortgageApprecStore = [];

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

		CalcElem["housingIncome"] = housingIncome;

		let monthlyUtilities =
			parseFloat(v.utilities) > 0 ? parseFloat(v.utilities) : 0;

		//Affects RENT form.
		let monthlyRent =
			parseFloat(v["monthly rent"]) > 0
				? parseFloat(v["monthly rent"])
				: 0;

		CalcElem["monthlyRent"] = monthlyRent;

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

		let monthlyInterest = interest / 12;

		let propertyTax =
			parseFloat(v["property taxes"]) > 0
				? parseFloat(v["property taxes"])
				: 0;
		CalcElem["propertyTax"] = propertyTax;

		let maintenance =
			parseFloat(v["maintenance"]) > 0 ? parseFloat(v["maintenance"]) : 0;
		CalcElem["maintenance"] = maintenance;

		let downPayment =
			parseFloat(v["down payment"]) > 0
				? parseFloat(v["down payment"])
				: 0;
		CalcElem["downPayment"] = downPayment;

		let homeValue =
			parseFloat(v["home value"]) > 0 ? parseFloat(v["home value"]) : 0;
		CalcElem["homeValue"] = homeValue;

		//P = L[c(1 + c)n]/[(1 + c)n - 1]
		let monthlyMortgage =
			homeValue > 0
				? (homeValue - downPayment) *
				  ((monthlyInterest *
						0.01 *
						(1 + monthlyInterest * 0.01) ** (25 * 12)) /
						((1 + monthlyInterest * 0.01) ** (25 * 12) - 1))
				: 0;
		CalcElem["monthlyMortgage"] = Math.round(monthlyMortgage);

		//Remaining Income for EITHER form
		let moneyAvailAfterRent =
			housingIncome - monthlyUtilities - monthlyRent;
		CalcElem["moneyAvailAfterRent"] = Math.round(moneyAvailAfterRent);

		let totalRent = monthlyRent + monthlyUtilities;
		let totalMortgage =
			monthlyMortgage + monthlyUtilities + (((propertyTax*.01)/12)*homeValue) + maintenance;
		CalcElem["totalRent"] = totalRent;

				let moneyAvailAfterMortgage =
			housingIncome - totalMortgage;
		CalcElem["moneyAvailAfterMortgage"] = Math.round(
			moneyAvailAfterMortgage
		);

		//RENT GRAPHING

		//calcval function---------------------
		//i: year (index)
		//f: futureValue passed as a param. Updates futureValue in outer scope.
		//m: money that is available to be invested. moneyAvailAfterRent || moneyAvailAfterMortgage
		//t: type ('rent','mortgage',null)
		//mortAppr: futureValueMortgageApprec updater
		let calcval = (i, f, m, t, mortAppr) => {
			if (t == "rent") {
				futureValueRentStocks =
					(f + m) * (1 + (investmentGain / 12) * 0.01);
				//console.log('in month '+parseInt(i+1)+', the future val of rent was..'+futureValueRentStocks)
				futureValueRentStocksStore[i + 1] = futureValueRentStocks;

				return (futureValueRentStocks - (totalRent * (i + 1))  ) * -1;
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
					(f + m) * (1 + (investmentGain / 12) * 0.01);
				futureValueMortgageStocksStore[
					i + 1
				] = futureValueMortgageStocks;
				//FVn = P[(1+c)n - 1]/c
				futureValueMortgageApprec =
					(mortAppr + ((homeValue/25)/12)) *
					(1 + (((assetInvestementGain* 0.01) / 12)));

				futureValueMortgageApprecStore[
					i + 1
				] = futureValueMortgageApprec;

				console.log(`calcing mortgage for year ${i+1}, with ${futureValueMortgageStocks} + ${futureValueMortgageApprec} - ${totalMortgage * (i + 1)}`)
				return (
					(futureValueMortgageStocks - (totalMortgage * (i + 1)) ) * -1
				);
			}
		};
		//Initialize the returns on investments as 0.
		let futureValueRentStocks = 0 + downPayment;
		let futureValueMortgageStocks = 0;
		let futureValueMortgageApprec = 0 + downPayment;
		//-------------------------------------

		let maxYears = 10;
		//Calculate for each year. x: year, y: money.
		for (let i = 0; i < 12 * maxYears; i++) {
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
				includeZero: false
			},
			data: [
				{
					type: "line",
					xValueFormatString: "'Rent Cost - Earnings, Month: '#",
					yValueFormatString: "$#,##0.00",
					dataPoints: rentDataPoints
				},
				{
					type: "line",
					xValueFormatString: "'Buy Cost - Earnings, Month: '#",
					yValueFormatString: "$#,##0.00",
					dataPoints: mortgagedataPoints
				}
			]
		};
		return (
			<div>
				<CanvasJSChart
					options={options}
					/* onRef = {ref => this.chart = ref} */
				/>
				<table className="table table-striped table-dark">
					<thead>
						<tr>
							<th scope="col">Cost</th>
							<th scope="col">Rent</th>
							<th scope="col">Buy</th>
						</tr>
					</thead>
					<tbody>
						<tr className="bg-info">
							<th scope="row" colspan="3">
								After all of your other expenses are covered,
								you have {CalcElem.housingIncome} left for
								housing, investments, and savings.
							</th>
						</tr>
						<tr>
							<th scope="row" className="bg-danger">
								Fixed
							</th>
							<td>
								You rent a house with month-to-month rent of{" "}
								<mark>{CalcElem.monthlyRent}</mark>
							</td>
							<td>
								You buy a home with a cost of{" "}
								<mark>{CalcElem.homeValue}</mark>, for which the
								bank offers you a monthly mortgage of{" "}
								{CalcElem.monthlyMortgage}.
							</td>
						</tr>
						<tr>
							<th scope="row" className="bg-danger">
								Total Payments
							</th>
							<td>
								Monthly, you pay{" "}
								<mark>{CalcElem.totalRent}</mark> towards
								renting, utilities, living in your house.
							</td>
							<td>
								Monthly, you pay{" "}
								<mark>{CalcElem.monthlyMortgage}</mark> towards
								the amortized mortgage with interest, utilities,
								maintenance, and taxes for the home you own.
							</td>
						</tr>
						<tr>
							<th scope="row" className="bg-success">
								Stocks
							</th>
							<td>
								{" "}
								Each month you invest{" "}
								{CalcElem.moneyAvailAfterRent}, after paying
								rent/fixed costs, in the stock market at a
								return of {CalcElem.investmentGain}
								%, and you earn compounding interest (compounded
								monthly).{" "}
								<p>
									After the first year your investments
									(stocks) are worth:{" "}
									<mark>
										{futureValueRentStocksStore[12]}
									</mark>
									and u lost {CalcElem.totalRent * 12}
								</p>
								<p>
									After 10 years your investments (stocks) are
									worth:{" "}
									<mark>
										{futureValueRentStocksStore[12 * 10]}
									</mark>
									 and u lost {CalcElem.totalRent * 12 * 10}
								</p>
							</td>
							<td>
								{" "}
								Each month you invest{" "}
								{CalcElem.moneyAvailAfterMortgage}, after paying
								mortgage/fixed costs, in the stock market at a
								return of {CalcElem.investmentGain}
								%, and you earn compounding interest.
								(compounded monthly). 								<p>
									After the first year your investments
									(stocks) are worth:{" "}
									<mark>
										{futureValueMortgageStocksStore[12]}
									</mark>
								</p>
								<p>
									After 10 years your investments (stocks) are
									worth:{" "}
									<mark>
										{futureValueMortgageStocksStore[12 * 10]}
									</mark>
								</p>
							</td>
						</tr>
						<tr>
							<th scope="row" className="bg-success">
								Down Payment
							</th>
							<td>
								You immediately invest your down payment money
								of {CalcElem.downPayment} in the stock market at
								a return of {CalcElem.investmentGain}%. On the
								first year's APY you will earn about:{" "}
								{CalcElem.investmentGain *
									CalcElem.downPayment *
									0.01}
							</td>
							<td>
								You immediately contribute{" "}
								{CalcElem.downPayment} as an investment in your
								home principal value at a return of
								{" " + CalcElem.assetInvestementGain}%
								{/* {console.log(futureValueRentStocksStore)} */}
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}
}

export default DataGraph;
