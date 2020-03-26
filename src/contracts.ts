import { ExecSyncOptionsWithBufferEncoding } from "child_process";

export interface ResponseGeneric<T> extends Response {
    data: T;
}

export interface Response {
    status: Status;
    checkpoint: string;
    success: boolean;
    message: string;
}

export enum Status {
    Success = "Success",
    Error = "Error"
}

// Person

// Register Person

export interface RegisterPersonCommand {
    personReferenceId: string;
    identity?: PersonIdentity;
    firstName: string;
    lastName: string;
    gender?: Gender;
    birthdate?: Birthdate;
    addresses?: Address[];
    options?: RegisterPersonOptions;
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
    order: Order;
    fuzziness: Fuzziness;
}

export interface RegisterCompanyOptions {
    order: Order;
    fuzziness: Fuzziness;
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

export interface PersonHit {
    matchId: string;
    aliasId: string;
    matchedFirstName: TextMatch[];
    matchedLastName: TextMatch[];
    isPep: boolean;
    isRca: boolean;
    isSanction: boolean;
    firstName: string;
    lastName: string;
    classification: ClassificationType;
}

export interface RegisterPersonResponse extends ResponseGeneric<ViewPersonResponseData> {
    hits: PersonHit[][];
}

export class PersonIdentity {
    constructor(public identity: string, public country: string) {
    }
}

// View Person
export interface ViewPersonQueryResult extends ResponseGeneric<ViewPersonResponseData> {
}

export interface ViewPersonResponseData {
    personReferenceId: string;
    identity: PersonIdentity;
    firstName: string;
    lastName: string;
    birthdate: string;
    addresses: Address[];
    hits: PersonHit[][];
    gender: Gender;
    archived: boolean;
    IsPep: boolean;
    IsRca: boolean;
    IsSanction: boolean;
    Birth: Birthdate;
    highRiskCountry: boolean;
    lastChanged: LastChanged;
}

export interface LastChanged {
    timestampUtc: Date;
    checkpoint: string;
}

export enum Gender {
    Unknown = 0,
    Male = 1,
    Female = 2
}

// Search Person
export interface PersonSearchQuery {
    page?: Page;
    filter?: Filter;
    query?: string;
}

export interface Page {
    size?: number;
    no?: number;
}

export interface Filter {
    isPep?: boolean;
    isRca?: boolean;
    isSanction?: boolean;
}

export interface PingResponse extends Response {
    message: string;
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

export interface PersonSearchQueryResult extends ResponseGeneric<PersonSearchResponseData> {
}

// Classify match

export interface ClassifyPersonHitCommand {
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

export interface UnarchivePersonCommand {
    personReferenceId: string;
}

export interface UnarchivePersonResponse extends Response {
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
    options?: RegisterCompanyOptions;
}

export interface CompanyIdentity {
    identity: string;
    country: string;
}

export interface RegisterCompanyResponse extends ResponseGeneric<ViewCompanyResponseData> {
}

// View Company

export interface ViewCompanyResponseData {
	companyReferenceId : string;
	identity: CompanyIdentity;
	name: string;
	beneficiaries: ViewPersonResponseData[];
	archived: boolean;
	highRiskCountry: boolean;
	hits: CompanyHit[][];
	lastChanged: LastChanged;
	isSanction: boolean;
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

export interface CompanyHit {
	matchId: string;
	aliasId: string;
	isSanction: boolean;
	classification: ClassificationType;
	name: string;
	matchedName: TextMatch[];
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

export interface ViewCompanyQueryResult extends ResponseGeneric<ViewCompanyResponseData> {
}

// Search Company
export interface CompanySearchQuery {
    page?: Page;
    filter?: Filter;
    query?: string;
}

export interface CompanySearchQueryResult extends ResponseGeneric<CompanySearchResponseData> {
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
    archived: boolean;
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

export interface UnarchiveCompanyCommand {
    companyReferenceId: string;
}

export interface UnarchiveCompanyResponse extends Response {
}

export interface DeleteCompanyCommand {
    companyReferenceId: string;
}

export interface DeleteCompanyResponse extends Response {
}

export interface ClassifyCompanyHitCommand {
    companyReferenceId: string;
    matchId: string;
    aliasId: string;
    classification: ClassificationType;
}

export interface ClassifyCompanyHitResponse extends Response {
}

