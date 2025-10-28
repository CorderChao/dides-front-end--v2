import { CommonModule } from "@angular/common";
import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { Store } from "@ngxs/store";
import { NgxMatSelectSearchModule } from "ngx-mat-select-search";
import { Observable, Subject, takeUntil } from "rxjs";
import { MessageState } from "src/app/shared/components/dynamic-form/store/message.state";
import { SearchPipe } from "src/app/shared/pipes/search.pipe";
import { DynamicFormService } from "src/app/shared/services/dynamic-form.service";
import { DynamicErrorComponent } from "../../dynamic-error/dynamic-error.component";
import { DynamicFormMessage } from "../../store/dynamic-form-message.model";
import { MessageActions } from "../../store/message.action";
@Component({
  selector: "app-dynamic-select",
  templateUrl: "./dynamic-select.component.html",
  styleUrls: ["./dynamic-select.component.css"],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    DynamicErrorComponent,
    NgxMatSelectSearchModule,
    SearchPipe,
  ],
})
export class DynamicSelectComponent implements OnDestroy, OnInit {
  @Input() field: any;
  formName: FormGroup;
  unsubscribe$ = new Subject<void>();
  message$: Observable<DynamicFormMessage>;

  /** control for the mat select filter keyword */
  public searchValue = new FormControl();

  constructor(
    private store: Store,
    private messageService: DynamicFormService,
    private formGroupDirective: FormGroupDirective
  ) {
    this.formName = this.formGroupDirective.control;
  }
  ngOnInit(): void {
    this.listenForOptionsData();
  }

  listenForOptionsData() {
    if (!this.field?.observeOptions) {
      return;
    }

    this.message$ = this.store.select(
      MessageState.messageByFieldName(this.field.fieldName)
    );
    this.message$.pipe(takeUntil(this.unsubscribe$)).subscribe((message) => {
      this.field.options = message ? (this.field.options = message.data) : [];
    });
  }

  changedValue(value) {
    if (!this.field?.observeOnChanges) {
      return;
    }
    const payload = {
      fieldName: this.field.fieldName,
      changedValue: value,
    };
    this.store.dispatch(new MessageActions.PublishOnChangeMessage(payload));
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.messageService.clearMessage();
  }
}
