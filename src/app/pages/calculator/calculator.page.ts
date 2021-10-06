import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { CasperService } from '../../api/casper.service';
@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.page.html',
  styleUrls: ['./calculator.page.scss'],
})
export class CalculatorPage implements OnInit {

  public validator: String;

  public cspr: any = 1000;
  public lastAPY: any = 0;
  public casperEnvironment = this.casper.getCasperEnvironment();

  constructor(private activatedRoute: ActivatedRoute, private spinner: NgxSpinnerService, private casper: CasperService) { }

  ngOnInit() {
    this.validator = this.activatedRoute.snapshot.paramMap.get('validator');
    this.spinner.show();
    this.casper.getValidatorInfos(this.validator).subscribe((infos) => {
      this.lastAPY = infos.previousAPY;
      this.spinner.hide();
    })
  }

}
