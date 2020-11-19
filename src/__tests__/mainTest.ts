import { ClientFactory, IPlianceClient } from '../index';
import {
    RegisterPersonCommand, ResponseStatus, PersonSearchQuery, ClassifyPersonHitCommand, ClassificationType, ArchivePersonCommand, DeletePersonCommand, RegisterCompanyCommand,
    CompanySearchQuery, ViewCompanyQuery, ArchiveCompanyCommand, DeleteCompanyCommand, UnarchivePersonCommand, UnarchiveCompanyCommand, PingQuery, ViewPersonQuery, RegisterPersonResponse,
    ArchivePersonResponse,
    WatchlistQueryV2,
    WatchlistQuery,
    FeedQuery,
    WebhookUpdateCommand,
    WebhookQuery,
    RegisterCompanyResponse,
    ArchiveCompanyResponse,
    ClassifyCompanyHitCommand,
    WatchlistCompanyQuery
} from '../contracts';
import { Agent } from 'https';
import * as fs from 'fs';

function createFactory(): ClientFactory {
    let agent = new Agent({
        pfx: fs.readFileSync('client.pfx'),
        passphrase: '',
    });

    return new ClientFactory('2bb80d537b1da3e38bd30361aa855686bde0eacd7162fef6a25fe97bf527a25b', 'Demo', 'https://local.pliance.io/', agent);
};

function createClient(): IPlianceClient {
    let factory = createFactory();

    return factory.create('givenname', 'sub');
}

function random(): string {
    return Math.random().toString(36).replace(/[^a-z]+/g, '');
}

async function assertThrows(func: () => void) {
    try {
        await func();
        throw "Exception wasn't thrown";
    } catch (error) {
    }
}

async function createPerson(client: IPlianceClient, id: string): Promise<RegisterPersonResponse> {
    let command = <RegisterPersonCommand>{
        firstName: 'Osama',
        lastName: 'bin Laden',
        personReferenceId: id,
    };

    return await client.registerPerson(command);
}

async function archivePerson(client: IPlianceClient, id: string): Promise<ArchivePersonResponse> {
    let command = <ArchivePersonCommand>{
        personReferenceId: id,
    };

    return await client.archivePerson(command);
}

async function createCompany(client: IPlianceClient, id: string): Promise<RegisterCompanyResponse> {
    let command = <RegisterCompanyCommand>{
        name: 'Korea Daesong Bank',
        companyReferenceId: id,
    };

    return await client.registerCompany(command);
}

async function archiveCompany(client: IPlianceClient, id: string): Promise<ArchiveCompanyResponse> {
    let command = <ArchiveCompanyCommand>{
        companyReferenceId: id,
    };

    return await client.archiveCompany(command);
}

test('Bad Request', async () => {
    let client = createClient();
    let query = <ViewPersonQuery>
        {
            personReferenceId: random(),
        };

    await assertThrows(async () => await client.viewPerson(query));
});

test('Ping', async () => {
    let client = createClient();
    let query = <PingQuery>{};
    let res = await client.ping(query);

    expect(res).toEqual(expect.anything());
});

test('Ping No Cert', async () => {
    let factory = new ClientFactory('2bb80d537b1da3e38bd30361aa855686bde0eacd7162fef6a25fe97bf527a25b', 'Demo', 'https://local-no-cert.pliance.io/', undefined);
    let client = factory.create('givenname', 'sub')
    let query = <PingQuery>{};
    let res = await client.ping(query);

    expect(res).toEqual(expect.anything());
});

test('Register person', async () => {
    let client = createClient();
    let id = random();
    let res = await createPerson(client, id);

    expect(res.success).toEqual(true);
});

test('Archive person', async () => {
    let client = createClient();
    let id = random();

    await createPerson(client, id);
    let res = await archivePerson(client, id);

    expect(res.success).toEqual(true);
});

test('Unarchive person', async () => {
    let client = createClient();
    let id = random();

    await createPerson(client, id);
    await archivePerson(client, id);
    let command = <UnarchivePersonCommand>{
        personReferenceId: id,
    };

    let res = await client.unarchivePerson(command);

    expect(res.success).toEqual(true);
});

test('Delete person', async () => {
    let client = createClient();
    let id = random();

    await createPerson(client, id);
    let command = <DeletePersonCommand>{
        personReferenceId: id,
    };

    let res = await client.deletePerson(command);

    expect(res.success).toEqual(true);
});

