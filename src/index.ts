import * as crypto from 'crypto';
import { default as fetch, Headers } from 'node-fetch';
import { Agent } from "https";
import * as qs from 'qs';

import {
    RegisterPersonCommand, RegisterPersonResponse,
    ViewPersonQueryResult, PersonSearchQuery, PersonSearchQueryResult, ClassifyHitCommand, ClassifyHitResponse,
    ArchivePersonResponse, ArchivePersonCommand,
    UnarchivePersonResponse, UnarchivePersonCommand,
    DeletePersonCommand, DeletePersonResponse,
    RegisterCompanyCommand, RegisterCompanyResponse,
    ViewCompanyQueryResult,
    CompanySearchQuery, CompanySearchQueryResult,
    ArchiveCompanyCommand, ArchiveCompanyResponse,
    UnarchiveCompanyCommand, UnarchiveCompanyResponse,
    DeleteCompanyCommand, DeleteCompanyResponse
} from './contracts'

export class ClientFactory {
    constructor(private secret: string, private issuer: string, private url: string, private agent?: Agent) {
    }

    public create(givenName: string, subject: string): IPlianceClient {
        return new PlianceClient(this, givenName, subject);
    }

    public async execute<T>(endpoint: string, method: string, givenName: string, subject: string, data?: any): Promise<T> {
        let jwt = new JWTFactory();
        var headers = new Headers();
        headers.append('Authorization', 'Bearer ' + jwt.generateJWT(this.secret, this.issuer, givenName, subject));
        headers.append('Content-Type', 'application/json');

        let body = data != undefined ? JSON.stringify(data) : undefined;
        let url = this.url + 'api/' + endpoint;
        let response = await fetch(url, { method: method, headers: headers, body: body, agent: this.agent });
        let json = await response.json();
        let obj = <Response>json;

        if (!obj.success) {
            throw obj.message;
        }

        return json;
    }
}

class PlianceClient implements IPlianceClient {
    constructor(private clientFactory: ClientFactory, private givenName: string, private subject: string) {
    }

    public async ping(): Promise<string> {
        let response = await this.execute<string>('ping', 'get');

        return response;
    }

    public async registerPerson(person: RegisterPersonCommand): Promise<RegisterPersonResponse> {
        try {
            let response = await this.execute<RegisterPersonResponse>('PersonCommand', 'put', person);
            return response;
        }
        catch (e) {
            console.log(e);
            throw e;
        }
    }

    public async viewPerson(personReferenceId: string): Promise<ViewPersonQueryResult> {
        try {
            let response = await this.execute<ViewPersonQueryResult>(`PersonQuery?personReferenceId=${personReferenceId}`, 'get');
            return response;
        }
        catch (e) {
            console.log(e);
            throw e;
        }
    }

    public async searchPerson(query: PersonSearchQuery): Promise<PersonSearchQueryResult> {
        try {
            var params = qs.stringify(query, { allowDots: true });
            let response = await this.execute<PersonSearchQueryResult>(`PersonQuery/Search?${params}`, 'get');
            return response;
        }
        catch (e) {
            console.log(e);
            throw e;
        }
    }

    public async classifyPersonHit(classifyPersonHit: ClassifyHitCommand): Promise<ClassifyHitResponse> {
        try {
            let response = await this.execute<ClassifyHitResponse>(`PersonCommand/Classify`, 'post', classifyPersonHit);
            return response;
        }
        catch (e) {
            console.log(e);
            throw e;
        }
    }

    public async archivePerson(command: ArchivePersonCommand): Promise<ArchivePersonResponse> {
        try {
            let response = await this.execute<ClassifyHitResponse>(`PersonCommand/archive`, 'post', command);
            return response;
        }
        catch (e) {
            console.log(e);
            throw e;
        }
    }

    public async unarchivePerson(command: UnarchivePersonCommand): Promise<UnarchivePersonResponse> {
        try {
            let response = await this.execute<ClassifyHitResponse>(`PersonCommand/unarchive`, 'post', command);
            return response;
        }
        catch (e) {
            console.log(e);
            throw e;
        }
    }

    public async deletePerson(command: DeletePersonCommand): Promise<DeletePersonResponse> {
        try {
            var params = qs.stringify(command, { allowDots: true });
            let response = await this.execute<ClassifyHitResponse>(`PersonCommand?${params}`, 'delete');
            return response;
        }
        catch (e) {
            console.log(e);
            throw e;
        }
    }

    public async registerCompany(company: RegisterCompanyCommand): Promise<RegisterCompanyResponse> {
        try {
            let response = await this.execute<RegisterCompanyResponse>('companyCommand', 'put', company);
            return response;
        }
        catch (e) {
            console.log(e);
            throw e;
        }
    }

