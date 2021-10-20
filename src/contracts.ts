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
export enum ActivityType {
    Matched = 'Matched',
}

export interface Address {
    city?: string | null;
    country?: string | null;
    postalCode?: string | null;
    street1?: string | null;
    street2?: string | null;
    streetNo?: string | null;
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
    day?: number | null;
    month?: number | null;
    year?: number | null;
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

export interface CompanyData {
    address?: string | null;
    city?: string | null;
    country?: string | null;
    description?: string | null;
    name?: string | null;
    owners?: Owners | null;
    parentCompanyName?: string | null;
    registrationDate?: Date | null;
    ultimateParentCompany?: UltimateCompany | null;
    zipCode?: string | null;
}

export interface CompanyFilter {
    isSanction?: boolean | null;
}

export interface CompanyHit {
    aliasId?: string | null;
    classification?: ClassificationType | null;
    isSanction?: boolean | null;
    matchId?: string | null;
    matchedName?: TextMatch[] | null;
    name?: string | null;
    score?: number | null;
}

export interface CompanyIdentity {
    country?: string | null;
    identity?: string | null;
}

export interface CompanyOwner {
    name?: string | null;
    organizationNumber?: string | null;
    shares?: number | null;
    stake?: number | null;
    votes?: number | null;
}

export interface CompanyReportPost {
    activity?: ActivityType | null;
    companyReferenceId?: string | null;
    date?: Date | null;
    details?: string | null;
    identity?: string | null;
    name?: string | null;
}

export interface CompanyReportQuery {
    companyReferenceId?: string | null;
    from?: Date | null;
    to?: Date | null;
}

export interface CompanyReportQueryResult extends ResponseGeneric<CompanyReportQueryResultData> {
}

export interface CompanyReportQueryResultData {
    result?: CompanyReportPost[] | null;
}

export interface CompanySearchQuery {
    filter?: CompanyFilter | null;
    page?: Page | null;
    query?: string | null;
}

export interface CompanySearchQueryResult extends ResponseGeneric<CompanySearchResponseData> {
}

export interface CompanySearchResponseData {
    result?: CompanySearchResult[] | null;
}

export interface CompanySearchResult {
    archived?: boolean | null;
    companyReferenceId?: string | null;
    identity?: CompanyIdentity | null;
    isPep?: boolean | null;
    isRca?: boolean | null;
    isSanction?: boolean | null;
    name?: TextMatch[] | null;
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
    name?: string | null;
    registrationNumber?: string | null;
}

export interface FeedQuery {
    from?: string | null;
}

export interface FeedQueryItem {
    body?: any | null;
    checkpoint?: string | null;
    metadata?: any | null;
    type?: string | null;
}

export interface FeedQueryResult extends ResponseGeneric<FeedQueryResultData> {
}

export interface FeedQueryResultData {
    items?: FeedQueryItem[] | null;
}

export interface Filter {
    isPep?: boolean | null;
    isRca?: boolean | null;
    isSanction?: boolean | null;
    isSip?: boolean | null;
}

export enum Fuzziness {
    Metaphone = 'Metaphone',
    Simple = 'Simple',
}

export enum Gender {
    Unknown = 'Unknown',
    Male = 'Male',
    Female = 'Female',
}

export interface GeneralReportQuery {
    from?: Date | null;
    to?: Date | null;
}

export interface GeneralReportQueryResult extends ResponseGeneric<GeneralReportQueryResultData> {
}

export interface GeneralReportQueryResultData {
    result?: ReportPost[] | null;
}

export interface LastChanged {
    checkpoint?: string | null;
    timestampUtc?: Date | null;
}

export interface ListAddress {
    city?: string | null;
    country?: string | null;
    postalCode?: string | null;
    street1?: string | null;
    street2?: string | null;
    streetNo?: string | null;
}

export interface ListBirthdate {
    circa?: boolean | null;
    day?: number | null;
    fromYear?: number | null;
    month?: number | null;
    toYear?: number | null;
    type?: BirthMatchType | null;
    year?: number | null;
}

export interface ListCompanyNameViewModel {
    name?: string | null;
    selectedName?: TextMatch[] | null;
    type?: string | null;
}

export interface ListCompanyViewModel {
    isSanction?: boolean | null;
    listId?: string | null;
    names?: ListCompanyNameViewModel[] | null;
    sanctionLists?: string[] | null;
    watchlistSource?: WatchlistSource | null;
}

export interface ListPersonNameViewModel {
    firstName?: string | null;
    lastName?: string | null;
    selectedFirstName?: TextMatch[] | null;
    selectedLastName?: TextMatch[] | null;
    type?: string | null;
}

export interface ListPersonViewModel {
    active?: boolean | null;
    addresses?: ListAddress[] | null;
    birthdates?: ListBirthdate[] | null;
    countries?: string[] | null;
    deceased?: boolean | null;
    gender?: Gender | null;
    images?: string[] | null;
    isPep?: boolean | null;
    isRca?: boolean | null;
    isSanction?: boolean | null;
    isSip?: boolean | null;
    listId?: string | null;
    lists?: string[] | null;
    names?: ListPersonNameViewModel[] | null;
    nationalIdentificationNumber?: string | null;
    nationalities?: string[] | null;
    notes?: string[] | null;
    relations?: ListRelationViewModel[] | null;
    roles?: ListRole[] | null;
    sources?: string[] | null;
    watchlistSource?: WatchlistSource | null;
}

export interface ListRelationViewModel {
    firstName?: string | null;
    isPep?: boolean | null;
    isRca?: boolean | null;
    isSanction?: boolean | null;
    isSip?: boolean | null;
    lastName?: string | null;
    relationPersonId?: string | null;
    relationType?: string | null;
}

export interface ListRole {
    description?: string | null;
    isActive?: boolean | null;
    sinceDay?: string | null;
    sinceMonth?: string | null;
    sinceYear?: string | null;
    toDay?: string | null;
    toMonth?: string | null;
    toYear?: string | null;
}

export enum Order {
    Any = 'Any',
    Strict = 'Strict',
    Exact = 'Exact',
}

export interface Owners {
    companies?: CompanyOwner[] | null;
    persons?: PersonOwner[] | null;
}

export interface Page {
    no?: number | null;
    size?: number | null;
}

export interface PersonDetailsHitModel {
    aliasId?: string | null;
    classification?: ClassificationType | null;
    firstName?: string | null;
    isPep?: boolean | null;
    isRca?: boolean | null;
    isSanction?: boolean | null;
    isSip?: boolean | null;
    lastName?: string | null;
    matchId?: string | null;
    matchedFirstName?: TextMatch[] | null;
    matchedLastName?: TextMatch[] | null;
    referenceId?: string | null;
    score?: number | null;
}

export interface PersonIdentity {
    country?: string | null;
    identity?: string | null;
}

export interface PersonOwner {
    firstName?: string | null;
    lastName?: string | null;
    nationalIdentityNumber?: string | null;
    shares?: number | null;
    stake?: number | null;
    votes?: number | null;
}

export interface PersonReportPost {
    activity?: ActivityType | null;
    date?: Date | null;
    details?: string | null;
    identity?: string | null;
    name?: string | null;
    personReferenceId?: string | null;
}

export interface PersonReportQuery {
    from?: Date | null;
    personReferenceId?: string | null;
    to?: Date | null;
}

export interface PersonReportQueryResult extends ResponseGeneric<PersonReportQueryResultData> {
}

export interface PersonReportQueryResultData {
    result?: PersonReportPost[] | null;
}

export interface PersonSearchQuery {
    filter?: Filter | null;
    page?: Page | null;
    query?: string | null;
}

export interface PersonSearchQueryResult extends ResponseGeneric<PersonSearchResponseData> {
}

export interface PersonSearchResponseData {
    result?: PersonSearchResult[] | null;
}

export interface PersonSearchResult {
    archived?: boolean | null;
    firstName?: TextMatch[] | null;
    identity?: PersonIdentity | null;
    isPep?: boolean | null;
    isRca?: boolean | null;
    isSanction?: boolean | null;
    isSip?: boolean | null;
    lastName?: TextMatch[] | null;
    personReferenceId?: string | null;
}

export interface PingQuery {
}

export interface PingResponse extends Response {
}

export interface RegisterCompanyCommand {
    companyReferenceId: string;
    identity?: CompanyIdentity | null;
    name: string;
    options?: RegisterCompanyOptions | null;
}

export interface RegisterCompanyOptions {
    fuzziness?: Fuzziness | null;
    omitResult?: boolean | null;
    omitUltimateBenefitOwner?: boolean | null;
    order?: Order | null;
    validateCompany?: boolean | null;
}

export interface RegisterCompanyResponse extends ResponseGeneric<ViewCompanyResponseData> {
}

export interface RegisterPersonCommand {
    addresses?: Address[] | null;
    birthdate?: Birthdate | null;
    firstName: string;
    gender?: string | null;
    identity?: PersonIdentity | null;
    lastName: string;
    options?: RegisterPersonOptions | null;
    personReferenceId: string;
}

export interface RegisterPersonOptions {
    fuzziness?: Fuzziness | null;
    omitResult?: boolean | null;
    order?: Order | null;
    pepCountries?: string[] | null;
}

export interface RegisterPersonResponse extends ResponseGeneric<ViewPersonResponseData> {
    hits?: PersonDetailsHitModel[][] | null;
}

export interface ReportPost {
    activity?: ActivityType | null;
    date?: Date | null;
    details?: string | null;
    identity?: string | null;
    name?: string | null;
}

export enum ResponseStatus {
    Success = 'Success',
    Error = 'Error',
}

export interface TextMatch {
    isMatch?: boolean | null;
    text?: string | null;
}

export interface UltimateCompany {
    identity?: string | null;
    isForeign?: boolean | null;
    name?: string | null;
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

export interface ViewCompanyDataQuery {
    identity: string;
}

export interface ViewCompanyDataQueryResult extends ResponseGeneric<CompanyData> {
}

export interface ViewCompanyPersonResponse {
    addresses?: Address[] | null;
    archived?: boolean | null;
    birth?: Birthdate | null;
    birthdate?: string | null;
    engagements?: EngagementModel[] | null;
    firstName?: string | null;
    gender?: Gender | null;
    highRiskCountry?: boolean | null;
    hits?: PersonDetailsHitModel[][] | null;
    identity?: PersonIdentity | null;
    isPep?: boolean | null;
    isRca?: boolean | null;
    isSanction?: boolean | null;
    isSip?: boolean | null;
    lastChanged?: LastChanged | null;
    lastName?: string | null;
    personReferenceId?: string | null;
}

export interface ViewCompanyQuery {
    companyReferenceId: string;
}

export interface ViewCompanyQueryResult extends ResponseGeneric<ViewCompanyResponseData> {
}

export interface ViewCompanyResponseData {
    archived?: boolean | null;
    beneficiaries?: ViewCompanyPersonResponse[] | null;
    companyReferenceId?: string | null;
    corporateForm?: string | null;
    description?: string | null;
    highRiskCountry?: boolean | null;
    hits?: CompanyHit[][] | null;
    identity?: CompanyIdentity | null;
    isSanction?: boolean | null;
    lastChanged?: LastChanged | null;
    name?: string | null;
    registrationDate?: Date | null;
    representatives?: ViewPersonResponseData[] | null;
}

export interface ViewPersonQuery {
    personReferenceId: string;
}

export interface ViewPersonQueryResult extends ResponseGeneric<ViewPersonResponseData> {
}

export interface ViewPersonResponseData {
    addresses?: Address[] | null;
    archived?: boolean | null;
    birth?: Birthdate | null;
    birthdate?: string | null;
    firstName?: string | null;
    gender?: Gender | null;
    highRiskCountry?: boolean | null;
    hits?: PersonDetailsHitModel[][] | null;
    identity?: PersonIdentity | null;
    isPep?: boolean | null;
    isRca?: boolean | null;
    isSanction?: boolean | null;
    isSip?: boolean | null;
    lastChanged?: LastChanged | null;
    lastName?: string | null;
    personReferenceId?: string | null;
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

export interface WatchlistSource {
    filename?: string | null;
    source?: string | null;
    updatedAt?: Date | null;
}

export interface WebhookPokeQuery {
    type?: WebhookPokeType | null;
}

export interface WebhookPokeQueryResult extends Response {
    remoteBody?: string | null;
    remoteStatusCode?: number | null;
}

export enum WebhookPokeType {
    PersonSanctionMatched = 'PersonSanctionMatched',
    PersonSanctionMatchRemoved = 'PersonSanctionMatchRemoved',
    CompanySanctionMatched = 'CompanySanctionMatched',
    CompanySanctionMatchRemoved = 'CompanySanctionMatchRemoved',
}

export interface WebhookQuery {
}

export interface WebhookQueryResult extends ResponseGeneric<WebhookQueryResultData> {
}

export interface WebhookQueryResultData {
    enabled?: boolean | null;
    secret?: string | null;
    url?: string | null;
}

export interface WebhookUpdateCommand {
    enabled?: boolean | null;
    secret?: string | null;
    url?: string | null;
}

export interface WebhookUpdateResponse extends Response {
}

// @inject: !contracts
