import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeployUtil, RuntimeArgs, CLString, CLPublicKey, Signer, CasperClient, CLByteArray, CLURef, CLU64, CLBool, CLKey, CLAccountHash, CLMap, CLU8, CLU512, CLList, CasperServiceByJsonRPC } from "casper-js-sdk";
import Big from 'big.js';
import { Buffer } from 'buffer';
import { CasperService } from '../../api/casper.service';
@Component({
  selector: 'app-staking',
  templateUrl: './staking.page.html',
  styleUrls: ['./staking.page.scss'],
})
export class StakingPage implements OnInit {


  public validator: string;

  public amount;

  public deployment: string = undefined;
  public casperEnvironment = this.casper.getCasperEnvironment();

  public signerStatus = {
    isConnected: false,
    isUnlocked: false,
    activeKey: undefined,
    label: "Locked",
    balance: 0
  };

  constructor(private activatedRoute: ActivatedRoute, private casper: CasperService) { }

  ngOnInit() {
    this.validator = this.activatedRoute.snapshot.paramMap.get('validator');

    this.initSignerStatus();
  }

  async connectToSigner() {
    await Signer.sendConnectionRequest();
  }

  async delegate() {

    const client = new CasperClient(this.casper.getDelegationUrl());
    const activeKey = await Signer.getActivePublicKey();
    const activeKeyPublicKey = CLPublicKey.fromHex(activeKey);
    const args = RuntimeArgs.fromMap({
      delegator: CLPublicKey.fromHex(this.signerStatus.activeKey),
      validator: CLPublicKey.fromHex(this.validator),
      amount: new CLU512(this.amount * 1000000000)
    });
    const session = DeployUtil.ExecutableDeployItem.newStoredContractByHash(
      Uint8Array.from(Buffer.from(this.casper.getDelegationContract(), "hex")),
      "delegate",
      args
    );

    const payment = DeployUtil.standardPayment(
      3001000000
    );

    const deploy = DeployUtil.makeDeploy(
      new DeployUtil.DeployParams(activeKeyPublicKey, this.casper.getDelegationEnvironment()),
      session,
      payment
    );

    let signedDeployJSON;
    try {
      signedDeployJSON = await Signer.sign(DeployUtil.deployToJson(deploy), activeKey, activeKey);
    } catch (err) {
      alert(err.message);
      return;
    }
    let signedDeploy = DeployUtil.deployFromJson(signedDeployJSON).unwrap();
    await client.putDeploy(signedDeploy);
    window.open("https://" + (this.casper.getCasperEnvironment() == 'testnet' ? this.casper.getCasperEnvironment() + '.' : '') + "cspr.live/deploy/" + signedDeployJSON.deploy.hash, "_blank");
    this.amount = 0;
  }

  async signerAction() {
    if (!this.signerStatus.isUnlocked) {
      await Signer.sendConnectionRequest();
    }
  }


  async initSignerStatus() {
    try {

      this.signerStatus.isConnected = await Signer.isConnected();
      try {
        this.signerStatus.activeKey = await Signer.getActivePublicKey()
        this.signerStatus.isUnlocked = true;

      } catch (e) {
        this.signerStatus.isUnlocked = false;
      }
      this.getBalance();
      this.initSignerLabel();
    } catch (error) {
      console.log(error);
    }

  }

  async getBalance() {
    const client = new CasperClient(this.casper.getDelegationUrl());
    let balance = await client.balanceOfByPublicKey(CLPublicKey.fromHex(this.signerStatus.activeKey));
    this.signerStatus.balance = (Big(balance.toString()) / 1000000000);
  }

  initSignerLabel() {
    if (this.signerStatus.isUnlocked && this.signerStatus.isConnected && this.signerStatus.activeKey !== undefined) {
      this.signerStatus.label = this.signerStatus.activeKey.substr(0, 5) + '...' + this.signerStatus.activeKey.substr(-5);
    }
    if (this.signerStatus.isUnlocked && !this.signerStatus.isConnected) {
      this.signerStatus.label = "DISCONNECTED";
    }

    if (!this.signerStatus.isUnlocked) {
      this.signerStatus.label = "LOCKED";
    }
  }

  updateSignerStatus(newStatus) {
    this.signerStatus.isUnlocked = newStatus.detail.isUnlocked;
    this.signerStatus.activeKey = newStatus.detail.activeKey;
    this.signerStatus.isConnected = newStatus.detail.isConnected;
    this.initSignerLabel();
    this.getBalance();
  }


  @HostListener('window:signer:initialState', ['$event'])
  signerInitialState(event: any) {
    console.log("Signer Initial State", event);
  }
  @HostListener('window:signer:locked', ['$event'])
  signerLocked(event: any) {
    this.updateSignerStatus(event);
  }
  @HostListener('window:signer:unlocked', ['$event'])
  signerUnlocked(event: any) {
    this.updateSignerStatus(event);
  }
  @HostListener('window:signer:connected', ['$event'])
  signerConnected(event: any) {
    this.updateSignerStatus(event);
  }
  @HostListener('window:signer:disconnected', ['$event'])
  signedDisconnected(event: any) {
    this.updateSignerStatus(event);
  }
  @HostListener('window:signer:tabUpdated', ['$event'])
  signedTabUpdated(event: any) {
    console.log("Signer Tab Updated", event);
  }
  @HostListener('window:signer:activeKeyChanged', ['$event'])
  signedActiveKeyChanged(event: any) {
    this.updateSignerStatus(event);
  }

}
