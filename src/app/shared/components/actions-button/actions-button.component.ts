import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from "@angular/core";
import { animate, style, transition, trigger } from "@angular/animations";

@Component({
  selector: "app-actions-button",
  templateUrl: "./actions-button.component.html",
  styleUrls: ["./actions-button.component.scss"],
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
export class ActionsButtonComponent implements OnChanges {
  @Input() btnText: string;
  _btnText: string;

  @Input() btnIcon: string;
  _icon: string;

  @Input() isDisabled = false;
  _isDisabled: boolean;

  @Output() onClick = new EventEmitter<any>();

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    this._btnText = this.btnText;
    this._isDisabled = this.isDisabled;
    this._icon = this.btnIcon;
  }

  buttonClicked(event) {
    this.onClick.emit(event);
  }
  
}
