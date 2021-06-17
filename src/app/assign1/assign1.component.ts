import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assign1',
  templateUrl: './assign1.component.html',
  styleUrls: ['./assign1.component.css']
})
export class Assign1Component implements OnInit {
  log:any=[];
  logDate:any = [];
  toogle:boolean = false;
  constructor() { }
  ngOnInit(): void {
  }

  onToggleButton(){
    this.toogle = !this.toogle;
    this.log.push(this.log.length + 1);
    this.logDate.push(new Date());

  }
}
