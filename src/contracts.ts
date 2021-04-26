export interface Response {
    status: ResponseStatus;
    checkpoint: string;
    success: boolean;
    message: string;
}

export interface ResponseGeneric<T> extends Response {
    data: T;
}

// @inject: contracts
export interface Address {
    city: string;
    country: string;
    postalCode: string;
    street1: string;
    street2: string;
    streetNo: string;
}

export interface ArchiveCompanyCommand {
    companyReferenceId: string;
}

export interface ArchiveCompanyResponse extends Response {
}

export interface ArchivePersonCommand {
    personReferenceId: string;
}

export interface ArchivePersonResponse extends Response {
}

export enum BirthMatchType {
    Date = 'Date',
    Range = 'Range',
}

export interface Birthdate {
    day?: number;
    month?: number;
    year?: number;
}

export enum ClassificationType {
    Unknown = 'Unknown',
    FalsePositive = 'FalsePositive',
    Match = 'Match',
}

export interface ClassifyCompanyHitCommand {
    aliasId: string;
    classification: ClassificationType;
    companyReferenceId: string;
    matchId: string;
}

export interface ClassifyCompanyHitResponse extends Response {
}

export interface ClassifyPersonHitCommand {
    aliasId: string;
    classification: ClassificationType;
    matchId: string;
    personReferenceId: string;
}

export interface ClassifyPersonHitResponse extends Response {
}

export interface CompanyFilter {
    isSanction?: boolean;
}

export interface CompanyHit {
    aliasId: string;
    classification: ClassificationType;
    isSanction: boolean;
    matchId: string;
    matchedName: TextMatch[];
    name: string;
    score: number;
}

export interface CompanyIdentity {
    country: string;
    identity: string;
}

export interface CompanyReportPost {
    activity: string;
    companyReferenceId: string;
    date: Date;
    details: string;
    identity: string;
    name: string;
}

export interface CompanyReportQuery {
    companyReferenceId: string;
    from?: Date;
    to?: Date;
}

export interface CompanyReportQueryResult extends ResponseGeneric<CompanyReportQueryResultData> {
}

export interface CompanyReportQueryResultData {
    result: CompanyReportPost[];
}

export interface CompanySearchQuery {
    filter: CompanyFilter;
    page: Page;
    query: string;
}

export interface CompanySearchQueryResult extends ResponseGeneric<CompanySearchResponseData> {
}

export interface CompanySearchResponseData {
    result: CompanySearchResult[];
}

export interface CompanySearchResult {
    archived: boolean;
    companyReferenceId: string;
    identity: CompanyIdentity;
    isPep: boolean;
    isRca: boolean;
    isSanction: boolean;
    name: TextMatch[];
}

export interface DeleteCompanyCommand {
    companyReferenceId: string;
}

export interface DeleteCompanyResponse extends Response {
}

export interface DeletePersonCommand {
    personReferenceId: string;
}

export interface DeletePersonResponse extends Response {
}

export interface EngagementModel {
    name: string;
    registrationNumber: string;
}

export interface FeedQuery {
    from: string;
}

export interface FeedQueryItem {
    body: any;
    checkpoint: string;
    metadata: any;
    type: string;
}

export interface FeedQueryResult extends ResponseGeneric<FeedQueryResultData> {
}

export interface FeedQueryResultData {
    items: FeedQueryItem[];
}

export interface Filter {
    isPep?: boolean;
    isRca?: boolean;
    isSanction?: boolean;
}

export enum Fuzziness {
    Metaphone = 'Metaphone',
    Simple = 'Simple',
    Metaphone3 = 'Metaphone3',
}

export enum Gender {
    Unknown = 'Unknown',
    Male = 'Male',
    Female = 'Female',
}

export interface GeneralReportQuery {
    from?: Date;
    to?: Date;
}

export interface GeneralReportQueryResult extends ResponseGeneric<GeneralReportQueryResultData> {
}

export interface GeneralReportQueryResultData {
    result: ReportPost[];
}

export interface LastChanged {
    checkpoint: string;
    timestampUtc: Date;
}

export interface ListAddress {
    city: string;
    country: string;
    postalCode: string;
    street1: string;
    street2: string;
    streetNo: string;
}

export interface ListBirthdate {
    circa: boolean;
    day?: number;
    fromYear?: number;
    month?: number;
    toYear?: number;
    type: BirthMatchType;
    year?: number;
}

export interface ListCompanyNameViewModel {
    name: string;
    selectedName: TextMatch[];
    type: string;
}

export interface ListCompanyViewModel {
    isSanction: boolean;
    listId: string;
    names: ListCompanyNameViewModel[];
    sanctionLists: string[];
}

export interface ListPersonNameViewModel {
    firstName: string;
    lastName: string;
    selectedFirstName: TextMatch[];
    selectedLastName: TextMatch[];
    type: string;
}

export interface ListPersonViewModel {
    active: boolean;
    addresses: ListAddress[];
    birthdates: ListBirthdate[];
    countries: string[];
    deceased: boolean;
    gender: Gender;
    images: string[];
    isPep: boolean;
    isRca: boolean;
    isSanction: boolean;
    listId: string;
    lists: string[];
    names: ListPersonNameViewModel[];
    nationalIdentificationNumber: string;
    nationalities: string[];
    relations: ListRelationViewModel[];
    roles: ListRole[];
}

export interface ListRelationViewModel {
    firstName: string;
    isPep: boolean;
    isRca: boolean;
    isSanction: boolean;
    lastName: string;
    relationPersonId: string;
    relationType: string;
}

