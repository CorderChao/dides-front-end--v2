import {
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import { isObservable, Observable, Subscription } from "rxjs";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
import { SelectionModel } from "@angular/cdk/collections";

@Component({
  selector: "app-data-table-with-selectable-columns",
  templateUrl: "./data-table-with-selectable-columns.component.html",
  styleUrl: "./data-table-with-selectable-columns.component.scss",
})
export class DataTableWithSelectableColumnsComponent {
  @Input() tableData: Observable<any[]> | any[];
  @Input() columnHeader;
  @Input() hasActionsColumn: boolean = true;
  @Input() hasSelectionColumn: boolean = true;
  objectKeys = Object.keys;
  listData: MatTableDataSource<any>;
  searchKey: string;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ContentChild(TemplateRef, { static: true }) actions: TemplateRef<any>;
  subscriptions: Subscription = new Subscription();
  actionColumn: boolean;
  selectColumn: boolean;
  @Input() hasSelectColumn: boolean;
  @Output() getSelectedColumnEvent = new EventEmitter<any>();
  selection = new SelectionModel<any>(true, []);
  @Input() buttonName!: string;

  constructor() {}

  ngOnChanges() {
    this.actionColumn = this.hasActionsColumn;
    this.selectColumn = this.hasSelectColumn;
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

  filterTable() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.listData.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.listData.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? "deselect" : "select"} all`;
    }
    return `${this.selection.isSelected(row) ? "deselect" : "select"} row ${row.position + 1}`;
  }

  onSearchClear() {
    this.searchKey = "";
    this.filterTable();
  }
  getSelectColumns() {
    this.getSelectedColumnEvent.emit(this.selection.selected);
  }
}
