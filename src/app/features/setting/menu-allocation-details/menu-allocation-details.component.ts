import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sa-menu-allocation-details',
  templateUrl: './menu-allocation-details.component.html',
  styleUrls: ['./menu-allocation-details.component.css']
})
export class MenuAllocationDetailsComponent implements OnInit {
  public menuallocation:any={};
  public loaderbtn: boolean = true;

  constructor() { }

  ngOnInit() {
  }

}