export interface ListRole {
    description: string;
    isActive: boolean;
    sinceDay: string;
    sinceMonth: string;
    sinceYear: string;
    toDay: string;
    toMonth: string;
    toYear: string;
}

export enum Order {
    Any = 'Any',
    Strict = 'Strict',
    Exact = 'Exact',
}

export interface Page {
    no?: number;
    size?: number;
}

export interface PersonDetailsHitModel {
    aliasId: string;
    classification: ClassificationType;
    firstName: string;
    isPep: boolean;
    isRca: boolean;
    isSanction: boolean;
    lastName: string;
    matchId: string;
    matchedFirstName: TextMatch[];
    matchedLastName: TextMatch[];
    referenceId: string;
    score: number;
}

export interface PersonIdentity {
    country: string;
    identity: string;
}

export interface PersonReportPost {
    activity: string;
    date: Date;
    details: string;
    identity: string;
    name: string;
    personReferenceId: string;
}

export interface PersonReportQuery {
    from?: Date;
    personReferenceId: string;
    to?: Date;
}

export interface PersonReportQueryResult extends ResponseGeneric<PersonReportQueryResultData> {
}

export interface PersonReportQueryResultData {
    result: PersonReportPost[];
}

export interface PersonSearchQuery {
    filter: Filter;
    page: Page;
    query: string;
}

export interface PersonSearchQueryResult extends ResponseGeneric<PersonSearchResponseData> {
}

export interface PersonSearchResponseData {
    result: PersonSearchResult[];
}

export interface PersonSearchResult {
    archived: boolean;
    firstName: TextMatch[];
    identity: PersonIdentity;
    isPep: boolean;
    isRca: boolean;
    isSanction: boolean;
    lastName: TextMatch[];
    personReferenceId: string;
}

export interface PingQuery {
}

export interface PingResponse extends Response {
}

export interface RegisterCompanyCommand {
    companyReferenceId: string;
    identity: CompanyIdentity;
    name: string;
    options: RegisterCompanyOptions;
}

export interface RegisterCompanyOptions {
    fuzziness: Fuzziness;
    omitResult: boolean;
    omitUbo: boolean;
    order: Order;
}

export interface RegisterCompanyResponse extends ResponseGeneric<ViewCompanyResponseData> {
}

export interface RegisterPersonCommand {
    addresses: Address[];
    birthdate: Birthdate;
    firstName: string;
    gender: string;
    identity: PersonIdentity;
    lastName: string;
    options: RegisterPersonOptions;
    personReferenceId: string;
}

export interface RegisterPersonOptions {
    fuzziness: Fuzziness;
    omitResult: boolean;
    order: Order;
    pepCountries: string[];
}

export interface RegisterPersonResponse extends ResponseGeneric<ViewPersonResponseData> {
    hits: PersonDetailsHitModel[][];
}

export interface ReportPost {
    activity: string;
    date: Date;
    details: string;
    identity: string;
    name: string;
}

export enum ResponseStatus {
    Success = 'Success',
    Error = 'Error',
}

export interface TextMatch {
    isMatch: boolean;
    text: string;
}

export interface UnarchiveCompanyCommand {
    companyReferenceId: string;
}

export interface UnarchiveCompanyResponse extends Response {
}

export interface UnarchivePersonCommand {
    personReferenceId: string;
}

export interface UnarchivePersonResponse extends Response {
}

export interface ViewCompanyQuery {
    companyReferenceId: string;
}

export interface ViewCompanyQueryResult extends ResponseGeneric<ViewCompanyResponseData> {
}

export interface ViewCompanyResponseData {
    archived: boolean;
    beneficiaries: ViewPersonResponseData[];
    companyReferenceId: string;
    corporateForm: string;
    description: string;
    highRiskCountry: boolean;
    hits: CompanyHit[][];
    identity: CompanyIdentity;
    isSanction: boolean;
    lastChanged: LastChanged;
    name: string;
    registrationDate?: Date;
    representatives: ViewPersonResponseData[];
}

export interface ViewPersonQuery {
    personReferenceId: string;
}

export interface ViewPersonQueryResult extends ResponseGeneric<ViewPersonResponseData> {
}

export interface ViewPersonResponseData {
    addresses: Address[];
    archived: boolean;
    birth: Birthdate;
    birthdate: string;
    engagements: EngagementModel[];
    firstName: string;
    gender: Gender;
    highRiskCountry: boolean;
    hits: PersonDetailsHitModel[][];
    identity: PersonIdentity;
    isPep: boolean;
    isRca: boolean;
    isSanction: boolean;
    lastChanged: LastChanged;
    lastName: string;
    personReferenceId: string;
}

export interface WatchlistCompanyQuery {
    companyReferenceId: string;
    matchId: string;
}

export interface WatchlistCompanyQueryResult extends ResponseGeneric<ListCompanyViewModel> {
}

export interface WatchlistQuery {
    firstName: string;
    id: string;
    lastName: string;
}

export interface WatchlistQueryResult extends ResponseGeneric<ListPersonViewModel> {
}

export interface WatchlistQueryResultV2 extends ResponseGeneric<ListPersonViewModel> {
}

export interface WatchlistQueryV2 {
    matchId: string;
    personReferenceId: string;
}

export interface WebhookQuery {
}

export interface WebhookQueryResult extends ResponseGeneric<WebhookQueryResultData> {
}

export interface WebhookQueryResultData {
    enabled: boolean;
    secret: string;
    url: string;
}

export interface WebhookUpdateCommand {
    enabled: boolean;
    secret: string;
    url: string;
}

export interface WebhookUpdateResponse extends Response {
}

// @inject: !contracts
