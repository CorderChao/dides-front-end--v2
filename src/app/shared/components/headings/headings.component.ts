import { trigger, transition, style, animate } from '@angular/animations';
import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-headings',
  templateUrl: './headings.component.html',
  styleUrl: './headings.component.scss',
  animations: [
    trigger("slideInFromTopAnimation", [
      transition(":enter", [
        style({ transform: "translateY(-100%)", opacity: 0 }),
        animate(
          "500ms ease-out",
          style({ transform: "translateY(0)", opacity: 1 }),
        ),
      ]),
    ]),
  ],
})
export class HeadingsComponent implements OnInit {
  @Input() title: string = "";
  @Input() useBackButton = false;
  
  constructor(private location: Location){
    
  }

  ngOnInit(): void {
    
  }

  goBack(){
    this.location.back();
  }
     
}
