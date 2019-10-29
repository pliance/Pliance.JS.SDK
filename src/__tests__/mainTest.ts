import { ClientFactory } from '../index';
import { RegisterPersonCommand, Status, PersonSearchQuery, ClassifyHitCommand, ClassificationType, ArchivePersonCommand, DeletePersonCommand, RegisterCompanyCommand,
    CompanySearchQuery, ArchiveCompanyCommand, DeleteCompanyCommand, UnarchivePersonCommand, UnarchiveCompanyCommand} from '../contracts';
import { Agent } from 'https';
import * as fs from 'fs';

test('Ping', async () => {
    let agent = new Agent({
        pfx: fs.readFileSync('client.pfx'),
        passphrase: ''
    });

    let clientFactory = new ClientFactory('2bb80d537b1da3e38bd30361aa855686bde0eacd7162fef6a25fe97bf527a25b', 'Demo', 'https://secure.pliance.io/', agent);

    let client = clientFactory.create('givenname', 'sub');
    let res = await client.ping();
    expect(res).toEqual(expect.anything());
});

test('Register person', async () => {
    let agent = new Agent({
        pfx: fs.readFileSync('client.pfx'),
        passphrase: ''
    });

    let clientFactory = new ClientFactory('2bb80d537b1da3e38bd30361aa855686bde0eacd7162fef6a25fe97bf527a25b', 'Demo', 'https://secure.pliance.io/', agent);

    let client = clientFactory.create('givenname', 'sub');

    let person: RegisterPersonCommand = {
        firstName: 'Osama',
        lastName: 'bin laden',
        personReferenceId: 'reference-id'
    };

    let res = await client.registerPerson(person);

    expect(res.status).toEqual(Status.Success);
    expect(res.hits.length).toEqual(1);
});

test('View person', async () => {
    let agent = new Agent({
        pfx: fs.readFileSync('client.pfx'),
        passphrase: ''
    });

    let clientFactory = new ClientFactory('2bb80d537b1da3e38bd30361aa855686bde0eacd7162fef6a25fe97bf527a25b', 'Demo', 'https://secure.pliance.io/', agent);

    let client = clientFactory.create('givenname', 'sub');

    let res = await client.viewPerson('reference-id');

    expect(res.status).toEqual(Status.Success);
    expect(res.data.hits.length).toEqual(1);
});

test('Classify person', async () => {
    let agent = new Agent({
        pfx: fs.readFileSync('client.pfx'),
        passphrase: ''
    });

    let clientFactory = new ClientFactory('2bb80d537b1da3e38bd30361aa855686bde0eacd7162fef6a25fe97bf527a25b', 'Demo', 'https://secure.pliance.io/', agent);

    let client = clientFactory.create('givenname', 'sub');

    let req: ClassifyHitCommand = {
        personReferenceId: 'reference-id',
        matchId: 'EuSanction-833',
        aliasId: 'a1be37af314c0cc35c5f9f4124f5f6aa0c050fbe5846e020ae17c0fe02c8c55e',
        classification: ClassificationType.FalsePositive
    };

    let res = await client.classifyPersonHit(req);

    expect(res.status).toEqual(Status.Success);
});

test('Search person', async () => {
    let agent = new Agent({
        pfx: fs.readFileSync('client.pfx'),
        passphrase: ''
    });

    let clientFactory = new ClientFactory('2bb80d537b1da3e38bd30361aa855686bde0eacd7162fef6a25fe97bf527a25b', 'Demo', 'https://secure.pliance.io/', agent);

    let client = clientFactory.create('givenname', 'sub');

    let query: PersonSearchQuery = {
        query: 'Osama bin',
        page: {
            size: 10,
            no: 1
        },
        filter: {
            isSanction: true,
            isPep: null,
            isRca: null
        }
    };

    let res = await client.searchPerson(query);

    expect(res.status).toEqual(Status.Success);
    expect(res.data.result.length).toBeGreaterThan(0);
});

test('Archive person', async () => {
    let agent = new Agent({
        pfx: fs.readFileSync('client.pfx'),
        passphrase: ''
    });

    let clientFactory = new ClientFactory('2bb80d537b1da3e38bd30361aa855686bde0eacd7162fef6a25fe97bf527a25b', 'Demo', 'https://secure.pliance.io/', agent);
    let client = clientFactory.create('givenname', 'sub');

    let command: ArchivePersonCommand = {
        personReferenceId: 'reference-id'
    };

    let res = await client.archivePerson(command);

    expect(res.status).toEqual(Status.Success);
});

