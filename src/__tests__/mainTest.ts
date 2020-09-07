import { ClientFactory, IPlianceClient } from '../index';
import {
    RegisterPersonCommand, ResponseStatus, PersonSearchQuery, ClassifyPersonHitCommand, ClassificationType, ArchivePersonCommand, DeletePersonCommand, RegisterCompanyCommand,
    CompanySearchQuery, ViewCompanyQuery, ArchiveCompanyCommand, DeleteCompanyCommand, UnarchivePersonCommand, UnarchiveCompanyCommand, PingQuery, ViewPersonQuery, RegisterPersonResponse,
    ArchivePersonResponse
} from '../contracts';
import { Agent } from 'https';
import * as fs from 'fs';

function createFactory(): ClientFactory {
    let agent = new Agent({
        pfx: fs.readFileSync('client.pfx'),
        passphrase: '',
        // ca: [fs.readFileSync('fullchain.crt')]
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

async function createPerson(client: IPlianceClient, id: string): Promise<RegisterPersonResponse>
{
    let command = <RegisterPersonCommand>{
        firstName: 'Osama',
        lastName: 'bin Laden',
        personReferenceId: id,
    };

    return await client.registerPerson(command);
}

async function archivePerson(client: IPlianceClient, id: string): Promise<ArchivePersonResponse>
{
    let command = <ArchivePersonCommand>{
        personReferenceId: id,
    };

    return await client.archivePerson(command);
}

//type SearchFn = (subString: string) => Promise<boolean>;

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

// test('Ping', async () => {
//     let agent = new Agent({
//         pfx: fs.readFileSync('client.pfx'),
//         passphrase: '',
//         // ca: [fs.readFileSync('fullchain.crt')]
//     });

//     let clientFactory = new ClientFactory('2bb80d537b1da3e38bd30361aa855686bde0eacd7162fef6a25fe97bf527a25b', 'Demo', 'https://local.pliance.io/', agent);
//     let client = clientFactory.create('givenname', 'sub');
//     let query = <PingQuery>{};
//     let res = await client.ping(query);
//     expect(res).toEqual(expect.anything());
// });

// test('No-cert', async () => {
//     let clientFactory = new ClientFactory('2bb80d537b1da3e38bd30361aa855686bde0eacd7162fef6a25fe97bf527a25b', 'Demo', 'https://local-no-cert.pliance.io/');
//     let client = clientFactory.create('givenname', 'sub');
//     let query = <PingQuery>{};
//     let res = await client.ping(query);

//     expect(res).toEqual(expect.anything());
// });

// test('Bad Request', async () => {
//     let agent = new Agent({
//         pfx: fs.readFileSync('client.pfx'),
//         passphrase: '',
//         // ca: [fs.readFileSync('fullchain.crt')]
//     });

//     let clientFactory = new ClientFactory('2bb80d537b1da3e38bd30361aa855686bde0eacd7162fef6a25fe97bf527a25b', 'Demo', 'https://local.pliance.io/', agent);

//     let client = clientFactory.create('givenname', 'sub');

//     let person: RegisterPersonCommand = <RegisterPersonCommand>{};

//     try {
//         await client.registerPerson(person);
//         expect(true).toEqual(false);
//     }
//     catch (e) {
//         expect(e).toEqual("Missing FirstName");
//     }
// });

// test('Register person', async () => {
//     let agent = new Agent({
//         pfx: fs.readFileSync('client.pfx'),
//         passphrase: '',
//         // ca: [fs.readFileSync('fullchain.crt')]
//     });

//     let clientFactory = new ClientFactory('2bb80d537b1da3e38bd30361aa855686bde0eacd7162fef6a25fe97bf527a25b', 'Demo', 'https://local.pliance.io/', agent);

//     let client = clientFactory.create('givenname', 'sub');

//     let person = <RegisterPersonCommand>{
//         firstName: 'Osama',
//         lastName: 'bin laden',
//         personReferenceId: 'reference-id'
//     };

//     let res = await client.registerPerson(person);

//     expect(res.status).toEqual(ResponseStatus.Success);
//     expect(res.hits.length).toEqual(1);
// });

// test('View person', async () => {
//     let agent = new Agent({
//         pfx: fs.readFileSync('client.pfx'),
//         passphrase: '',
//         // ca: [fs.readFileSync('fullchain.crt')]
//     });

//     let clientFactory = new ClientFactory('2bb80d537b1da3e38bd30361aa855686bde0eacd7162fef6a25fe97bf527a25b', 'Demo', 'https://local.pliance.io/', agent);

//     let client = clientFactory.create('givenname', 'sub');

//     let query = <ViewPersonQuery>{ personReferenceId: 'reference-id' }
//     let res = await client.viewPerson(query);

//     expect(res.status).toEqual(ResponseStatus.Success);
//     expect(res.data.hits.length).toEqual(1);
// });

// test('Classify person', async () => {
//     let agent = new Agent({
//         pfx: fs.readFileSync('client.pfx'),
//         passphrase: '',
//         // ca: [fs.readFileSync('fullchain.crt')]
//     });

//     let clientFactory = new ClientFactory('2bb80d537b1da3e38bd30361aa855686bde0eacd7162fef6a25fe97bf527a25b', 'Demo', 'https://local.pliance.io/', agent);

//     let client = clientFactory.create('givenname', 'sub');

//     let query = <ViewPersonQuery>{ personReferenceId: 'reference-id' }
//     let view = await client.viewPerson(query);

//     let req: ClassifyPersonHitCommand = {
//         personReferenceId: 'reference-id',
//         matchId: view.data.hits[0][0].matchId,
//         aliasId: view.data.hits[0][0].aliasId,
//         classification: ClassificationType.FalsePositive
//     };

//     let res = await client.classifyPersonHit(req);

//     expect(res.status).toEqual(ResponseStatus.Success);
// });

// test('Search person', async () => {
//     let agent = new Agent({
//         pfx: fs.readFileSync('client.pfx'),
//         passphrase: '',
//         // ca: [fs.readFileSync('fullchain.crt')]
//     });

//     let clientFactory = new ClientFactory('2bb80d537b1da3e38bd30361aa855686bde0eacd7162fef6a25fe97bf527a25b', 'Demo', 'https://local.pliance.io/', agent);

//     let client = clientFactory.create('givenname', 'sub');

//     let query: PersonSearchQuery = <PersonSearchQuery>{
//         query: 'ebba',
//         // page: {
//         //     size: 10,
//         //     no: 1
//         // },
//         // filter: {
//         //     // isSanction: null,
//         //     // isPep: true,
//         //     // isRca: null
//         // }
//     };

//     let res = await client.searchPerson(query);

//     expect(res.status).toEqual(ResponseStatus.Success);
//     expect(res.data.result.length).toBeGreaterThan(0);
// });

// test('Archive person', async () => {
//     let agent = new Agent({
//         pfx: fs.readFileSync('client.pfx'),
//         passphrase: '',
//         // ca: [fs.readFileSync('fullchain.crt')]
//     });

//     let clientFactory = new ClientFactory('2bb80d537b1da3e38bd30361aa855686bde0eacd7162fef6a25fe97bf527a25b', 'Demo', 'https://local.pliance.io/', agent);
//     let client = clientFactory.create('givenname', 'sub');

//     let command: ArchivePersonCommand = {
//         personReferenceId: 'reference-id'
//     };

//     let res = await client.archivePerson(command);

//     expect(res.status).toEqual(ResponseStatus.Success);
// });

// test('Unarchive person', async () => {
//     let agent = new Agent({
//         pfx: fs.readFileSync('client.pfx'),
//         passphrase: '',
//         // ca: [fs.readFileSync('fullchain.crt')]
//     });

//     let clientFactory = new ClientFactory('2bb80d537b1da3e38bd30361aa855686bde0eacd7162fef6a25fe97bf527a25b', 'Demo', 'https://local.pliance.io/', agent);
//     let client = clientFactory.create('givenname', 'sub');

//     let command: UnarchivePersonCommand = {
//         personReferenceId: 'reference-id'
//     };

//     let res = await client.unarchivePerson(command);

//     expect(res.status).toEqual(ResponseStatus.Success);
// });

// test('Delete person', async () => {
//     let agent = new Agent({
//         pfx: fs.readFileSync('client.pfx'),
//         passphrase: '',
//         // ca: [fs.readFileSync('fullchain.crt')]
//     });

//     let clientFactory = new ClientFactory('2bb80d537b1da3e38bd30361aa855686bde0eacd7162fef6a25fe97bf527a25b', 'Demo', 'https://local.pliance.io/', agent);

//     let client = clientFactory.create('givenname', 'sub');

//     let command: DeletePersonCommand = {
//         personReferenceId: 'reference-id'
//     };

//     let res = await client.deletePerson(command);

//     expect(res.status).toEqual(ResponseStatus.Success);
// });

// test('Register company', async () => {
//     let agent = new Agent({
//         pfx: fs.readFileSync('client.pfx'),
//         passphrase: '',
//         // ca: [fs.readFileSync('fullchain.crt')]
//     });

//     let clientFactory = new ClientFactory('2bb80d537b1da3e38bd30361aa855686bde0eacd7162fef6a25fe97bf527a25b', 'Demo', 'https://local.pliance.io/', agent);

//     let client = clientFactory.create('givenname', 'sub');

//     let person: RegisterCompanyCommand = <RegisterCompanyCommand>{
//         name: 'Plisec',
//         companyReferenceId: 'comp-reference-id',
//         identity: {
//             identity: '559161-4275',
//             country: 'sv'
//         }
//     };

//     let res = await client.registerCompany(person);

//     expect(res.status).toEqual(ResponseStatus.Success);
// });


// test('View Company', async () => {
//     let agent = new Agent({
//         pfx: fs.readFileSync('client.pfx'),
//         passphrase: '',
//         // ca: [fs.readFileSync('fullchain.crt')]
//     });

//     let clientFactory = new ClientFactory('2bb80d537b1da3e38bd30361aa855686bde0eacd7162fef6a25fe97bf527a25b', 'Demo', 'https://local.pliance.io/', agent);

//     let client = clientFactory.create('givenname', 'sub');

//     let query = <ViewCompanyQuery>{ companyReferenceId: 'comp-reference-id' }
//     let res = await client.viewCompany(query);

//     expect(res.status).toEqual(ResponseStatus.Success);
// });

// test('Search Company', async () => {
//     let agent = new Agent({
//         pfx: fs.readFileSync('client.pfx'),
//         passphrase: '',
//         // ca: [fs.readFileSync('fullchain.crt')]
//     });

//     let clientFactory = new ClientFactory('2bb80d537b1da3e38bd30361aa855686bde0eacd7162fef6a25fe97bf527a25b', 'Demo', 'https://local.pliance.io/', agent);

//     let client = clientFactory.create('givenname', 'sub');
//     let req = <CompanySearchQuery>{
//         query: 'Plisec',
//         // page: {
//         //     size: 10,
//         //     no: 1
//         // },
//         // filter: {
//         //     isSanction: null,
//         //     isPep: true,
//         //     isRca: null
//         // }
//     };

//     let res = await client.searchCompany(req);

//     expect(res.status).toEqual(ResponseStatus.Success);
//     expect(res.data.result.length).toBeGreaterThan(0);
// });

// test('Archive company', async () => {
//     let agent = new Agent({
//         pfx: fs.readFileSync('client.pfx'),
//         passphrase: '',
//         // ca: [fs.readFileSync('fullchain.crt')]
//     });

//     let clientFactory = new ClientFactory('2bb80d537b1da3e38bd30361aa855686bde0eacd7162fef6a25fe97bf527a25b', 'Demo', 'https://local.pliance.io/', agent);

//     let client = clientFactory.create('givenname', 'sub');

//     let command: ArchiveCompanyCommand = {
//         companyReferenceId: 'comp-reference-id'
//     };

//     let res = await client.archiveCompany(command);

//     expect(res.status).toEqual(ResponseStatus.Success);
// });

// test('Unarchive company', async () => {
//     let agent = new Agent({
//         pfx: fs.readFileSync('client.pfx'),
//         passphrase: '',
//         // ca: [fs.readFileSync('fullchain.crt')]
//     });

//     let clientFactory = new ClientFactory('2bb80d537b1da3e38bd30361aa855686bde0eacd7162fef6a25fe97bf527a25b', 'Demo', 'https://local.pliance.io/', agent);

//     let client = clientFactory.create('givenname', 'sub');

//     let command: UnarchiveCompanyCommand = {
//         companyReferenceId: 'comp-reference-id'
//     };

//     let res = await client.unarchiveCompany(command);

//     expect(res.status).toEqual(ResponseStatus.Success);
// });

// test('Delete company', async () => {
//     let agent = new Agent({
//         pfx: fs.readFileSync('client.pfx'),
//         passphrase: '',
//         // ca: [fs.readFileSync('fullchain.crt')]
//     });

//     let clientFactory = new ClientFactory('2bb80d537b1da3e38bd30361aa855686bde0eacd7162fef6a25fe97bf527a25b', 'Demo', 'https://local.pliance.io/', agent);

//     let client = clientFactory.create('givenname', 'sub');

//     let command: DeleteCompanyCommand = {
//         companyReferenceId: 'comp-reference-id'
//     };

//     let res = await client.deleteCompany(command);

//     expect(res.status).toEqual(ResponseStatus.Success);
// });
