import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions, URLSearchParams } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";

@Injectable()
export default class HttpService {

    constructor(private _http: Http) {
    }

    sendGetRequest(url : string): Observable<any> {
        return this._http.get(url)
        .map(serverResponse=> this.parseServerResponse(serverResponse))
        .catch(serverResponse => this.parseServerErrorResponse(serverResponse));
    }

    private parseServerResponse(serverResponse : Response): any {
        let jsonResponse : any = serverResponse.json();

        if (jsonResponse.successful === false) {
            throw new Error(jsonResponse.error);
        }
        return jsonResponse.data;
    }


    private parseServerErrorResponse(exception: Response | any): any {
        let errorMessage: string;
        console.log(exception);
        if (exception instanceof Response) {
            let body : any = exception.json() || "";
            let error : any= body.error || JSON.stringify(body);
            errorMessage = `${error.status} - ${error.statusText || ""} ${error}`;
        } else {
            errorMessage = exception.message ? exception.message : exception.toString();
        }
        return Observable.throw(errorMessage);
    }
}


