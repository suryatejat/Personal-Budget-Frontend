import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import * as d3 from 'd3';
import { DataService } from '../data.service';

@Component({
  selector: 'pb-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  radarChartLabels: string[] = [];
  radarChartData: any[] = [];
  radarChartColors: any[] = [];
  selectedMonth: any;
  monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  constructor(private dataService: DataService){}

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    // If there is no data stored in data service
    if(this.selectedMonth == undefined){
      this.selectedMonth = 4;
    }
    if (this.dataService.isBudgetDataEmpty()) {
      this.dataService.getBudgetData().subscribe((data: any) => {
        this.dataService.setBudgetData(data);
        let dataSource = this.dataService.getDataSource();
        this.populateLineChart();
        // Generating Pie Chart
        this.createChart(dataSource);
        this.createRadarChart();
        this.createBarChart();
      });
    } // If data is already stored in data service
    else {
      // Checking for duplicated charts
      let dataSource = this.dataService.getDataSource();
      this.populateLineChart()
      this.createChart(dataSource);
      this.createRadarChart();
      this.createBarChart();
    }
    this.modifyChartTitles();
  }

  modifyChartTitles(){
    var selectedMonth = parseInt(this.selectedMonth);
    var selectedMonthName = this.monthNames[selectedMonth - 1];
    let radarTitle = document.getElementById("radarChartTitle");
    if(radarTitle){
      radarTitle.textContent = "Radar Chart for Budget vs Expenses: " + selectedMonthName;
    }
    let barTitle = document.getElementById("barChartTitle");
    if(barTitle){
      barTitle.textContent = "Bar Chart for Budget vs Expenses: " + selectedMonthName
    }
  }

  modifyCharts(){
    // console.log("Modifying the Charts");
    this.modifyChartTitles();
    this.populateLineChart();
    this.createRadarChart();
    this.createBarChart();
  }

  createBarChart(){
    // console.log("Creating Bar chart");
    let chartStatus = Chart.getChart("barChart")
    if(chartStatus != undefined){
      chartStatus.destroy();
    }
    const categories = this.dataService.getCategories();
    const budgetData = this.dataService.getStoredBudgetData();
    this.dataService.getExpenseData(this.selectedMonth).subscribe(expenseData => {
      // Populate labels
      this.radarChartLabels = categories;

      let monthlyExpense = [];
      for(let ele in categories){
        let def = 0;
        for(let d in expenseData){
          if(categories[ele] === expenseData[d].category){
            def = (expenseData[d].amount);
          }
        }
        monthlyExpense.push(def);
      }

      // Populate datasets
      this.radarChartData = [
        { data: budgetData.map(item => item.budget), label: 'Budget Amount' },
        { data: monthlyExpense, label: 'Expenses' }
      ];

      // Set colors
      this.radarChartColors = [
        { // Budget Amount
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          pointBackgroundColor: 'rgba(255, 99, 132, 1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(255, 99, 132, 0.8)'
        },
        { // Expenses
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          pointBackgroundColor: 'rgba(54, 162, 235, 1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(54, 162, 235, 0.8)'
        }
      ];

      var chrt = document.getElementById("barChart") as HTMLCanvasElement;
      var barChart = new Chart(chrt, {
        type: 'bar',
        data: {
          labels: this.radarChartLabels,
          datasets: this.radarChartData
        }
      })
    });
  }

  createRadarChart(){
    // console.log("Creating Radar chart");
    let chartStatus = Chart.getChart("radarChart")
    if(chartStatus != undefined){
      chartStatus.destroy();
    }

    const categories = this.dataService.getCategories();
    const budgetData = this.dataService.getStoredBudgetData();
    this.dataService.getExpenseData(this.selectedMonth).subscribe(expenseData => {
      // Populate labels
      this.radarChartLabels = categories;

      let monthlyExpense = [];
      for(let ele in categories){
        let def = 0;
        for(let d in expenseData){
          if(categories[ele] === expenseData[d].category){
            def = (expenseData[d].amount);
          }
        }
        monthlyExpense.push(def);
      }

      // Populate datasets
      this.radarChartData = [
        { data: budgetData.map(item => item.budget), label: 'Budget Amount' },
        { data: monthlyExpense, label: 'Expenses' }
      ];

      // Set colors
      this.radarChartColors = [
        { // Budget Amount
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          pointBackgroundColor: 'rgba(255, 99, 132, 1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(255, 99, 132, 0.8)'
        },
        { // Expenses
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          pointBackgroundColor: 'rgba(54, 162, 235, 1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(54, 162, 235, 0.8)'
        }
      ];

      var chrt = document.getElementById("radarChart") as HTMLCanvasElement;
      var radarChart = new Chart(chrt, {
        type: 'radar',
        data: {
          labels: this.radarChartLabels,
          datasets: this.radarChartData
        }
      })
    });
  }

  //Pie Chart Code

  createChart(dataSource: any){
    var ctx = document.getElementById('myChart') as HTMLCanvasElement;

    var myPieChart = new Chart(ctx, {
        type: 'pie',
        data: dataSource
    });
  }

  // line Chart Code
  populateLineChart(): void{
    let chartStatus = Chart.getChart("lineChart")
    if(chartStatus != undefined){
      chartStatus.destroy();
    }
    var ctx = document.getElementById('lineChart') as HTMLCanvasElement;
    this.dataService.getUserExpense().subscribe(res => {
      let monthlyExpense = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      for(let ele in res){
        monthlyExpense[res[ele].month - 1] += res[ele].amount;
      }
      var lineChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: this.monthNames,
          datasets: [{
            label: "Monthly Expenses",
            data: monthlyExpense
          }]
        }
      });
    })
  }

  // D3js Chart Code
  // populateD3jsChart(data: any[]): void {
  //   // set the dimensions and margins of the graph
  //   const width: number = 450;
  //   const height: number = 450;
  //   const margin: number = 40;
  //   const budgetValues = data.map((d: any) => d.budget);

  //   // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
  //   const radius: number = Math.min(width, height) / 2 - margin;

  //   // append the svg object to the div called 'my_dataviz'
  //   const svg: any = d3.select("#d3jsChart")
  //   .append("svg")
  //   .attr("width", width)
  //   .attr("height", height)
  //   .append("g")
  //   .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  //   // set the color scale
  //   const color = d3.scaleOrdinal()
  //   .range(data.map((d: any) => d.color));

  //   // Compute the position of each group on the pie:
  //   const pie = d3.pie()
  //   .sort(null) // Do not sort group by size
  //   .value((d, i) => budgetValues[i]);

  //   const data_ready = pie(data);

  //   // The arc generator
  //   const arc = d3.arc()
  //   .innerRadius(radius * 0.45)         // This is the size of the donut hole
  //   .outerRadius(radius * 0.8);

  //   // Another arc that won't be drawn. Just for labels positioning
  //   const outerArc = d3.arc()
  //   .innerRadius(radius * 0.9)
  //   .outerRadius(radius * 0.9);

  //   // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
  //   svg
  //   .selectAll('allSlices')
  //   .data(data_ready)
  //   .enter()
  //   .append('path')
  //   .attr('d', arc)
  //   .attr('fill', function (d: any) { return (color(d.data.title)) })
  //   .attr("stroke", "white")
  //   .style("stroke-width", "2px")
  //   .style("opacity", 0.7);

  //   // Add the polylines between chart and labels:
  //   svg
  //   .selectAll('allPolylines')
  //   .data(data_ready)
  //   .enter()
  //   .append('polyline')
  //   .attr("stroke", "black")
  //   .style("fill", "none")
  //   .attr("stroke-width", 1)
  //   .attr('points', function (d: any) {
  //       var posA = arc.centroid(d); // line insertion in the slice
  //       var posB = outerArc.centroid(d); // line break: we use the other arc generator that has been built only for that
  //       var posC = outerArc.centroid(d); // Label position = almost the same as posB
  //       var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2; // we need the angle to see if the X position will be at the extreme right or extreme left
  //       posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
  //       return [posA, posB, posC];
  //   });

  //   // Add the polylines between chart and labels:
  //   svg
  //   .selectAll('allLabels')
  //   .data(data_ready)
  //   .enter()
  //   .append('text')
  //   .text(function (d: any) { return d.data.title; })
  //   .attr('transform', function (d: any) {
  //       var pos = outerArc.centroid(d);
  //       var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
  //       pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
  //       return 'translate(' + pos + ')';
  //   })
  //   .style('text-anchor', function (d: any) {
  //       var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
  //       return (midangle < Math.PI ? 'start' : 'end');
  //   });
  // }
}
