import {
  Component,
  ContentChild,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { isObservable, Observable, Subscription } from "rxjs";
import { animate, style, transition, trigger } from "@angular/animations";

@Component({
  selector: "app-data-table",
  templateUrl: "./data-table.component.html",
  styleUrls: ["./data-table.component.scss"],
  animations: [
    trigger("slideInFromLeftAnimation", [
      transition(":enter", [
        style({ transform: "translateX(100%)", opacity: 0 }),
        animate(
          "300ms ease-out",
          style({ transform: "translateX(0)", opacity: 1 }),
        ),
      ]),
    ]),
  ],
})
export class DataTableComponent implements OnInit, OnChanges, OnDestroy {
  @Input() tableData: Observable<any[]> | any[];
  @Input() columnHeader;
  @Input() hasActionsColumn: boolean = true;
  objectKeys = Object.keys;
  listData: MatTableDataSource<any>;
  searchKey: string;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ContentChild(TemplateRef, { static: true }) actions: TemplateRef<any>;
  subscriptions: Subscription = new Subscription();
  actionColumn: boolean;

  constructor() {}

  ngOnChanges() {
    this.actionColumn = this.hasActionsColumn;
    if (isObservable(this.tableData)) {
      this.subscriptions.add(
        this.tableData.subscribe((data: any) => {
          this.listData = new MatTableDataSource(data);
          this.listData.sort = this.sort;
          this.listData.paginator = this.paginator;
        }),
      );
    } else {
      this.listData = new MatTableDataSource(this.tableData);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
    }
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  filterTable() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }
}
