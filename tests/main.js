import assert from "assert";

import '../imports/api/fixtures.tests.js';
import '../imports/api/pairs.tests.js';
import '../imports/api/players.tests.js';
import '../imports/api/teams.tests.js';

describe("fppg", function () {
  it("package.json has correct name", async function () {
    const { name } = await import("../package.json");
    assert.strictEqual(name, "fppg");
  });

  if (Meteor.isClient) {
    it("client is not server", function () {
      assert.strictEqual(Meteor.isServer, false);
    });
  }

  if (Meteor.isServer) {
    it("server is not client", function () {
      assert.strictEqual(Meteor.isClient, false);
    });
  }
});
