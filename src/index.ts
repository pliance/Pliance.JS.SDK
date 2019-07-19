import * as crypto from 'crypto';
import {default as fetch, Headers} from 'node-fetch';
import { Agent } from "https";
import * as qs from 'qs';

import {RegisterPersonResponse, ViewPersonQueryResult, Person, PersonSearchQuery, PersonSearchQueryResult} from './contracts'

export class ClientFactory {
    constructor(private secret: string, private issuer: string, private url: string, private agent?: Agent) {
    }

    public create(givenName: string, subject: string): IPlianceClient {
        return new PlianceClient(this, givenName, subject);
    }

    public async execute<T>(endpoint: string, method: string, givenName: string, subject: string, data?: any): Promise<T> {
        let jwt = new JWTFactory();
        var headers = new Headers()
        headers.append('Authorization', 'Bearer ' + jwt.generateJWT(this.secret, this.issuer, givenName, subject))
        headers.append('Content-Type', 'application/json');

        let body = data != undefined ? JSON.stringify(data) : undefined;
        let url = this.url + 'api/' + endpoint;
        let response = await fetch(url, {method: method, headers: headers, body: body, agent: this.agent});
        let json = await response.json();

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

    public async Register(person: Person): Promise<RegisterPersonResponse> {
        try {
            let response = await this.execute<RegisterPersonResponse>('PersonCommand', 'put', person);
            return response;
        }
        catch(e) {
            console.log(e);
            throw e;
        }
    }

    public async ViewPerson(personReferenceId : string): Promise<ViewPersonQueryResult> {
        try {
            let response = await this.execute<ViewPersonQueryResult>(`PersonQuery?personReferenceId=${personReferenceId}`, 'get');
            return response;
        }
        catch(e) {
            console.log(e);
            throw e;
        }
    }

    public async SearchPerson(query: PersonSearchQuery): Promise<PersonSearchQueryResult> {
        try {
            
            var euoe = qs.stringify(query);
            console.log(euoe);
            let response = await this.execute<PersonSearchQueryResult>(`PersonQuery/Search?=${euoe}`, 'get');
            return response;
        }
        catch(e) {
            console.log(e);
            throw e;
        }
    }

    async execute<T>(endpoint: string, method: string, data?: any): Promise<T> {
        let response = await this.clientFactory.execute<T>(endpoint, method, this.givenName, this.subject, data);

        return response;
    }
}

export interface IPlianceClient {
    ping(): Promise<string>;
    Register(person: Person): Promise<RegisterPersonResponse>;
    ViewPerson(personReferenceId: string): Promise<ViewPersonQueryResult>;
    SearchPerson(query: PersonSearchQuery): Promise<PersonSearchQueryResult>;

}

class JWTFactory {

    public generateJWT(secret: string, issuer: string, givenName: string, subject: string) {
        let header = {
          "typ": "JWT",
          "alg": "HS256"
        }
      
        let time_now = Math.floor(new Date().getTime() / 1000)
        let exp = time_now + 300
      
        let body = {
          "iat": time_now,
          "nbf": time_now,
          "exp": exp,
          "aud": "pliance.io",
          "iss": issuer,
          "given_name": givenName,
          "sub": subject
        }
      
        let token = []
      
        token[0] = this.base64url(JSON.stringify(header))
        token[1] = this.base64url(JSON.stringify(body))
        token[2] = this.genTokenSign(token, secret)
        return token.join(".");
      }
      
      genTokenSign(token: string[], secret: string) {
        if (token.length != 2) {
          return
        }
        let hmac = crypto.createHmac('sha256', secret);
        hmac.update(token.join("."));
        let base64Hash = hmac.digest('base64')
      
        return this.urlConvertBase64(base64Hash);
      }

      base64url (input: string) : string {
        let base64String = this.btoa(input);

        return this.urlConvertBase64(base64String);
    }

    btoa(str: string) : string {
        let buffer = Buffer.from(str, 'binary');
    
        return buffer.toString('base64');
    }

    urlConvertBase64(input: string) : string {
        let output = input.replace(/=+$/, '');
      
        output = output.replace(/\+/g, '-');
        output = output.replace(/\//g, '_');
        return output;
    }
}