test('Unarchive person', async () => {
    let agent = new Agent({
        pfx: fs.readFileSync('client.pfx'),
        passphrase: ''
    });

    let clientFactory = new ClientFactory('2bb80d537b1da3e38bd30361aa855686bde0eacd7162fef6a25fe97bf527a25b', 'Demo', 'https://secure.pliance.io/', agent);
    let client = clientFactory.create('givenname', 'sub');

    let command: UnarchivePersonCommand = {
        personReferenceId: 'reference-id'
    };

    let res = await client.unarchivePerson(command);

    expect(res.status).toEqual(Status.Success);
});

test('Delete person', async () => {
    let agent = new Agent({
        pfx: fs.readFileSync('client.pfx'),
        passphrase: ''
    });

    let clientFactory = new ClientFactory('2bb80d537b1da3e38bd30361aa855686bde0eacd7162fef6a25fe97bf527a25b', 'Demo', 'https://secure.pliance.io/', agent);

    let client = clientFactory.create('givenname', 'sub');

    let command: DeletePersonCommand = {
        personReferenceId: 'reference-id'
    };

    let res = await client.deletePerson(command);

    expect(res.status).toEqual(Status.Success);
});

test('Register company', async () => {
    let agent = new Agent({
        pfx: fs.readFileSync('client.pfx'),
        passphrase: ''
    });

    let clientFactory = new ClientFactory('2bb80d537b1da3e38bd30361aa855686bde0eacd7162fef6a25fe97bf527a25b', 'Demo', 'https://secure.pliance.io/', agent);

    let client = clientFactory.create('givenname', 'sub');

    let person: RegisterCompanyCommand = {
        name: 'Plisec',
        companyReferenceId: 'comp-reference-id',
        identity: {
            identity:  '559161-4275',
            country: 'sv' 
        }
    };

    let res = await client.registerCompany(person);

    expect(res.status).toEqual(Status.Success);
});


test('View Company', async () => {
    let agent = new Agent({
        pfx: fs.readFileSync('client.pfx'),
        passphrase: ''
    });

    let clientFactory = new ClientFactory('2bb80d537b1da3e38bd30361aa855686bde0eacd7162fef6a25fe97bf527a25b', 'Demo', 'https://secure.pliance.io/', agent);

    let client = clientFactory.create('givenname', 'sub');

    let res = await client.viewCompany('comp-reference-id');

    expect(res.status).toEqual(Status.Success);
});

test('Search Company', async () => {
    let agent = new Agent({
        pfx: fs.readFileSync('client.pfx'),
        passphrase: ''
    });

    let clientFactory = new ClientFactory('2bb80d537b1da3e38bd30361aa855686bde0eacd7162fef6a25fe97bf527a25b', 'Demo', 'https://secure.pliance.io/', agent);

    let client = clientFactory.create('givenname', 'sub');
    let req: CompanySearchQuery = {
        query: 'Plisec',
        page: {
            size: 10,
            no: 1
        },
        filter: {
            isSanction: true,
            isPep: null,
            isRca: null
        }
    };

    let res = await client.searchCompany(req);

    expect(res.status).toEqual(Status.Success);
    expect(res.data.result.length).toBeGreaterThan(0);
});

test('Archive company', async () => {
    let agent = new Agent({
        pfx: fs.readFileSync('client.pfx'),
        passphrase: ''
    });

    let clientFactory = new ClientFactory('2bb80d537b1da3e38bd30361aa855686bde0eacd7162fef6a25fe97bf527a25b', 'Demo', 'https://secure.pliance.io/', agent);

    let client = clientFactory.create('givenname', 'sub');

    let command: ArchiveCompanyCommand = {
        companyReferenceId: 'comp-reference-id'
    };

    let res = await client.archiveCompany(command);

    expect(res.status).toEqual(Status.Success);
});

test('Unarchive company', async () => {
    let agent = new Agent({
        pfx: fs.readFileSync('client.pfx'),
        passphrase: ''
    });

    let clientFactory = new ClientFactory('2bb80d537b1da3e38bd30361aa855686bde0eacd7162fef6a25fe97bf527a25b', 'Demo', 'https://secure.pliance.io/', agent);

    let client = clientFactory.create('givenname', 'sub');

    let command: UnarchiveCompanyCommand = {
        companyReferenceId: 'comp-reference-id'
    };

    let res = await client.unarchiveCompany(command);

    expect(res.status).toEqual(Status.Success);
});

test('Delete company', async () => {
    let agent = new Agent({
        pfx: fs.readFileSync('client.pfx'),
        passphrase: ''
    });

    let clientFactory = new ClientFactory('2bb80d537b1da3e38bd30361aa855686bde0eacd7162fef6a25fe97bf527a25b', 'Demo', 'https://secure.pliance.io/', agent);

    let client = clientFactory.create('givenname', 'sub');

    let command: DeleteCompanyCommand = {
        companyReferenceId: 'comp-reference-id'
    };

    let res = await client.deleteCompany(command);

    expect(res.status).toEqual(Status.Success);
});
