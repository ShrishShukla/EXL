import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const GRAPH_ENDPOINT = 'https://graph.microsoft.com/v1.0/me';
const CALENDAR_ENDPOINT = 'https://graph.microsoft.com/v1.0/users';
const calep = 'https://graph.microsoft.com/v1.0/me/calendar';
const calepmail = 'https://graph.microsoft.com/v1.0/me/calendar';

type ProfileType = {
  givenName?: string,
  surname?: string,
  userPrincipalName?: string,
  id?: string
};

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profile!: ProfileType;
  schedule!: Object;
  calendar!: Object;
  panelOpenState = false;

  constructor(private http: HttpClient) {
		this.start_end_mark.push(this.latlng[0]);
		this.start_end_mark.push(this.latlng[this.latlng.length - 1]);
	}
  ngOnInit() {
    this.getProfile();
    this.getSchedule();
    this.getCalendar();
    // this.getMessages();
  }

  getProfile() {
    this.http.get(GRAPH_ENDPOINT)
      .subscribe(profile => {
        this.profile = profile;
      });
  }

  getSchedule(){
    this.http.get(CALENDAR_ENDPOINT)
      .subscribe(profile => {
        this.schedule = profile;
      });
  }

  getCalendar(){
    this.http.get(calep)
    .subscribe(profile => {
      this.calendar = profile;
    });
  }

  csad=[{day:1.,time:2,},{day:1.,time:3},{day:1.,time:2}];
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