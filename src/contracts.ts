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
    companyReferenceId?: string | null;
}

export interface ArchiveCompanyResponse extends Response {
}

export interface ArchivePersonCommand {
    personReferenceId?: string | null;
}

export interface ArchivePersonResponse extends Response {
}

export interface BatchPerson {
    addresses?: Address[] | null;
    birthdate?: Birthdate | null;
    firstName?: string | null;
    gender?: string | null;
    identity?: PersonIdentity | null;
    lastName?: string | null;
    personReferenceId?: string | null;
}

export interface BatchPersonStatus {
    message?: string | null;
    personReferenceId?: string | null;
    status?: ResponseStatus | null;
}

export interface BatchRegisterPersonCommand {
    options?: RegisterPersonOptions | null;
    persons?: BatchPerson[] | null;
}

export interface BatchRegisterPersonResponse extends Response {
    personStatuses?: BatchPersonStatus[] | null;
}

export interface Birthdate {
    day?: number | null;
    month?: number | null;
    year?: number | null;
}

export enum BirthMatchType {
    Date = 'Date',
    Range = 'Range',
}

export interface BoardMember {
    city?: string | null;
    companyIdentityNumber?: string | null;
    countryOfResidence?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    name?: string | null;
    nationalIdentityNumber?: string | null;
    role?: Role | null;
    street?: string | null;
    zipCode?: string | null;
}

export enum ClassificationType {
    Unknown = 'Unknown',
    FalsePositive = 'FalsePositive',
    Match = 'Match',
}

export interface ClassifyCompanyCommand {
    aliasId?: string | null;
    classification?: ClassificationType | null;
    companyReferenceId?: string | null;
    matchId?: string | null;
}

export interface ClassifyCompanyHitCommand {
    aliasId?: string | null;
    classification?: ClassificationType | null;
    companyReferenceId?: string | null;
    matchId?: string | null;
}

export interface ClassifyCompanyHitResponse extends Response {
}

export interface ClassifyCompanyLinkCommand {
    aliasId?: string | null;
    classification?: ClassificationType | null;
    companyReferenceId?: string | null;
    linkId?: string | null;
    matchId?: string | null;
}

export interface ClassifyCompanyLinkResponse extends Response {
}

export interface ClassifyCompanyResponse extends Response {
}

export interface ClassifyPersonHitCommand {
    aliasId?: string | null;
    classification?: ClassificationType | null;
    matchId?: string | null;
    personReferenceId?: string | null;
}

export interface ClassifyPersonHitResponse extends Response {
}

export interface Company {
    identity?: string | null;
    name?: string | null;
}

export interface CompanyData {
    address?: string | null;
    boardmembers?: BoardMember[] | null;
    city?: string | null;
    country?: string | null;
    description?: string | null;
    legalForm?: LegalForm | null;
    legalFormType?: LegalFormType | null;
    listingType?: ListingType | null;
    name?: string | null;
    owners?: Owners | null;
    parentCompany?: Company | null;
    registrationDate?: Date | null;
    signatory?: string | null;
    ultimateParentCompany?: UltimateCompany | null;
    zipCode?: string | null;
}

export interface CompanyFilter {
    isSanction?: boolean | null;
    isSie?: boolean | null;
    isUnclassified?: boolean | null;
}

export interface CompanyHit {
    aliasId?: string | null;
    classification?: ClassificationType | null;
    isSanction?: boolean | null;
    matchedName?: TextMatch[] | null;
    matchId?: string | null;
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
    isSie?: boolean | null;
    name?: TextMatch[] | null;
}

export interface DeleteCompanyCommand {
    companyReferenceId?: string | null;
}

export interface DeleteCompanyResponse extends Response {
}

export interface DeletePersonCommand {
    personReferenceId?: string | null;
}

export interface DeletePersonResponse extends Response {
}

