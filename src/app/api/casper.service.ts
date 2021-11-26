import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CasperService {

  endpoint = environment.analyticsCasperApiUrl;

  delegationContract = environment.mainnetDelegationContract;
  delegationUrl = environment.mainnetDelegationUrl;



  notificationToken: any = null;
  casperEnvironment: String = "mainnet";

  constructor(private httpClient: HttpClient) { }

  setCasperEnvironment(casperEnvironment: String) {
    this.casperEnvironment = casperEnvironment;
    this.endpoint = (this.casperEnvironment == 'testnet' ? environment.analyticsTestnetCasperApiUrl : this.endpoint = environment.analyticsCasperApiUrl)
    this.delegationUrl = (this.casperEnvironment == 'testnet' ? environment.testnetDelegationUrl : this.endpoint = environment.mainnetDelegationUrl)
    this.delegationContract = (this.casperEnvironment == 'testnet' ? environment.testnetDelegationContract : this.endpoint = environment.mainnetDelegationContract)
  }

  getCasperEnvironment() {
    return this.casperEnvironment;
  }

  setNotificationToken(notificationToken: any) {
    this.notificationToken = notificationToken;
  }
  getNotificationToken(): Observable<any> {
    return of(this.notificationToken);
  }

  // Get the list of all validators
  getAllValidators(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.endpoint + "validators");
  }

  // Get the list of all validators
  getValidatorsList(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.endpoint + "validators/list");
  }
  // Get the list of all validators
  getHoldersList(page: any = 1, search: any = ''): Observable<any[]> {
    return this.httpClient.get<any[]>(this.endpoint + "holders?page=" + page + "&q=" + search);
  }
  // Get the list of all delegators
  getDelegatorsList(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.endpoint + "delegators/list");
  }

  // Get the details of a specific validator
  getValidatorInfos(validatorPublicKey: String): Observable<any> {
    return this.httpClient.get<any[]>(this.endpoint + "validator/infos/" + validatorPublicKey);
  }

  // Get the charts's data of a specific validator
  getValidatorCharts(validatorPublicKey: String, numberOfEras: Number = 5000): Observable<any> {
    return this.httpClient.get<any[]>(this.endpoint + "validator/charts/" + validatorPublicKey + "?nbrEras=" + numberOfEras);
  }
  // Get the charts's data of a specific validator
  getGlobalCharts(numberOfDays: Number = 7): Observable<any> {
    return this.httpClient.get<any[]>(this.endpoint + "validators/charts?nbrDays=" + numberOfDays);
  }

  // Get the deployments's data of a specific validator
  getValidatorDeployments(validatorPublicKey: String): Observable<any> {
    return this.httpClient.get<any[]>(this.endpoint + "validator/delegations/" + validatorPublicKey);
  }

  //
  getNotifications() {
    return this.httpClient.get<any[]>(this.endpoint + "notification/" + this.notificationToken);
  }

  deleteNotification(notification: any) {
    return this.httpClient.delete<any[]>(this.endpoint + "notification/" + notification.notificationToken + "/" + notification.id);
  }

  postNotification(notification: any) {
    notification.notificationToken = this.notificationToken;
    return this.httpClient.post<any[]>(this.endpoint + "notification", notification);
  }

  postRegisterToken(notificationToken: any) {
    return this.httpClient.post<any[]>(this.endpoint + "notification/register-token", { notificationToken: notificationToken });
  }

  getDelegationContract() {
    return this.delegationContract;
  }
  getDelegationUrl() {
    return this.delegationUrl;
  }
  getDelegationEnvironment() {
    return (this.casperEnvironment == 'testnet' ? 'casper-test' : 'casper')
  }
}
