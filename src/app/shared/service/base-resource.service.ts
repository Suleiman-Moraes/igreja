import { FINDBYPARAMSSINGLE, FINDBYPARAMSRELATORIO, DTO } from './../../pages/divida-ativa/shared/dividaativa.api';
import { ResponseApi } from './../models/response-api.model';
import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Injector } from '@angular/core';

export abstract class BaseResourceService<T extends BaseResourceModel> {

    protected http: HttpClient;
    protected responseApi: ResponseApi;

    constructor(
        protected apiPath: string,
        protected injector: Injector,
        protected jsonDataToResourceFn: (jsonData: any) => T
    ) {
        this.http = injector.get(HttpClient);
    }

    getAll(): Observable<ResponseApi> {
        return this.http.get(this.apiPath).pipe(
            map(this.fromJsonResponseApi.bind(this)),
            catchError(this.handleError)
        )
    }

    getById(id: number): Observable<ResponseApi> {
        const url = `${this.apiPath}/${id}`;
        return this.http.get(url).pipe(
            map(this.fromJsonResponseApi.bind(this)),
            catchError(this.handleError)
        )
    }

    create(resource: T): Observable<ResponseApi> {
        return this.http.post(this.apiPath, resource).pipe(
            map(this.fromJsonResponseApi.bind(this)),
            catchError(this.handleError)
        )
    }

    update(resource: T): Observable<ResponseApi> {
        return this.http.put(this.apiPath, resource).pipe(
            map(this.fromJsonResponseApi.bind(this)),
            catchError(this.handleError)
        );
    }

    delete(id: number): Observable<Boolean> {
        const url = `${this.apiPath}/${id}`;

        const json = this.http.delete(url);
        return this.getResponseApi(json).data.pipe(
            map(this.jsonDataBoolean.bind(this)),
            catchError(this.handleError)
        )
    }

    findByField(field: string, value: any): Observable<ResponseApi> {
        return this.http.get(`${this.apiPath}/findbyfield/?field=${field}&value=${value}`).pipe(
            map(this.fromJsonResponseApi.bind(this)),
            catchError(this.handleError)
        );
    }

    enviarFormulario(resource: T, metodo: boolean): Observable<ResponseApi> {
        return metodo ? this.update(resource) : this.create(resource);
    }

    findByParamsSingle(page: number, count: number): Observable<ResponseApi> {
        return this.http.get
            (`${this.apiPath}${FINDBYPARAMSSINGLE}?page=${page}&count=${count}`)
            .pipe(
                map(this.fromJsonResponseApi.bind(this)),
                catchError(this.handleError)
            );
    }

    findByParamsRelatorio(page: number, count: number, id: number, empresa: string, placa: string,
        dataDe: string, dataAte: string): Observable<ResponseApi> {
        id = id ? id : 0;
        return this.http.get
            (`${this.apiPath}${FINDBYPARAMSRELATORIO}?page=${page}&count=${count}&id=${id}` +
                `&empresa=${empresa}&placa=${placa}&dataDe=${dataDe}&dataAte=${dataAte}`)
            .pipe(
                map(this.fromJsonResponseApi.bind(this)),
                catchError(this.handleError)
            );
    }

    createDTO(resource): Observable<ResponseApi> {
        return this.http.post(this.apiPath + DTO, resource).pipe(
            map(this.fromJsonResponseApi.bind(this)),
            catchError(this.handleError)
        )
    }

    updateDTO(resource): Observable<ResponseApi> {
        return this.http.put(this.apiPath + DTO, resource).pipe(
            map(this.fromJsonResponseApi.bind(this)),
            catchError(this.handleError)
        )
    }

    findDtoById(id): Observable<ResponseApi> {
        return this.http.get(`${this.apiPath + DTO}/${id}`).pipe(
            map(this.fromJsonResponseApi.bind(this)),
            catchError(this.handleError)
        )
    }
    // PROTECTED METHODS
    protected jsonDataToResources(jsonData: any[]): T[] {
        const resources: T[] = [];
        jsonData.forEach(
            element => resources.push(this.jsonDataToResourceFn(element))
        );
        return resources;
    }

    protected jsonDataToResource(jsonData: any): T {
        return this.jsonDataToResourceFn(jsonData);
    }

    protected handleError(error: any): Observable<any> {
        console.log("ERRO NA REQUISIÇÃO => ", error);
        return throwError(error);
    }

    protected getResponseApi(json: any): ResponseApi {
        // this.getResponseApi(json)
        json.subscribe((responseApi: ResponseApi) => {
            this.responseApi = responseApi;
        }, err => {
            this.handleError(err);
        });
        return this.responseApi;
    }

    protected jsonDataBoolean(json: any): boolean {
        return Object.assign(new ResponseApi(), json);
    }

    protected fromJsonResponseApi(jsonData: any): ResponseApi {
        return Object.assign(new ResponseApi(), jsonData);
    }
}