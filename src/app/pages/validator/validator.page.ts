import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Color, Label } from 'ng2-charts';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { CasperService } from '../../api/casper.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-validator',
  templateUrl: './validator.page.html',
  styleUrls: ['./validator.page.scss'],
})
export class ValidatorPage implements OnInit {

  public validator: String;


  private validatorChartsSubscription;
  private validatorInfoSubscription;

  public validatorInfos;

  public casperEnvironment = this.casper.getCasperEnvironment();

  slideOptions: any = {
    slidesPerView: 4,
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
      backgroundColor: 'rgba(255,255,255,0.05)',
    },
  ];

  public apyChartData: ChartDataSets[] = undefined;
  public apyChartLabels: Label[] = undefined;
  public apyChartColors: Color[] = [
    {
      borderColor: '#6bd098',
      backgroundColor: 'rgba(255,255,255,0.05)',
    },
  ];

  public totalCSPRChartData: ChartDataSets[] = undefined;
  public totalCSPRChartLabels: Label[] = undefined;
  public totalCSPRChartColors: Color[] = [
    {
      borderColor: '#fcc468',
      backgroundColor: 'rgba(255,255,255,0.05)',
    },
  ];

  public rewardsChartData: ChartDataSets[] = undefined;
  public rewardsChartLabels: Label[] = undefined;
  public rewardsChartColors: Color[] = [
    {
      borderColor: '#f17e5d',
      backgroundColor: 'rgba(255,255,255,0.05)',
    },
  ];

  public delegatorsChartData: ChartDataSets[] = undefined;
  public delegatorsChartLabels: Label[] = undefined;
  public delegatorsChartColors: Color[] = [
    {
      borderColor: '#7ed6df',
      backgroundColor: 'rgba(255,255,255,0.05)',
    },
  ];


  public delegationsChartData: ChartDataSets[] = undefined;
  public delegationsChartLabels: Label[] = undefined;
  public delegationsChartColors: Color[] = [
    {
      borderColor: '#273c75',
      backgroundColor: 'rgba(255,255,255,0.05)',
    },
  ];

  public undelegationsChartData: ChartDataSets[] = undefined;
  public undelegationsChartLabels: Label[] = undefined;
  public undelegationsChartColors: Color[] = [
    {
      borderColor: '#badc58',
      backgroundColor: 'rgba(255,255,255,0.05)',
    },
  ];
  public feesChartData: ChartDataSets[] = undefined;
  public feesChartLabels: Label[] = undefined;
  public feesChartColors: Color[] = [
    {
      borderColor: '#FDA7DF',
      backgroundColor: 'rgba(255,255,255,0.05)',
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
          display: true,
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
    this.validatorChartsSubscription = this.casper.getValidatorCharts(this.validator, 999999).subscribe(data => {
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
          label: 'APY',
          pointRadius: 0,
          pointHoverRadius: 0,
          borderWidth: 3,
        }
      ]
      this.rewardsChartLabels = data.rewards.labels;

      this.totalCSPRChartData = [
        {
          data: data.csprStaked.values,
          label: 'APY',
          pointRadius: 0,
          pointHoverRadius: 0,
          borderWidth: 3,
        }
      ]
      this.totalCSPRChartLabels = data.csprStaked.labels;
      this.delegatorsChartData = [
        {
          data: data.delegators.values,
          label: 'APY',
          pointRadius: 0,
          pointHoverRadius: 0,
          borderWidth: 3,
        }
      ]
      this.delegatorsChartLabels = data.delegators.labels;
      this.priceChartData = [
        {
          data: data.price.values,
          label: 'APY',
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
      this.feesChartData = [
        {
          data: data.fees.values,
          label: 'Fees',
          pointRadius: 0,
          pointHoverRadius: 0,
          borderWidth: 3,
        }
      ]
      this.feesChartLabels = data.fees.labels;
      this.disableSpinner();
    });

    this.validatorInfoSubscription = this.casper.getValidatorInfos(this.validator).subscribe((info) => {
      this.loadIsComplete.infos = true;
      this.validatorInfos = info;
      this.disableSpinner();
    })
  }
  ngOnDestroy() {
    console.log("Exit form");
    if (this.validatorChartsSubscription) {
      this.validatorChartsSubscription.unsubscribe();
    }
    if (this.validatorInfoSubscription) {
      this.validatorInfoSubscription.unsubscribe();
    }
  }
  disableSpinner() {
    if (this.loadIsComplete.charts && this.loadIsComplete.infos) {
      this.spinner.hide();
    }
  }
}
