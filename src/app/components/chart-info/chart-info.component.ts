import { Component, OnInit, Input } from '@angular/core';
import { Color, Label } from 'ng2-charts';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-chart-info',
  templateUrl: './chart-info.component.html',
  styleUrls: ['./chart-info.component.scss'],
})
export class ChartInfoComponent implements OnInit {
  @Input() name: any = 'My Protperty';
  @Input() data: any = 'Value';
  @Input() color: any = 'red';
  @Input() unit = '';
  @Input() time = '7d';

  public averageAmount: any = 0;

  public chartData: ChartDataSets[] = [];
  public chartLabels: Label[] = [];
  public chartColors: Color[] = [];

  public lineChartOptions: any = {};
  public lineChartLegend = false;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [];

  constructor() { }

  ngOnInit() {
    this.chartData = [
      {
        data: this.data,
        label: this.name,
        pointRadius: 0,
        pointHoverRadius: 0,
        borderWidth: 3,
      }
    ];

    let labels = [];
    let totals = 0;
    this.data.map(x => {
      labels.push(x);
      totals += parseFloat(x);
    });
    this.averageAmount = (totals / this.data.length).toFixed(2);
    this.chartLabels = labels;

    this.chartColors = [
      {
        borderColor: this.color,
        backgroundColor: 'rgba(255,255,255,0.05)',
      },
    ];

    this.lineChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [{

          ticks: {
            display: false
          },
          gridLines: {
            drawBorder: true,
            zeroLineColor: "transparent",
            color: 'rgba(255,255,255,0.05)'
          }

        }],

        xAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: true,
            color: 'rgba(255,255,255,0.1)',
            zeroLineColor: "transparent"
          },
          ticks: {
            display: false,
          }
        }]
      }
    };
  }

}
