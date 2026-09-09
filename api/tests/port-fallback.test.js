import test from 'node:test';
import assert from 'node:assert/strict';
import net from 'node:net';

import { getAvailablePort } from '../server.js';

test('getAvailablePort skips ports already in use', async () => {
  const occupied = await new Promise((resolve) => {
    const server = net.createServer();
    server.listen(0, () => {
      const port = server.address().port;
      resolve({ server, port });
    });
  });

  const nextPort = await getAvailablePort(occupied.port);
  assert.notEqual(nextPort, occupied.port);

  await new Promise((resolve, reject) => {
    occupied.server.close((err) => (err ? reject(err) : resolve()));
  });
});
