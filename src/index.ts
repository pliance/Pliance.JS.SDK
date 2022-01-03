import * as crypto from 'crypto';
import { default as fetch, Headers } from 'node-fetch';
import { Agent } from "https";
import * as qs from 'qs';

import {
    Response,
    // @inject: imports
    ArchiveCompanyResponse,
    ArchiveCompanyCommand,
    ArchivePersonResponse,
    ArchivePersonCommand,
    ClassifyCompanyHitResponse,
    ClassifyCompanyHitCommand,
    ClassifyPersonHitResponse,
    ClassifyPersonHitCommand,
    ViewCompanyDataQueryResult,
    ViewCompanyDataQuery,
    DeleteCompanyResponse,
    DeleteCompanyCommand,
    DeletePersonResponse,
    DeletePersonCommand,
    FeedQueryResult,
    FeedQuery,
    CompanyReportQueryResult,
    CompanyReportQuery,
    GeneralReportQueryResult,
    GeneralReportQuery,
    PersonReportQueryResult,
    PersonReportQuery,
    WebhookQueryResult,
    WebhookQuery,
    PingResponse,
    PingQuery,
    WebhookPokeQueryResult,
    WebhookPokeQuery,
    RegisterCompanyResponse,
    RegisterCompanyCommand,
    RegisterPersonResponse,
    RegisterPersonCommand,
    WebhookUpdateResponse,
    WebhookUpdateCommand,
    CompanySearchQueryResult,
    CompanySearchQuery,
    PersonSearchQueryResult,
    PersonSearchQuery,
    UnarchiveCompanyResponse,
    UnarchiveCompanyCommand,
    UnarchivePersonResponse,
    UnarchivePersonCommand,
    ViewCompanyQueryResult,
    ViewCompanyQuery,
    ViewPersonQueryResult,
    ViewPersonQuery,
    WatchlistCompanyQueryResult,
    WatchlistCompanyQuery,
    WatchlistQueryResult,
    WatchlistQuery,
    WatchlistQueryResultV2,
    WatchlistQueryV2,
    // @inject: !imports
} from './contracts'

export interface IPlianceClient {
    // @inject: interface
    archiveCompany(command: ArchiveCompanyCommand): Promise<ArchiveCompanyResponse>;
    archivePerson(command: ArchivePersonCommand): Promise<ArchivePersonResponse>;
    classifyCompanyHit(command: ClassifyCompanyHitCommand): Promise<ClassifyCompanyHitResponse>;
    classifyPersonHit(command: ClassifyPersonHitCommand): Promise<ClassifyPersonHitResponse>;
    companyData(request: ViewCompanyDataQuery): Promise<ViewCompanyDataQueryResult>;
    deleteCompany(command: DeleteCompanyCommand): Promise<DeleteCompanyResponse>;
    deletePerson(command: DeletePersonCommand): Promise<DeletePersonResponse>;
    feed(request: FeedQuery): Promise<FeedQueryResult>;
    getCompanyReport(request: CompanyReportQuery): Promise<CompanyReportQueryResult>;
    getGeneralReport(request: GeneralReportQuery): Promise<GeneralReportQueryResult>;
    getPersonReport(request: PersonReportQuery): Promise<PersonReportQueryResult>;
    getWebhook(request: WebhookQuery): Promise<WebhookQueryResult>;
    ping(request: PingQuery): Promise<PingResponse>;
    poke(query: WebhookPokeQuery): Promise<WebhookPokeQueryResult>;
    registerCompany(command: RegisterCompanyCommand): Promise<RegisterCompanyResponse>;
    registerPerson(command: RegisterPersonCommand): Promise<RegisterPersonResponse>;
    saveWebhook(command: WebhookUpdateCommand): Promise<WebhookUpdateResponse>;
    searchCompany(request: CompanySearchQuery): Promise<CompanySearchQueryResult>;
    searchPerson(request: PersonSearchQuery): Promise<PersonSearchQueryResult>;
    unarchiveCompany(command: UnarchiveCompanyCommand): Promise<UnarchiveCompanyResponse>;
    unarchivePerson(command: UnarchivePersonCommand): Promise<UnarchivePersonResponse>;
    viewCompany(request: ViewCompanyQuery): Promise<ViewCompanyQueryResult>;
    viewPerson(request: ViewPersonQuery): Promise<ViewPersonQueryResult>;
    watchlistCompany(request: WatchlistCompanyQuery): Promise<WatchlistCompanyQueryResult>;
    watchlistPerson(request: WatchlistQuery): Promise<WatchlistQueryResult>;
    watchlistPersonV2(request: WatchlistQueryV2): Promise<WatchlistQueryResultV2>;
    // @inject: !interface
}

export class ClientFactory {
    constructor(private secret: string, private issuer: string, private url: string, private agent?: Agent) {
    }

    public create(givenName: string, subject: string): IPlianceClient {
        return new PlianceClient(this, givenName, subject);
    }

