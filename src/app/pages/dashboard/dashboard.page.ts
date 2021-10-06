import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CasperService } from '../../api/casper.service';
import { Color, Label } from 'ng2-charts';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit, OnDestroy {

  public validator: String;

  private validatorChartsSubscription;
  private validatorInfoSubscription;

  public validatorInfos;

  public casperEnvironment = this.casper.getCasperEnvironment();

  slideOptions: any = {
    slidesPerView: 3.1,
    loop: false,
    observer: true,
    observeParents: true,
    breakpoints: {
      1: { slidesPerView: 1.1, spaceBetween: 0 },
      540: { slidesPerView: 1.1, spaceBetween: 0 },
      720: { slidesPerView: 2.1, spaceBetween: 0 },
      960: { slidesPerView: 3.1, spaceBetween: 0 },
      1250: { slidesPerView: 4, spaceBetween: 0 }
    }
  };

  public priceChartData: ChartDataSets[] = undefined;
  public priceChartLabels: Label[] = undefined;
  public priceChartColors: Color[] = [
    {
      borderColor: '#a29bfe',
      backgroundColor: '#a29bfe',
    },
  ];

  public apyChartData: ChartDataSets[] = undefined;
  public apyChartLabels: Label[] = undefined;
  public apyChartColors: Color[] = [
    {
      borderColor: '#6bd098',
      backgroundColor: '#6bd098',
    },
  ];

  public totalCSPRChartData: ChartDataSets[] = undefined;
  public totalCSPRChartLabels: Label[] = undefined;
  public totalCSPRChartColors: Color[] = [
    {
      borderColor: '#fcc468',
      backgroundColor: '#fcc468',
    },
  ];

  public rewardsChartData: ChartDataSets[] = undefined;
  public rewardsChartLabels: Label[] = undefined;
  public rewardsChartColors: Color[] = [
    {
      borderColor: '#f17e5d',
      backgroundColor: '#f17e5d',
    },
  ];

  public delegatorsChartData: ChartDataSets[] = undefined;
  public delegatorsChartLabels: Label[] = undefined;
  public delegatorsChartColors: Color[] = [
    {
      borderColor: '#7ed6df',
      backgroundColor: '#7ed6df',
    },
  ];

  public delegationsChartData: ChartDataSets[] = undefined;
  public delegationsChartLabels: Label[] = undefined;
  public delegationsChartColors: Color[] = [
    {
      borderColor: '#273c75',
      backgroundColor: '#273c75',
    },
  ];

  public undelegationsChartData: ChartDataSets[] = undefined;
  public undelegationsChartLabels: Label[] = undefined;
  public undelegationsChartColors: Color[] = [
    {
      borderColor: '#badc58',
      backgroundColor: '#badc58',
    },
  ];



  public lineChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [{

        ticks: {
          display: true
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
  public lineChartColors: Color[] = [
    {
      borderColor: '#6bd098',
      backgroundColor: '#6bd098',
    },
  ];
  public lineChartLegend = false;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [];

  private loadIsComplete: any = { charts: false, infos: false };

  constructor(private activatedRoute: ActivatedRoute, private casper: CasperService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.validator = this.activatedRoute.snapshot.paramMap.get('validator');
    this.spinner.show();
    this.validatorChartsSubscription = this.casper.getValidatorCharts(this.validator, 12).subscribe(data => {
      this.loadIsComplete.charts = true;
      this.apyChartData = [
        {
          data: data.apy.values,
          label: 'APY',
          pointRadius: 0,
          pointHoverRadius: 0,
          borderWidth: 3,
        }
      ]
      this.apyChartLabels = data.apy.labels;

      this.rewardsChartData = [
        {
          data: data.rewards.values,
          label: 'Rewards',
          pointRadius: 0,
          pointHoverRadius: 0,
          borderWidth: 3,
        }
      ]
      this.rewardsChartLabels = data.rewards.labels;

      this.totalCSPRChartData = [
        {
          data: data.csprStaked.values,
          label: 'CSPR Staked',
          pointRadius: 0,
          pointHoverRadius: 0,
          borderWidth: 3,
        }
      ]
      this.totalCSPRChartLabels = data.csprStaked.labels;
      this.delegatorsChartData = [
        {
          data: data.delegators.values,
          label: 'Delegators',
          pointRadius: 0,
          pointHoverRadius: 0,
          borderWidth: 3,
        }
      ]
      this.delegatorsChartLabels = data.delegators.labels;
      this.priceChartData = [
        {
          data: data.price.values,
          label: 'Price',
          pointRadius: 0,
          pointHoverRadius: 0,
          borderWidth: 3,
        }
      ]
      this.priceChartLabels = data.price.labels;

      this.delegationsChartData = [
        {
          data: data.delegations.values,
          label: 'Delegations',
          pointRadius: 0,
          pointHoverRadius: 0,
          borderWidth: 3,
        }
      ]
      this.delegationsChartLabels = data.delegations.labels;
      this.undelegationsChartData = [
        {
          data: data.undelegations.values,
          label: 'Undelegations',
          pointRadius: 0,
          pointHoverRadius: 0,
          borderWidth: 3,
        }
      ]
      this.undelegationsChartLabels = data.undelegations.labels;
      this.disableSpinner();
    });

    this.validatorInfoSubscription = this.casper.getValidatorInfos(this.validator).subscribe((info) => {
      this.loadIsComplete.infos = true;
      this.validatorInfos = info;
      this.disableSpinner();
    })
  }

  disableSpinner() {
    if (this.loadIsComplete.charts && this.loadIsComplete.infos) {
      this.spinner.hide();
    }
  }
  ngOnDestroy() {
    if (this.validatorChartsSubscription) {
      this.validatorChartsSubscription.unsubscribe();
    }
    if (this.validatorInfoSubscription) {
      this.validatorInfoSubscription.unsubscribe();
    }
  }

}
