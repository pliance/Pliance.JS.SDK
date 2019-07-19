export interface  Person {
    identity?: PersonIdentity;
    firstName: string;
    lastName: string;
    personReferenceId: string;
    addresses?: Address[];
    options?: RegisterPersonOptions;
    birthdate?: Birthdate;
    gender?: string;
}

export interface Birthdate {
    Year: number | null;
    Month: number | null;
    Day: number | null;
}

interface Address {
    street1: string;
    street2: string;
    city: string;
    streetNo: string;
    postalCode: string;
    country: string;
}

export interface RegisterPersonOptions
{
    Order: Order;
    Fuzziness: Fuzziness;
}

enum Order
{
    Any = 0,
    Strict = 1,
    Exact = 2,
}

enum Fuzziness
{
    Metaphone = 0,
    Simple = 1,
    Diacritics = 2,
}

export interface Response {
    status: Status;
    checkpoint: string;
}

export enum Status {
    Success = "Success",
    Error = "Error"
}

export interface Hit {
    matchId: string;
}

export interface RegisterPersonResponse extends Response {
    hits: Hit[][];
}

export class PersonIdentity {
    constructor(public identity: string, public country: string) {
        
    }
}

export  interface ResponseT<T> extends Response {
    data: T;
}

export interface ViewPersonQueryResult extends ResponseT<ViewPersonResponseData> {

}

export interface ViewPersonResponseData {
    personReferenceId: string;
    identity: PersonIdentity;
    firstName: string;
    lastName: string;
    birthdate: string;
    addresses: Address[];
    hits: Hit[][];
    gender: Gender;
}

export enum Gender {
    Unknown = 0,
    Male = 1,
    Female = 2
}

export interface PersonSearchQuery {
    page: Page;
    filter: Filter;
    query: string;
}

export interface Page {
    size: number;
    no: number;
}

export interface Filter {
    isPep: boolean | null;
    isRca: boolean | null;
    isSanction: boolean | null;
}

export interface PersonSearchResult {
    personReferenceId: string;
    firstName: TextMatch[];
    lastName: TextMatch[];
    isPep: boolean;
    isRca: boolean;
    isSanction: boolean;
    identity: PersonIdentity;
}

export interface TextMatch {
    text: string;
    isMatch: boolean;
}

export interface PersonSearchResponseData {
    result: PersonSearchResult[];
}

export interface PersonSearchQueryResult extends ResponseT<PersonSearchResponseData>{
}
