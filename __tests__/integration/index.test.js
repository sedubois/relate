/* eslint-env jest */

import fetch from 'node-fetch';
import serverPromise from '../../server';

describe('server', () => {
  let httpServer;

  beforeAll(async () => { httpServer = await serverPromise; });

  it('serves the Next.js app', async () => {
    const res = await fetch(`http://localhost:${httpServer.address().port}`);
    expect(await res.text()).toBe('Welcome to Next.js!');
  });

  afterAll(() => httpServer.close());
});
