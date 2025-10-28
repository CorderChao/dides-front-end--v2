import { CommonModule } from "@angular/common";
import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from "@angular/core";
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
import { Observable, filter, takeWhile } from "rxjs";
import { SearchPipe } from "src/app/shared/pipes/search.pipe";
import { DynamicFormService } from "src/app/shared/services/dynamic-form.service";
import { DynamicErrorComponent } from "../../dynamic-error/dynamic-error.component";
import { DynamicFormMessage } from "../../store/dynamic-form-message.model";
import { MessageState } from "../../store/message.state";

@Component({
  selector: "app-dynamic-select-multiple",
  templateUrl: "./dynamic-select-multiple.component.html",
  styleUrls: ["./dynamic-select-multiple.component.scss"],
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
export class DynamicSelectMultipleComponent
  implements OnInit, OnChanges, OnDestroy
{
  @Input() field: any;
  formName: FormGroup;
  alive = true;
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

  ngOnChanges(changes: SimpleChanges): void {
    this.listenForLinkData();
  }

  ngOnDestroy() {
    this.alive = false;
    this.messageService.clearMessage();
  }

  listenForOptionsData() {
    if (!this.field?.observeOptions) {
      return;
    }

    this.message$ = this.store.select(
      MessageState.messageByFieldName(this.field.fieldName)
    );
    this.message$.pipe(takeWhile(() => this.alive)).subscribe((message) => {
      this.field.options = message ? (this.field.options = message.data) : [];
    });
  }

  listenForLinkData() {
    if (!this.field?.link) {
      return;
    }
    this.messageService.message$
      .pipe(
        filter((v) => v.link === this.field.link),
        takeWhile(() => this.alive)
      )
      .subscribe((v) => {
        this.field.options = v.data;
      });
  }

  changedValue(value: string) {
    if (!this.field.provideData) {
      return;
    }
    this.messageService.publishMessage({
      link: this.field.fieldName,
      data: this.field.provideData.filter((v) => v.sourceValue === value),
    });
  }
}
