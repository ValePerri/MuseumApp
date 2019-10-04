import { HttpHeaders, HttpParams } from '@angular/common/http';

export interface HttpOptions {
    headers?: HttpHeaders,
    params?: HttpParams,
    responseType?: 'json',
    withCredentials?: boolean
}
