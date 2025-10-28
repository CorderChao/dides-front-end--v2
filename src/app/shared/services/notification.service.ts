import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { ResponseCodeService } from './response-code.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private router: Router,
    private responseCodeService: ResponseCodeService
  ) { }

  successMessage(message: string) {
    return Swal.fire(
      {
        title: message,
        text: '',
        icon: 'success',
        allowOutsideClick: false
      }
    );
  }

  errorMessage(message: string) {
    return Swal.fire(
      {
        title: message,
        text: '',
        icon: 'error',
        allowOutsideClick: false
      }
    );
  }

  noErrorCode() {
    return Swal.fire(
      {
        title: 'Unknown Error Code Returned',
        text: '',
        icon: 'error',
        allowOutsideClick: false
      }
    );
  }

  catchError(message) {
    return catchError((error) => {
      Swal.fire(
        {
          icon: 'error',
          title: 'Error',
          text: message + ', please contact the system administrator',
        }
      );
      return of([]);
    });
  }

  confirmation(message: string = 'Are you sure?', confirmButtonText: string = 'YES') {
    return Swal.fire({
      title: message,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#808080',
      cancelButtonColor: '#d33',
      confirmButtonText,
      allowOutsideClick: false
    });
  }

  warningMessage(message: string) {
    return Swal.fire(
      {
        title: message,
        text: '',
        icon: 'warning',
        allowOutsideClick: false
      }
    );
  }

  determineResponse(data) {
    if (data?.code === 6000) {
      this.successMessage(data?.description);
    } else if (data?.code === 6002) {
      this.errorMessage(data?.description);
    }else if (data?.code === 6004) {
      this.errorMessage(data?.description);
    }else if (data?.code === 6005) {
      this.errorMessage(data?.description);
    } else {
  
    }
  }
 
}
