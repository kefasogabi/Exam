import { NgZone, ErrorHandler, Inject, Injector, isDevMode } from "@angular/core";
import { Response } from "@angular/http";
import { ToastrService } from "ngx-toastr";
import * as Raven from 'raven-js'
import { Observable } from "rxjs";


export class AppErrorHandler implements ErrorHandler{

    constructor(@Inject(NgZone) private ngZone: NgZone, @Inject(Injector) private injector: Injector) { }

    private get toastr(): ToastrService {
        return this.injector.get(ToastrService);
    }

    public handleError(error: any): void {
        this.ngZone.run(() => {
            let errorTitle = 'Error';
            let errMsg = 'An unexpected error ocurred';

            if (error instanceof Response) {
                const contentType = error.headers.get("Content-Type")

                if (contentType && contentType == "application/json") {
                    const body = error.json();
                    errorTitle = body.message || errorTitle;
                    errMsg = body.detailedMessage || JSON.stringify(body);
                } else {
                    errMsg = error.text();
                }
            }
            this.toastr.error(errMsg, errorTitle);
        });

        if (!isDevMode())
            Raven.captureException(error.originalError || error);
        else
            throw error;
    }


    
    

    // constructor(  private ngZone: NgZone, @Inject(ToastrService) private toastr: ToastrService){}

    // public handleError(error: any): void{
    //      this.ngZone.run(() => {
    //        this.toastr.error('An Unexpected Error Happened.', 'Error');
    //      });
       
    //  }
}