export enum EntityType {
    Unspecified = 'Unspecified',
    Person = 'Person',
    Company = 'Company',
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

export interface LegalForm {
    description?: string | null;
    type?: number | null;
}

export enum LegalFormType {
    LimitedCompany = 'LimitedCompany',
    PrivateBusinessGovControlled = 'PrivateBusinessGovControlled',
    ForeignCompany = 'ForeignCompany',
    Bank = 'Bank',
    SoleProprietorship = 'SoleProprietorship',
    GeneralPartnership = 'GeneralPartnership',
    Society = 'Society',
    Foundation = 'Foundation',
    HousingCompany = 'HousingCompany',
    StateOrCountyCompany = 'StateOrCountyCompany',
    ReligiousOrganisation = 'ReligiousOrganisation',
    InsuranceCompany = 'InsuranceCompany',
    Collaborations = 'Collaborations',
    Other = 'Other',
}

export interface LinkDescriptionModel {
    roles?: Role[] | null;
    type?: LinkType | null;
}

export interface LinkModel {
    birthDate?: Birthdate | null;
    entityType?: EntityType | null;
    firstName?: string | null;
    gender?: Gender | null;
    id?: string | null;
    lastName?: string | null;
    linkDescriptions?: LinkDescriptionModel[] | null;
    matches?: PersonDetailsHitModel[] | null;
    name?: string | null;
    organizationIdentityNumber?: string | null;
    personIdentityNumber?: string | null;
}

export enum LinkType {
    Owner = 'Owner',
    BoardMember = 'BoardMember',
    UltimateBeneficialOwner = 'UltimateBeneficialOwner',
    AlternateBeneficialOwner = 'AlternateBeneficialOwner',
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

export interface ListCompanyCompanies {
    companies?: string[] | null;
}

export interface ListCompanyNameViewModel {
    name?: string | null;
    selectedName?: TextMatch[] | null;
    type?: string | null;
}

export interface ListCompanyQuery {
    page?: Page | null;
}

export interface ListCompanyQueryResult extends ResponseGeneric<ListCompanyCompanies> {
}

export interface ListCompanyViewModel {
    active?: boolean | null;
    addresses?: ListAddress[] | null;
    isSanction?: boolean | null;
    isSie?: boolean | null;
    listId?: string | null;
    names?: ListCompanyNameViewModel[] | null;
    notes?: string[] | null;
    sanctionLists?: string[] | null;
    watchlistSource?: WatchlistSource | null;
}

export enum ListingType {
    Listed = 'Listed',
    Unlisted = 'Unlisted',
}

export interface ListPersonNameViewModel {
    firstName?: string | null;
    lastName?: string | null;
    selectedFirstName?: TextMatch[] | null;
    selectedLastName?: TextMatch[] | null;
    type?: string | null;
}

export interface ListPersonPersons {
    persons?: string[] | null;
}

export interface ListPersonQuery {
    page?: Page | null;
}

export interface ListPersonQueryResult extends ResponseGeneric<ListPersonPersons> {
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
    matchedFirstName?: TextMatch[] | null;
    matchedLastName?: TextMatch[] | null;
    matchId?: string | null;
    referenceId?: string | null;
    score?: number | null;
}

export interface PersonFilter {
    isPep?: boolean | null;
    isRca?: boolean | null;
    isSanction?: boolean | null;
    isSip?: boolean | null;
    isUnclassified?: boolean | null;
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
    filter?: PersonFilter | null;
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
    companyReferenceId?: string | null;
    identity?: CompanyIdentity | null;
    name?: string | null;
    options?: RegisterCompanyOptions | null;
}

export interface RegisterCompanyOptions {
    fuzziness?: Fuzziness | null;
    omitUltimateBenefitOwner?: boolean | null;
    order?: Order | null;
    validateCompany?: boolean | null;
}

export interface RegisterCompanyResponse extends ResponseGeneric<ViewCompanyResponseData> {
}

export interface RegisterCompanyV2Command {
    companyReferenceId?: string | null;
    identity?: CompanyIdentity | null;
    name?: string | null;
    options?: RegisterCompanyOptions | null;
}

export interface RegisterCompanyV2Response extends ResponseGeneric<ViewCompanyV2ResponseData> {
}

export interface RegisterPersonCommand {
    addresses?: Address[] | null;
    birthdate?: Birthdate | null;
    firstName?: string | null;
    gender?: string | null;
    identity?: PersonIdentity | null;
    lastName?: string | null;
    options?: RegisterPersonOptions | null;
    personReferenceId?: string | null;
}

export interface RegisterPersonOptions {
    fuzziness?: Fuzziness | null;
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

export enum Role {
    Chairman = 'Chairman',
    Ceo = 'Ceo',
    BoardMember = 'BoardMember',
    LeadAccountant = 'LeadAccountant',
    AlternateMember = 'AlternateMember',
    ExternalSignatory = 'ExternalSignatory',
    Accountant = 'Accountant',
    ExternalCeo = 'ExternalCeo',
    ExternalDeputyCeo = 'ExternalDeputyCeo',
    SubstituteAccountant = 'SubstituteAccountant',
    NonCertifiedSubstituteAccountant = 'NonCertifiedSubstituteAccountant',
    Liquidator = 'Liquidator',
    SubstituteLiquidator = 'SubstituteLiquidator',
    Procurator = 'Procurator',
    KeyPerson = 'KeyPerson',
    PersonOfNotification = 'PersonOfNotification',
    Owner = 'Owner',
    NonCertifiedAccountant = 'NonCertifiedAccountant',
    DeputyCeo = 'DeputyCeo',
    Actuary = 'Actuary',
    SubstituteChairman = 'SubstituteChairman',
    SubstituteCeo = 'SubstituteCeo',
    Complimentary = 'Complimentary',
    LimitedPartnerOwner = 'LimitedPartnerOwner',
    Director = 'Director',
    Founder = 'Founder',
    Unknown = 'Unknown',
}

export interface Sni {
    classification?: string | null;
    classificationCode?: string | null;
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
    companyReferenceId?: string | null;
}

export interface UnarchiveCompanyResponse extends Response {
}

export interface UnarchivePersonCommand {
    personReferenceId?: string | null;
}

export interface UnarchivePersonResponse extends Response {
}

export interface ViewCompanyDataQuery {
    companyReferenceId?: string | null;
}

export interface ViewCompanyDataQueryResult extends ResponseGeneric<CompanyData> {
}

export interface ViewCompanyPersonResponse {
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

export interface ViewCompanyQuery {
    companyReferenceId?: string | null;
}

export interface ViewCompanyQueryResult extends ResponseGeneric<ViewCompanyResponseData> {
}

export interface ViewCompanyResponseData {
    archived?: boolean | null;
    beneficiaries?: ViewCompanyPersonResponse[] | null;
    companyReferenceId?: string | null;
    highRiskCountry?: boolean | null;
    hits?: CompanyHit[][] | null;
    identity?: CompanyIdentity | null;
    isSanction?: boolean | null;
    isSie?: boolean | null;
    lastChanged?: LastChanged | null;
    name?: string | null;
}

export interface ViewCompanyV2Response extends ResponseGeneric<ViewCompanyV2ResponseData> {
}

export interface ViewCompanyV2ResponseData {
    address?: string | null;
    archived?: boolean | null;
    city?: string | null;
    companyReferenceId?: string | null;
    description?: string | null;
    highRiskCountry?: boolean | null;
    hits?: CompanyHit[][] | null;
    identity?: CompanyIdentity | null;
    isSanction?: boolean | null;
    isSie?: boolean | null;
    lastChanged?: LastChanged | null;
    legalForm?: LegalFormType | null;
    links?: LinkModel[] | null;
    name?: string | null;
    signatory?: string | null;
    sni?: Sni | null;
    zipcode?: string | null;
}

export interface ViewPersonQuery {
    personReferenceId?: string | null;
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
    companyReferenceId?: string | null;
    matchId?: string | null;
}

export interface WatchlistCompanyQueryResult extends ResponseGeneric<ListCompanyViewModel> {
}

export interface WatchlistCompanyV2LinkQuery {
    companyReferenceId?: string | null;
    linkId?: string | null;
    matchId?: string | null;
}

export interface WatchlistCompanyV2Query {
    companyReferenceId?: string | null;
    matchId?: string | null;
}

export interface WatchlistQuery {
    firstName?: string | null;
    id?: string | null;
    lastName?: string | null;
}

export interface WatchlistQueryResult extends ResponseGeneric<ListPersonViewModel> {
}

export interface WatchlistQueryResultV2 extends ResponseGeneric<ListPersonViewModel> {
}

export interface WatchlistQueryV2 {
    matchId?: string | null;
    personReferenceId?: string | null;
}

export interface WatchlistSource {
    filename?: string | null;
    source?: string | null;
    updatedAt?: Date | null;
}

export interface WebhookDeleteCommand {
    id?: string | null;
}

export interface WebhookDeleteResponse extends Response {
}

export interface WebhookDeliveryFailure {
    id?: string | null;
    onCreated?: boolean | null;
    reason?: string | null;
    referenceId?: string | null;
    timestamp?: Date | null;
    type?: string | null;
}

export interface WebhookDeliveryFailuresQuery {
}

export interface WebhookDeliveryFailuresQueryResult extends ResponseGeneric<WebhookDeliveryFailuresQueryResultData> {
}

export interface WebhookDeliveryFailuresQueryResultData {
    items?: WebhookDeliveryFailure[] | null;
}

export interface WebhookPokeQuery {
    referenceId?: string | null;
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
    CompanyNameChanged = 'CompanyNameChanged',
    CompanyDescriptionChanged = 'CompanyDescriptionChanged',
    CompanySignatoryChanged = 'CompanySignatoryChanged',
    CompanyLinkAdded = 'CompanyLinkAdded',
    CompanyLinkRemoved = 'CompanyLinkRemoved',
    CompanyLinkUpdated = 'CompanyLinkUpdated',
    CompanyLinkScreeningMatched = 'CompanyLinkScreeningMatched',
    CompanyLinkScreeningMatchRemoved = 'CompanyLinkScreeningMatchRemoved',
    CompanyLinkScreeningMatchedNameChanged = 'CompanyLinkScreeningMatchedNameChanged',
    CompanyScreeningMatched = 'CompanyScreeningMatched',
    CompanyScreeningMatchRemoved = 'CompanyScreeningMatchRemoved',
    CompanyAddressChanged = 'CompanyAddressChanged',
    CompanySniClassificationChanged = 'CompanySniClassificationChanged',
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
