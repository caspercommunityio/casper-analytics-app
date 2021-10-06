import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CasperService } from '../../api/casper.service';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-deployments',
  templateUrl: './deployments.page.html',
  styleUrls: ['./deployments.page.scss'],
})
export class DeploymentsPage implements OnInit {

  public validator: String;

  private deploymentsSubscription = undefined;

  public deployments: [] = [];

  public casperEnvironment = this.casper.getCasperEnvironment();

  constructor(private activatedRoute: ActivatedRoute, private casper: CasperService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.validator = this.activatedRoute.snapshot.paramMap.get('validator');
    this.spinner.show();
    this.casper.getValidatorDeployments(this.validator).subscribe((deployments) => {
      this.deployments = deployments;
      this.spinner.hide();
    })
  }

  ngOnDestroy() {
    if (this.deploymentsSubscription !== undefined) {
      this.deploymentsSubscription.unsubscribe();
    }
  }

}
