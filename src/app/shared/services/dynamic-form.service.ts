import { Injectable } from "@angular/core";
import { shareReplay, Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DynamicFormService {
  constructor() {}
  public messageSubject = new Subject<any>();
  public message$ = this.messageSubject.pipe(shareReplay());

  public publishMessage(value): void {
    this.messageSubject.next(value);
  }

  public clearMessage(): void {
    this.messageSubject.complete();
  }
}
