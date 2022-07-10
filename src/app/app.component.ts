import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'scheduler-x';
  start_end_mark:Array<any> = [];
  latlng:Array<any> = [
    
    [
      23.0285312,
      72.5262336
    ],
    [
      19.0760,
      72.8777
    ],
    [
      50.2048,
      55.2708
    ]
    ,
    [
		28.6139, 77.2090
    ]
  ];
 
	public addresses: any[] = [{
	  id: 1,
	  address: '',
	  street: '',
	  city: '',
	  country: ''
	}];
	constructor() {
		this.start_end_mark.push(this.latlng[0]);
		this.start_end_mark.push(this.latlng[this.latlng.length - 1]);
	}
  
	ngOnInit() {
  
	}
  
	addAddress() {
	  this.addresses.push({
		id: this.addresses.length + 1,
		address: '',
		street: '',
		city: '',
		country: ''
	  });
	}
  
	removeAddress(i: number) {
	  this.addresses.splice(i, 1);
	}
  
	logValue() {
	  console.log(this.addresses);
	}
  
  
  zoom: number = 1;




}
