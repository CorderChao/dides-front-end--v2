import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { UpperCasePipe } from "@angular/common";
import { MatDialogModule } from "@angular/material/dialog";

@Component({
  selector: "app-dialog-page-header",
  templateUrl: "./dialog-page-header.component.html",
  styleUrls: ["./dialog-page-header.component.scss"],
  standalone: true,
  imports: [UpperCasePipe, MatDialogModule],
})
export class DialogPageHeaderComponent implements OnChanges {
  @Input() title!: string;
  @Input() subTitle!: number;
  @Input() selectionSubTitle!: number;
  _title!: string;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    this._title = this.title;
  }
}
