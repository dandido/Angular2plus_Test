import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-alert-component',
  templateUrl: './alert-component.component.html',
  styleUrls: ['./alert-component.component.css']
})
export class AlertComponentComponent implements OnInit {
  @Input() message: string;
  @Output() close = new EventEmitter<void>()

  constructor() { }

  ngOnInit(): void {
  }

  onClose(){
    this.close.emit();
  }

}