    async execute<T>(endpoint: string, method: string, data?: any): Promise<T> {
        let response = await this.clientFactory.execute<T>(endpoint, method, this.givenName, this.subject, data);

        return response;
    }

    public async viewCompany(companyReferenceId: string): Promise<ViewCompanyQueryResult> {
        try {
            let response = await this.execute<ViewCompanyQueryResult>(`CompanyQuery?companyReferenceId=${companyReferenceId}`, 'get');
            return response;
        }
        catch (e) {
            console.log(e);
            throw e;
        }
    }

    public async searchCompany(query: CompanySearchQuery): Promise<CompanySearchQueryResult> {
        try {
            var params = qs.stringify(query, { allowDots: true });
            let response = await this.execute<CompanySearchQueryResult>(`CompanyQuery/Search?${params}`, 'get');
            return response;
        }
        catch (e) {
            console.log(e);
            throw e;
        }
    }

    public async archiveCompany(command: ArchiveCompanyCommand): Promise<ArchiveCompanyResponse> {
        try {
            let response = await this.execute<ArchiveCompanyResponse>(`companyCommand/archive`, 'post', command);
            return response;
        }
        catch (e) {
            console.log(e);
            throw e;
        }
    }

    public async unarchiveCompany(command: UnarchiveCompanyCommand): Promise<UnarchiveCompanyResponse> {
        try {
            let response = await this.execute<UnarchiveCompanyResponse>(`companyCommand/unarchive`, 'post', command);
            return response;
        }
        catch (e) {
            console.log(e);
            throw e;
        }
    }

    public async deleteCompany(command: DeleteCompanyCommand): Promise<DeletePersonResponse> {
        try {
            var params = qs.stringify(command, { allowDots: true });
            let response = await this.execute<DeleteCompanyResponse>(`companyCommand?${params}`, 'delete');
            return response;
        }
        catch (e) {
            console.log(e);
            throw e;
        }
    }
}

export interface IPlianceClient {
    ping(): Promise<string>;
    registerPerson(person: RegisterPersonCommand): Promise<RegisterPersonResponse>;
    viewPerson(personReferenceId: string): Promise<ViewPersonQueryResult>;
    searchPerson(query: PersonSearchQuery): Promise<PersonSearchQueryResult>;
    classifyPersonHit(classifyPersonHit: ClassifyHitCommand): Promise<ClassifyHitResponse>;
    archivePerson(command: ArchivePersonCommand): Promise<ArchivePersonResponse>;
    unarchivePerson(command: UnarchivePersonCommand): Promise<UnarchivePersonResponse>;
    deletePerson(command: DeletePersonCommand): Promise<DeletePersonResponse>;
    registerCompany(company: RegisterCompanyCommand): Promise<RegisterCompanyResponse>;
    viewCompany(companyReferenceId: string): Promise<ViewCompanyQueryResult>;
    searchCompany(query: CompanySearchQuery): Promise<CompanySearchQueryResult>;
    archiveCompany(command: ArchiveCompanyCommand): Promise<ArchiveCompanyResponse>;
    unarchiveCompany(command: UnarchiveCompanyCommand): Promise<UnarchiveCompanyResponse>;
    deleteCompany(command: DeleteCompanyCommand): Promise<DeleteCompanyResponse>;
}

class JWTFactory {
    public generateJWT(secret: string, issuer: string, givenName: string, subject: string): string {
        let header = {
            "typ": "JWT",
            "alg": "HS256"
        };

        let time_now = Math.floor(new Date().getTime() / 1000);
        let exp = time_now + 300;

        let body = {
            "iat": time_now,
            "nbf": time_now,
            "exp": exp,
            "aud": "pliance.io",
            "iss": issuer,
            "given_name": givenName,
            "sub": subject
        };

        let token = [];

        token[0] = this.base64url(JSON.stringify(header));
        token[1] = this.base64url(JSON.stringify(body));
        token[2] = this.genTokenSign(token, secret);
        return token.join(".");
    }

    genTokenSign(token: string[], secret: string): string {
        if (token.length != 2) {
            throw new Error('missing token');
        }

        let hmac = crypto.createHmac('sha256', secret);
        hmac.update(token.join("."));
        let base64Hash = hmac.digest('base64')

        return this.urlConvertBase64(base64Hash);
    }

    base64url(input: string): string {
        let base64String = this.btoa(input);

        return this.urlConvertBase64(base64String);
    }

    btoa(str: string): string {
        let buffer = Buffer.from(str, 'binary');

        return buffer.toString('base64');
    }

    urlConvertBase64(input: string): string {
        let output = input.replace(/=+$/, '');

        output = output.replace(/\+/g, '-');
        output = output.replace(/\//g, '_');
        return output;
    }
}

class Response {
    status?: string;
    success?: boolean;
    message?: string;
    checkpoint?: string;
}