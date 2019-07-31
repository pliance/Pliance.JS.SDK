export  interface ResponseT<T> extends Response {
    data: T;
}

export interface Response {
    status: Status;
    checkpoint: string;
}

export enum Status {
    Success = "Success",
    Error = "Error"
}

// Person


// Register Person

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

export interface RegisterPersonOptions {
    Order: Order;
    Fuzziness: Fuzziness;
}

enum Order {
    Any = 0,
    Strict = 1,
    Exact = 2,
}

enum Fuzziness {
    Metaphone = 0,
    Simple = 1,
    Diacritics = 2,
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

// View Person
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

// Search Person
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

// Classify match

export interface ClassifyHitCommand {
    personReferenceId: string;
    matchId: string;        
    aliasId: string;        
    classification: ClassificationType;        
}

export enum ClassificationType {
    Unknown = 'Unknown',
    FalsePositive = 'FalsePositive',
    Match = 'Match',
    Positive = 'Positive',
}

export interface ClassifyHitResponse extends Response {
}

// Archive Person
export interface ArchivePersonCommand {
    personReferenceId: string;
}

export interface ArchivePersonResponse extends Response {
}


export interface DeletePersonCommand {
    personReferenceId: string;
}

export interface DeletePersonResponse extends Response {
}

// Company

// Register Company

export interface RegisterCompanyCommand {
    companyReferenceId: string;
    identity: CompanyIdentity;
    name: string;
}

export interface CompanyIdentity {
    identity: string;
    country: string;
}

export interface RegisterCompanyResponse extends Response {
}

// View Company

export interface ViewCompanyQuery {
    companyReferenceId: string;
}

export interface ViewCompanyResponseData {
    companyReferenceId: string;
    identity: CompanyIdentity;
    name: string;
    graph: Graph;
    beneficiaries: Beneficiary[];
}

export interface Beneficiary {
    nationIdentityNumber: string;
    firstName: string;
    lastName: string;
    isPep: boolean;
    engagements: Engagement[];
}

export interface Engagement {
    registrationNumber: string;
    name: string;
}
export interface Graph {
    nodes: Node[];
    links: Link[];
}

export interface Node {
    id: number;
    name: string;
    type: string;
    reference: string;
    isPep: boolean;
}

export interface Link {
    source: number;
    target: number;
    type: string;
}

export interface ViewCompanyQueryResult extends ResponseT<ViewCompanyResponseData>{
}

// Search Company
export interface CompanySearchQuery {
    page: Page;
    filter: Filter;
    query: string;
}  

export interface CompanySearchQueryResult extends ResponseT<CompanySearchResponseData> {
}

export interface CompanySearchResponseData {
    result: CompanySearchResult[];
}

export interface CompanySearchResult {
    companyReferenceId: string;
    name: TextMatch[];
    isPep: boolean;
    isRca: boolean;
    isSanction: boolean;
    identity: CompanyIdentity;
}

// Delete Company
export interface DeleteCompanyCommand {
    companyReferenceId: string;
}

export interface DeleteCompanyResponse extends Response {
}


export interface ArchiveCompanyCommand {
    companyReferenceId: string;
}

export interface ArchiveCompanyResponse extends Response {
}

export interface DeleteCompanyCommand {
    companyReferenceId: string;
}

export interface DeleteCompanyResponse extends Response {
}