test('View person', async () => {
    let client = createClient();
    let id = random();

    await createPerson(client, id);
    let command = <ViewPersonQuery>{
        personReferenceId: id,
    };

    let res = await client.viewPerson(command);

    expect(res.success).toEqual(true);
});

test('Search person', async () => {
    let client = createClient();
    let id = random();

    await createPerson(client, id);
    let command = <PersonSearchQuery>{
        query: 'Osama',
    };

    let res = await client.searchPerson(command);

    expect(res.success).toEqual(true);
});

test('Classify person', async () => {
    let client = createClient();
    let id = random();
    let person = await createPerson(client, id);
    let match = person.data.hits[0][0];
    let command = <ClassifyPersonHitCommand>{
        personReferenceId: id,
        aliasId: match.aliasId,
        matchId: match.matchId,
        classification: ClassificationType.FalsePositive,
    };

    let res = await client.classifyPersonHit(command);

    expect(res.success).toEqual(true);
});

test('Watchlist person V1', async () => {
    let client = createClient();
    let id = random();

    let person = await createPerson(client, id);
    let match = person.data.hits[0][0];
    let command = <WatchlistQuery>{
        id: match.matchId,
        firstName: "Osama",
        lastName: "bin Laden",
    };

    let res = await client.watchlistPerson(command);

    expect(res.success).toEqual(true);
});

test('Watchlist person V2', async () => {
    let client = createClient();
    let id = random();

    let person = await createPerson(client, id);
    let match = person.data.hits[0][0];
    let command = <WatchlistQueryV2>{
        matchId: match.matchId,
        personReferenceId: id,
    };

    let res = await client.watchlistPersonV2(command);

    expect(res.success).toEqual(true);
});

test('Feed', async () => {
    let client = createClient();
    let command = <FeedQuery>{};

    let res = await client.feed(command);

    expect(res.success).toEqual(true);
});

test('Save Webhook', async () => {
    let client = createClient();
    let command = <WebhookUpdateCommand>{
        enabled: true,
        url: "https://url",
        secret: "secret",
    };

    let res = await client.saveWebhook(command);

    expect(res.success).toEqual(true);
});

test('Get Webhook', async () => {
    let client = createClient();
    let command = <WebhookQuery>{
    };

    let res = await client.getWebhook(command);

    expect(res.success).toEqual(true);
});

test('Register company', async () => {
    let client = createClient();
    let id = random();
    let res = await createCompany(client, id);

    expect(res.success).toEqual(true);
});

test('Archive company', async () => {
    let client = createClient();
    let id = random();

    await createCompany(client, id);
    let res = await archiveCompany(client, id);

    expect(res.success).toEqual(true);
});

test('Unarchive company', async () => {
    let client = createClient();
    let id = random();

    await createCompany(client, id);
    await archiveCompany(client, id);
    let command = <UnarchiveCompanyCommand>{
        companyReferenceId: id,
    };

    let res = await client.unarchiveCompany(command);

    expect(res.success).toEqual(true);
});

test('Delete company', async () => {
    let client = createClient();
    let id = random();

    await createCompany(client, id);
    let command = <DeleteCompanyCommand>{
        companyReferenceId: id,
    };

    let res = await client.deleteCompany(command);

    expect(res.success).toEqual(true);
});

test('View company', async () => {
    let client = createClient();
    let id = random();

    await createCompany(client, id);
    let command = <ViewCompanyQuery>{
        companyReferenceId: id,
    };

    let res = await client.viewCompany(command);

    expect(res.success).toEqual(true);
});

test('Search company', async () => {
    let client = createClient();
    let id = random();

    await createCompany(client, id);
    let command = <CompanySearchQuery>{
        query: 'Daesong',
    };

    let res = await client.searchCompany(command);

    expect(res.success).toEqual(true);
});

test('Classify company', async () => {
    let client = createClient();
    let id = random();

    let company = await createCompany(client, id);
    let match = company.data.hits[0][0];
    let command = <ClassifyCompanyHitCommand>{
        companyReferenceId: id,
        aliasId: match.aliasId,
        matchId: match.matchId,
        classification: ClassificationType.FalsePositive,
    };

    let res = await client.classifyCompanyHit(command);

    expect(res.success).toEqual(true);
});

test('Watchlist company', async () => {
    let client = createClient();
    let id = random();
    let company = await createCompany(client, id);
    let match = company.data.hits[0][0];
    let command = <WatchlistCompanyQuery>{
		matchId: match.matchId,
		companyReferenceId: id,
    };

    let res = await client.watchlistCompany(command);

    expect(res.success).toEqual(true);
});