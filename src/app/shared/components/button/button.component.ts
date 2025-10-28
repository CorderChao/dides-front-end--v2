import { Component, EventEmitter, Input, Output } from "@angular/core";
import { animate, style, transition, trigger } from "@angular/animations";

@Component({
  selector: "app-button",
  templateUrl: "./button.component.html",
  styleUrls: ["./button.component.scss"],
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
export class ButtonComponent {
  @Input() buttonName: string = "";
  @Input() _icon!: string;
  @Input() iconColor!: string;
  @Input() buttonStyle: string = "btn-outline-primary";
  @Output() clicked: EventEmitter<void> = new EventEmitter<void>();

  onClick(): void {
    this.clicked.emit();
  }

  constructor() {}

  ngOnInit(): void {}
}
