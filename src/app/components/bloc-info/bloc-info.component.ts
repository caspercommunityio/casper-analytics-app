import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-bloc-info',
  templateUrl: './bloc-info.component.html',
  styleUrls: ['./bloc-info.component.scss'],
})
export class BlocInfoComponent implements OnInit {

  @Input() name: any = 'My Protperty';
  @Input() value: any = 'Value';
  @Input() icon: any = 'home';
  @Input() iconColor: any = 'red';
  @Input() info = 'This is an info box';

  constructor() { }

  ngOnInit() { }

}
