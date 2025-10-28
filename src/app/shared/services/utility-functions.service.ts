import { Injectable } from "@angular/core";
import Swal, { SweetAlertIcon } from "sweetalert2";
import { DatePipe } from "@angular/common";
import { OAGAMIS_LAW_LIST } from "../../store/entities/law-reviews/concept-paper/concept-paper.graphql";
import { map } from "rxjs";
import { Apollo } from "apollo-angular";
import { NotificationService } from "./notification.service";
import { MatDialog } from "@angular/material/dialog";
import { ViewAttachmentsComponent } from "../components/view-attachments/view-attachments.component";

@Injectable({
  providedIn: "root",
})
export class UtilityFunctionsService {
  constructor(
    private datePipe: DatePipe,
    private apollo: Apollo,
    public dialog: MatDialog,
    private notificationServices: NotificationService,
  ) {}

  public dateFormat(date: Date | string, format: string) {
    return this.datePipe.transform(date, format);
  }

  getColumnValue = (rowData: any, col: any) => {
    if (col?.concat && col?.concat.length > 1) {
      const separatorReg = /[^a-zA-Z0-9\.]/g; // Define pattern for separator matching (any non-word character)
      const values = col.concat?.map((controlName: any) => {
        if (separatorReg.test(controlName)) {
          // Treat string element matching separator pattern as a separator

          return controlName;
        } else {
          // Get value for non-separator elements
          return this.getNestedPropertyValue(rowData, controlName.trim());
        }
      });
      //in some case values might not have been populated data

      const isEmptyArray = values.every((element: any) => element === "");

      if (!isEmptyArray) {
        return values.join(" ");
      } else {
        const isObject =
          col !== undefined && col !== null && col.constructor == Object;
        return this.getNestedPropertyValue(
          rowData,
          isObject ? (col?.field ? col.field : col.value) : col,
        );
      }
    } else {
      const isObject =
        !this.isNilOrNaNOrUndefined(col) && col.constructor == Object;
      return this.getNestedPropertyValue(
        rowData,
        isObject ? (col?.field ? col.field : col.value) : col,
      );
    }
  };

  getNestedPropertyValue = (obj: any, path: string): any => {
    if (!obj || !path) {
      return;
    }
    const keys = path.split(".");

    for (const key of keys) {
      if (this.isNilOrNaNOrUndefined(obj)) {
        // Check if obj is null or undefined
        return undefined;
      }
      obj = obj[key];
    }

    return obj !== undefined ? obj : "";
  };

  isNilOrNaNOrUndefined = (val: any) =>
    val === null || Number.isNaN(val) || val === undefined || val === "";

  cleanObjects(obj: any) {
    for (var keyName in obj) {
      if (this.isNilOrNaNOrUndefined(obj[keyName])) {
        delete obj[keyName];
      }
    }
    return obj;
  }

  // Method to convert file to base64
  toBase64(file: File): Promise<string | ArrayBuffer | null> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.toString().split(",")[1]);
      reader.onerror = (error) => reject(error);
    });
  }

  convertFileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.toString().split(",")[1]);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  }

  cleanObject(obj: any) {
    for (var keyName in obj) {
      if (this.isNilOrNaNOrUndefined(obj[keyName])) {
        delete obj[keyName];
      }
    }
    return obj;
  }

  async viewFile(base64string, fileFormat, name = null) {
    const dialogRef = this.dialog.open(ViewAttachmentsComponent, {
      width: '80%',
      data: {
        file: base64string,
        format: fileFormat,
        name
      }
    });

    return dialogRef.afterClosed().toPromise();
  }

  confirm = (params: ConfirmAction) => {
    params.showMessage = params.showMessage ?? true;
    params.showTitle = params.showTitle ?? true;
    Swal.fire({
      title: !params.showTitle ? "" : params.title,
      html: !params.showMessage ? "" : params.message,
      icon: params.icon ? params.icon : "info",
      showCancelButton: params.showCancelButton ?? true,
      showConfirmButton: params.showConfirmButton ?? true,
      confirmButtonColor: params.confirmBtnColor ?? "#008080",
      cancelButtonColor: params.cancelBtnColor ?? "#d33000",
      cancelButtonText: params.cancelText ?? "Cancel!",
      confirmButtonText: params.confirmText ?? "Yes!",
    }).then((result: any) => {
      if (result.isConfirmed) {
        if (params.accept) {
          params.accept(params.payload);
        }
      }

      if (result.isDismissed) {
        if (params.reject) {
          params.reject(params.payload);
        }
      }
    });
  };

  onSort(column: any, dataList: any[], direction?: "asc" | "desc") {
    if (direction == "asc") {
      direction = "desc";
    } else {
      direction = "asc";
    }
    const sortedArray = [...dataList]; // Create a new array
    sortedArray.sort((a, b) => {
      const res = this.compare(a[column], b[column]);
      return direction === "asc" ? res : -res;
    });
    return (dataList = sortedArray);
  }
  compare(v1: string | number, v2: string | number) {
    return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
  }

  getOrdersList(
    counts?: number,
    startPoint?: number,
    keyword?: string,
    type?: "pre" | "suffix",
  ): any[] {
    return [...Array(counts ? counts : 100)].map((_, i) => {
      const orderId = startPoint !== undefined ? i + startPoint : i + 1;
      return {
        id: orderId,
        order: `${keyword ? keyword : "Order#:"}  ${orderId}`,
      };
    });
  }

  get oagamisRawList() {
    return this.apollo
      .query<any>({
        query: OAGAMIS_LAW_LIST,
        fetchPolicy: "network-only",
      })
      .pipe(
        this.notificationServices.catchError(
          "Problem occurred while fetching Concept Papers",
        ),
        map(({ data }) => {
          return data.getOagamisLaws.data;
        }),
      );
  }
}

export interface ConfirmAction {
  message: string;
  confirmText?: string;
  title?: string;
  cancelText?: string;
  icon?: SweetAlertIcon;
  confirmBtnColor?: string;
  cancelBtnColor?: string;
  showConfirmButton?: boolean;
  showCancelButton?: boolean;
  showTitle?: boolean;
  showMessage?: boolean;
  accept?: Function;
  reject?: Function;
  payload?: any;
}
