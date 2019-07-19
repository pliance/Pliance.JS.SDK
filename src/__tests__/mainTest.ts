import { ClientFactory } from '../index';
import { Person, PersonIdentity, Status, PersonSearchQuery, PersonSearchQueryResult } from '../contracts';
import { Agent } from 'https';
import * as fs from 'fs';

test('Ping', async () => {
    let agent = new Agent({
        pfx: fs.readFileSync('client.pfx'),
        passphrase: ''
    });

    let clientFactory = new ClientFactory('2bb80d537b1da3e38bd30361aa855686bde0eacd7162fef6a25fe97bf527a25b', 'TEST', 'https://test-stage3.pliance.io/');

    let client = clientFactory.create('givenname', 'sub');
    let res = await client.ping();
    console.log(res);
    expect(res).toEqual(expect.anything());
});

test('Register person', async () => {
    let clientFactory = new ClientFactory('2bb80d537b1da3e38bd30361aa855686bde0eacd7162fef6a25fe97bf527a25b', 'TEST', 'https://test-stage3.pliance.io/');

    let client = clientFactory.create('givenname', 'sub');

    let person: Person = {
        firstName: 'Adam',
        lastName: 'Användare',
        personReferenceId: 'reference-id'
    };

    let res = await client.Register(person);
    console.log(res);
    expect(res.status).toEqual(Status.Success);
    expect(res.hits.length).toEqual(0);
});

test('View person', async () => {
    let clientFactory = new ClientFactory('2bb80d537b1da3e38bd30361aa855686bde0eacd7162fef6a25fe97bf527a25b', 'TEST', 'https://test-stage3.pliance.io/');

    let client = clientFactory.create('givenname', 'sub');

    let res = await client.ViewPerson('customer/1');
    console.log(res);
    expect(res.status).toEqual(Status.Success);
    expect(res.data.hits.length).toEqual(1);
});

test('Search person', async () => {
    let clientFactory = new ClientFactory('2bb80d537b1da3e38bd30361aa855686bde0eacd7162fef6a25fe97bf527a25b', 'TEST', 'https://test-stage3.pliance.io/');

    let client = clientFactory.create('givenname', 'sub');

    let query: PersonSearchQuery = {
        query: 'osama',
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

    let res = await client.SearchPerson(query);
    console.log(res);
    expect(res.status).toEqual(Status.Success);
    expect(res.data.result.length).toEqual(2);
});
