import { ClientFactory } from '../index';
import { RegisterPersonCommand, Status, PersonSearchQuery, ClassifyHitCommand, ClassificationType, ArchivePersonCommand, DeletePersonCommand, RegisterCompanyCommand,
    CompanySearchQuery, ArchiveCompanyCommand, DeleteCompanyCommand, UnarchivePersonCommand} from '../contracts';
import { Agent } from 'https';
import * as fs from 'fs';

test('Ping', async () => {
    let agent = new Agent({
        pfx: fs.readFileSync('client.pfx'),
        passphrase: ''
    });

    let clientFactory = new ClientFactory('2bb80d537b1da3e38bd30361aa855686bde0eacd7162fef6a25fe97bf527a25b', 'Demo', 'https://adam.pliance.io/', agent);

    let client = clientFactory.create('givenname', 'sub');
    let res = await client.ping();
    expect(res).toEqual(expect.anything());
});

test('Register person', async () => {
    let agent = new Agent({
        pfx: fs.readFileSync('client.pfx'),
        passphrase: ''
    });

    let clientFactory = new ClientFactory('2bb80d537b1da3e38bd30361aa855686bde0eacd7162fef6a25fe97bf527a25b', 'Demo', 'https://adam.pliance.io/', agent);

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

    let clientFactory = new ClientFactory('2bb80d537b1da3e38bd30361aa855686bde0eacd7162fef6a25fe97bf527a25b', 'Demo', 'https://adam.pliance.io/', agent);

    let client = clientFactory.create('givenname', 'sub');

    let res = await client.viewPerson('Pt0yPg5XlGPUDXsQDSe4ZapT_9PyXGo3bqrIVsIY6Jw');

    expect(res.status).toEqual(Status.Success);
    expect(res.data.hits.length).toEqual(1);
});

test('Classify person', async () => {
    let agent = new Agent({
        pfx: fs.readFileSync('client.pfx'),
        passphrase: ''
    });

    let clientFactory = new ClientFactory('2bb80d537b1da3e38bd30361aa855686bde0eacd7162fef6a25fe97bf527a25b', 'Demo', 'https://adam.pliance.io/', agent);

    let client = clientFactory.create('givenname', 'sub');

    let req: ClassifyHitCommand = {
        personReferenceId: 'Pt0yPg5XlGPUDXsQDSe4ZapT_9PyXGo3bqrIVsIY6Jw',
        matchId: 'Bogard-13935',
        aliasId: '55601e25d6c885e8e7c549970315016196bb01c9ff22aa796d81ba5469c87a8c',
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

    let clientFactory = new ClientFactory('2bb80d537b1da3e38bd30361aa855686bde0eacd7162fef6a25fe97bf527a25b', 'Demo', 'https://adam.pliance.io/', agent);

    let client = clientFactory.create('givenname', 'sub');

    let query: PersonSearchQuery = {
        query: 'Ebba Busch',
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
    expect(res.data.result.length).toEqual(1);
});

test('Archive person', async () => {
    let agent = new Agent({
        pfx: fs.readFileSync('client.pfx'),
        passphrase: ''
    });

    let clientFactory = new ClientFactory('2bb80d537b1da3e38bd30361aa855686bde0eacd7162fef6a25fe97bf527a25b', 'Demo', 'https://adam.pliance.io/', agent);
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

    let clientFactory = new ClientFactory('2bb80d537b1da3e38bd30361aa855686bde0eacd7162fef6a25fe97bf527a25b', 'Demo', 'https://adam.pliance.io/', agent);
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

    let clientFactory = new ClientFactory('2bb80d537b1da3e38bd30361aa855686bde0eacd7162fef6a25fe97bf527a25b', 'Demo', 'https://adam.pliance.io/', agent);

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

    let clientFactory = new ClientFactory('2bb80d537b1da3e38bd30361aa855686bde0eacd7162fef6a25fe97bf527a25b', 'DEMO', 'https://adam.pliance.io/', agent);

    let client = clientFactory.create('givenname', 'sub');

    let person: RegisterCompanyCommand = {
        name: 'Plisec',
        companyReferenceId: 'reference-id',
        identity: {
            identity:  '559161-4275',
            country: 'sv' 
        }
    };

    let res = await client.registerCompany(person);

    expect(res.status).toEqual(Status.Success);
});


test('View Company', async () => {
    let clientFactory = new ClientFactory('2bb80d537b1da3e38bd30361aa855686bde0eacd7162fef6a25fe97bf527a25b', 'TEST', 'https://test-stage3.pliance.io/');

    let client = clientFactory.create('givenname', 'sub');

    let res = await client.viewCompany('c');

    expect(res.status).toEqual(Status.Success);
    expect(res.data.beneficiaries).toEqual(1);
});

test('Search Company', async () => {
    let clientFactory = new ClientFactory('2bb80d537b1da3e38bd30361aa855686bde0eacd7162fef6a25fe97bf527a25b', 'TEST', 'https://test-stage3.pliance.io/');

    let client = clientFactory.create('givenname', 'sub');
    let req: CompanySearchQuery = {
        query: 'osama bin',
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
    expect(res.data.result.length).toEqual(1);
});

test('Archive company', async () => {
    let clientFactory = new ClientFactory('2bb80d537b1da3e38bd30361aa855686bde0eacd7162fef6a25fe97bf527a25b', 'TEST', 'https://test-stage3.pliance.io/');

    let client = clientFactory.create('givenname', 'sub');

    let command: ArchiveCompanyCommand = {
        companyReferenceId: 'customer/1'
    };

    let res = await client.archiveCompany(command);

    expect(res.status).toEqual(Status.Success);
});

test('Delete company', async () => {
    let clientFactory = new ClientFactory('2bb80d537b1da3e38bd30361aa855686bde0eacd7162fef6a25fe97bf527a25b', 'TEST', 'https://test-stage3.pliance.io/');

    let client = clientFactory.create('givenname', 'sub');

    let command: DeleteCompanyCommand = {
        companyReferenceId: 'customer/1'
    };

    let res = await client.deleteCompany(command);

    expect(res.status).toEqual(Status.Success);
});