    public async execute<T>(endpoint: string, method: string, givenName: string, subject: string, data?: any): Promise<T> {
        let jwt = new JWTFactory();
        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + jwt.generateJWT(this.secret, this.issuer, givenName, subject));
        headers.append('Content-Type', 'application/json');

        let body = data != undefined ? JSON.stringify(data) : undefined;
        let url = this.url + endpoint;
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

    // @inject: methods
    async searchCompany(request: CompanySearchQuery): Promise<CompanySearchQueryResult> {
        try {
            let params = qs.stringify(request, { allowDots: true });
            let response = await this.execute<CompanySearchQueryResult>(`api/CompanyQuery/Search?${params}`, 'get');
            return response;
        }
        catch (e) {
            console.log(e);
            throw e;
        }
    }

    async viewCompany(request: ViewCompanyQuery): Promise<ViewCompanyQueryResult> {
        try {
            let params = qs.stringify(request, { allowDots: true });
            let response = await this.execute<ViewCompanyQueryResult>(`api/CompanyQuery?${params}`, 'get');
            return response;
        }
        catch (e) {
            console.log(e);
            throw e;
        }
    }

    async companyData(request: ViewCompanyDataQuery): Promise<ViewCompanyDataQueryResult> {
        try {
            let params = qs.stringify(request, { allowDots: true });
            let response = await this.execute<ViewCompanyDataQueryResult>(`api/CompanyQuery/CompanyData?${params}`, 'get');
            return response;
        }
        catch (e) {
            console.log(e);
            throw e;
        }
    }

    async feed(request: FeedQuery): Promise<FeedQueryResult> {
        try {
            let params = qs.stringify(request, { allowDots: true });
            let response = await this.execute<FeedQueryResult>(`api/FeedQuery?${params}`, 'get');
            return response;
        }
        catch (e) {
            console.log(e);
            throw e;
        }
    }

    async searchPerson(request: PersonSearchQuery): Promise<PersonSearchQueryResult> {
        try {
            let params = qs.stringify(request, { allowDots: true });
            let response = await this.execute<PersonSearchQueryResult>(`api/PersonQuery/Search?${params}`, 'get');
            return response;
        }
        catch (e) {
            console.log(e);
            throw e;
        }
    }

    async viewPerson(request: ViewPersonQuery): Promise<ViewPersonQueryResult> {
        try {
            let params = qs.stringify(request, { allowDots: true });
            let response = await this.execute<ViewPersonQueryResult>(`api/PersonQuery?${params}`, 'get');
            return response;
        }
        catch (e) {
            console.log(e);
            throw e;
        }
    }

    async ping(request: PingQuery): Promise<PingResponse> {
        try {
            let params = qs.stringify(request, { allowDots: true });
            let response = await this.execute<PingResponse>(`api/Ping?${params}`, 'get');
            return response;
        }
        catch (e) {
            console.log(e);
            throw e;
        }
    }

    async getPersonReport(request: PersonReportQuery): Promise<PersonReportQueryResult> {
        try {
            let params = qs.stringify(request, { allowDots: true });
            let response = await this.execute<PersonReportQueryResult>(`api/ReportQuery/PersonReport?${params}`, 'get');
            return response;
        }
        catch (e) {
            console.log(e);
            throw e;
        }
    }

    async getGeneralReport(request: GeneralReportQuery): Promise<GeneralReportQueryResult> {
        try {
            let params = qs.stringify(request, { allowDots: true });
            let response = await this.execute<GeneralReportQueryResult>(`api/ReportQuery/GeneralReport?${params}`, 'get');
            return response;
        }
        catch (e) {
            console.log(e);
            throw e;
        }
    }

    async getCompanyReport(request: CompanyReportQuery): Promise<CompanyReportQueryResult> {
        try {
            let params = qs.stringify(request, { allowDots: true });
            let response = await this.execute<CompanyReportQueryResult>(`api/ReportQuery/CompanyReport?${params}`, 'get');
            return response;
        }
        catch (e) {
            console.log(e);
            throw e;
        }
    }

    async watchlistPerson(request: WatchlistQuery): Promise<WatchlistQueryResult> {
        try {
            let params = qs.stringify(request, { allowDots: true });
            let response = await this.execute<WatchlistQueryResult>(`api/WatchlistQuery?${params}`, 'get');
            return response;
        }
        catch (e) {
            console.log(e);
            throw e;
        }
    }

    async watchlistPersonV2(request: WatchlistQueryV2): Promise<WatchlistQueryResultV2> {
        try {
            let params = qs.stringify(request, { allowDots: true });
            let response = await this.execute<WatchlistQueryResultV2>(`api/WatchlistQuery/v2?${params}`, 'get');
            return response;
        }
        catch (e) {
            console.log(e);
            throw e;
        }
    }

    async watchlistCompany(request: WatchlistCompanyQuery): Promise<WatchlistCompanyQueryResult> {
        try {
            let params = qs.stringify(request, { allowDots: true });
            let response = await this.execute<WatchlistCompanyQueryResult>(`api/WatchlistQuery/Company?${params}`, 'get');
            return response;
        }
        catch (e) {
            console.log(e);
            throw e;
        }
    }

