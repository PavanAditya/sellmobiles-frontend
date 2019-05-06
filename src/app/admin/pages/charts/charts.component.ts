import { Component, OnInit } from '@angular/core';
import { chartsData } from '../../../core/mocks/charts-data.mock';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {

  // ? bar chart
  public barChartType: string;
  public barChartLegend: boolean;
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChart;
  public barChartDataArray: number[] = [];
  public barChartLabels: string[] = [];
  public barChartData = [
    { data: this.barChartDataArray, label: 'Current Week' },
    { data: [0, 0, 0, 0, 0, 0], label: 'Previous Week' }
  ];

  // ? Doughnut
  public doughnutChart;
  public doughnutChartType: string;
  public doughnutChartLabels: string[] = [];
  public doughnutChartData: number[] = [];
  public doughnutColors = chartsData.chartColors;

  // ? Pie
  public pieChart;
  public pieChartType: string;
  public pieChartLabels: string[] = [];
  public pieChartData: number[] = [];
  public piechartColors = chartsData.chartColors;

  // ? PolarArea
  public polarAreaChart;
  public polarAreaLegend: boolean;
  public polarAreaChartType: string;
  public polarAreaChartLabels: string[] = [];
  public polarAreaChartData: number[] = [];
  public polarareaColors = chartsData.chartColors;

  constructor(
    private adminService: AdminService
  ) { }

  ngOnInit() {
    this.initialisations();
    this.fetchBarchartData();
    this.fetchPieChartData();
    this.fetchDoughnutChartData();
    this.fetchPolarareaChartData();
  }

  public fetchBarchartData(): void {
    this.adminService.getBarchartData().subscribe((result) => {
      this.barChart = result.data;
      this.barChart.map((element) => {
        this.barChartLabels.push(element._id);
        this.barChartDataArray.push(element.count);
      });
    });
  }

  public fetchPieChartData(): void {
    this.adminService.getPiechartData().subscribe((result) => {
      this.pieChart = result.data;
      this.pieChart.map((element) => {
        this.pieChartLabels.push(element._id);
        this.pieChartData.push(element.count);
      });
    });
  }

  public fetchDoughnutChartData(): void {
    this.adminService.getDoughnutData().subscribe((result) => {
      this.doughnutChart = result.data;
      this.doughnutChart.map((element) => {
        this.doughnutChartLabels.push(element._id);
        this.doughnutChartData.push(element.count);
      });
    });
  }

  public fetchPolarareaChartData(): void {
    this.adminService.getBarchartData().subscribe((result) => {
      this.polarAreaChart = result.data;
      this.polarAreaChart.map((element) => {
        this.polarAreaChartLabels.push(element._id);
        this.polarAreaChartData.push(element.count);
      });
    });
  }

  private initialisations() {
    this.barChartType = 'bar';
    this.barChartLegend = true;
    this.doughnutChartType = 'doughnut';

    this.pieChartType = 'pie';
    this.polarAreaLegend = true;
    this.polarAreaChartType = 'polarArea';
  }
}
