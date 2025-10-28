import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { of } from "rxjs";
import { catchError } from "rxjs/operators";
import Swal from "sweetalert2";

export interface Message {
  title?: string;
  message: string;
}
export interface RedirectMessage extends Message {
  url: string;
}

@Injectable({
  providedIn: "root",
})
export class SweetalertNotificationService {
  constructor(private router: Router) {}

  timer: number = 80000;

  close() {
    Swal.close();
  }

  successMessage({ title = "", message }: Message) {
    const trimmedTitle = title ? title.trim() : "";
    return Swal.fire({
      confirmButtonText: "OK",
      title: trimmedTitle ? trimmedTitle : message,
      text: trimmedTitle ? message : "",
      icon: "success",
      allowOutsideClick: false,
      timer: this.timer,
    });
  }

  infoMessage({ title = "", message }: Message) {
    const trimmedTitle = title ? title.trim() : "";
    return Swal.fire({
      confirmButtonText: "OK",
      title: trimmedTitle ? trimmedTitle : message,
      text: trimmedTitle ? message : "",
      icon: "info",
      allowOutsideClick: false,
      timer: this.timer,
    });
  }

  errorMessage({ title = "", message }: Message) {
    const trimmedTitle = title ? title.trim() : "";
    return Swal.fire({
      confirmButtonText: "OK",
      title: trimmedTitle ? trimmedTitle : message,
      text: trimmedTitle ? message : "",
      icon: "error",
      allowOutsideClick: false,
      timer: this.timer,
    });
  }

  noErrorCode() {
    const trimmedTitle = "Unknown Error Code Returned";
    return Swal.fire({
      confirmButtonText: "OK",
      title: trimmedTitle,
      text: "",
      icon: "error",
      allowOutsideClick: false,
      timer: this.timer,
    });
  }

  catchError(message, showError?: boolean) {
    const confirmButtonText = "OK";
    const trimmedTitle = "Error ...";
    const messageText = ", Please contact the system administrator";
    return catchError((error) => {
      error = (error + "").replace("GraphQL error:", "").replace("Error:", "");
      Swal.fire({
        confirmButtonText: confirmButtonText,
        icon: "error",
        title: trimmedTitle,
        text: showError ? error : message + messageText,
        allowOutsideClick: false,
        timer: this.timer,
      });
      return of();
    });
  }

  confirmation({ title = "", message = "Are you sure?" }: Message) {
    const trimmedTitle = title ? title.trim() : "";
    return Swal.fire({
      title: trimmedTitle ? trimmedTitle : message,
      text: trimmedTitle ? message : "",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "YES",
      cancelButtonText: "Cancel",
      allowOutsideClick: false,
      timer: this.timer,
    });
  }

  successMessageWithRedirect({ title = "", message, url }: RedirectMessage) {
    const trimmedTitle = title ? title.trim() : "";
    return Swal.fire({
      confirmButtonText: "OK",
      title: trimmedTitle ? trimmedTitle : message,
      text: trimmedTitle ? message : "",
      icon: "success",
      allowOutsideClick: false,
    }).then((result) => {
      this.router.navigateByUrl(url);
    });
  }

  warningMessage({ title = "", message }: Message) {
    const trimmedTitle = title ? title.trim() : "";
    return Swal.fire({
      confirmButtonText: "OK",
      title: trimmedTitle ? trimmedTitle : message,
      text: trimmedTitle ? message : "",
      icon: "warning",
      allowOutsideClick: false,
      timer: this.timer,
    });
  }
}