    async getWebhook(request: WebhookQuery): Promise<WebhookQueryResult> {
        try {
            let params = qs.stringify(request, { allowDots: true });
            let response = await this.execute<WebhookQueryResult>(`api/WebhookQuery?${params}`, 'get');
            return response;
        }
        catch (e) {
            console.log(e);
            throw e;
        }
    }

    async poke(query: WebhookPokeQuery): Promise<WebhookPokeQueryResult> {
        try {
            let response = await this.execute<WebhookPokeQueryResult>(`api/WebhookQuery/Poke`, 'post', query);
            return response;
        }
        catch (e) {
            console.log(e);
            throw e;
        }
    }

    async registerCompany(command: RegisterCompanyCommand): Promise<RegisterCompanyResponse> {
        try {
            let response = await this.execute<RegisterCompanyResponse>(`api/CompanyCommand`, 'put', command);
            return response;
        }
        catch (e) {
            console.log(e);
            throw e;
        }
    }

    async archiveCompany(command: ArchiveCompanyCommand): Promise<ArchiveCompanyResponse> {
        try {
            let response = await this.execute<ArchiveCompanyResponse>(`api/CompanyCommand/Archive`, 'post', command);
            return response;
        }
        catch (e) {
            console.log(e);
            throw e;
        }
    }

    async unarchiveCompany(command: UnarchiveCompanyCommand): Promise<UnarchiveCompanyResponse> {
        try {
            let response = await this.execute<UnarchiveCompanyResponse>(`api/CompanyCommand/Unarchive`, 'post', command);
            return response;
        }
        catch (e) {
            console.log(e);
            throw e;
        }
    }

    async deleteCompany(command: DeleteCompanyCommand): Promise<DeleteCompanyResponse> {
        try {
            let params = qs.stringify(command, { allowDots: true });
            let response = await this.execute<DeleteCompanyResponse>(`api/CompanyCommand?${params}`, 'delete');
            return response;
        }
        catch (e) {
            console.log(e);
            throw e;
        }
    }

    async classifyCompanyHit(command: ClassifyCompanyHitCommand): Promise<ClassifyCompanyHitResponse> {
        try {
            let response = await this.execute<ClassifyCompanyHitResponse>(`api/CompanyCommand/Classify`, 'post', command);
            return response;
        }
        catch (e) {
            console.log(e);
            throw e;
        }
    }

    async registerPerson(command: RegisterPersonCommand): Promise<RegisterPersonResponse> {
        try {
            let response = await this.execute<RegisterPersonResponse>(`api/PersonCommand`, 'put', command);
            return response;
        }
        catch (e) {
            console.log(e);
            throw e;
        }
    }

    async archivePerson(command: ArchivePersonCommand): Promise<ArchivePersonResponse> {
        try {
            let response = await this.execute<ArchivePersonResponse>(`api/PersonCommand/Archive`, 'post', command);
            return response;
        }
        catch (e) {
            console.log(e);
            throw e;
        }
    }

    async unarchivePerson(command: UnarchivePersonCommand): Promise<UnarchivePersonResponse> {
        try {
            let response = await this.execute<UnarchivePersonResponse>(`api/PersonCommand/Unarchive`, 'post', command);
            return response;
        }
        catch (e) {
            console.log(e);
            throw e;
        }
    }

    async deletePerson(command: DeletePersonCommand): Promise<DeletePersonResponse> {
        try {
            let params = qs.stringify(command, { allowDots: true });
            let response = await this.execute<DeletePersonResponse>(`api/PersonCommand?${params}`, 'delete');
            return response;
        }
        catch (e) {
            console.log(e);
            throw e;
        }
    }

    async classifyPersonHit(command: ClassifyPersonHitCommand): Promise<ClassifyPersonHitResponse> {
        try {
            let response = await this.execute<ClassifyPersonHitResponse>(`api/PersonCommand/Classify`, 'post', command);
            return response;
        }
        catch (e) {
            console.log(e);
            throw e;
        }
    }

    async saveWebhook(command: WebhookUpdateCommand): Promise<WebhookUpdateResponse> {
        try {
            let response = await this.execute<WebhookUpdateResponse>(`api/WebhookCommand`, 'put', command);
            return response;
        }
        catch (e) {
            console.log(e);
            throw e;
        }
    }

    // @inject: !methods

    async execute<T/* extends Response*/>(endpoint: string, method: string, data?: any): Promise<T> {
        let response = await this.clientFactory.execute<T>(endpoint, method, this.givenName, this.subject, data);

        return response;
    }    
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
        let buffer = Buffer.from(str);

        return buffer.toString('base64');
    }

    urlConvertBase64(input: string): string {
        let output = input.replace(/=+$/, '');

        output = output.replace(/\+/g, '-');
        output = output.replace(/\//g, '_');
        return output;
    }
}
