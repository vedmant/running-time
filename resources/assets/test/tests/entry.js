module.exports = {

  before (client, done) {
    client.loginWith('admin', done);
  },

  'it has list of entries' (client) {
    client
      .path('/entries')
      .waitForElementVisible('#entries_list')
      .assert.visible('#entries_list tr');
  },

  after (client, done) {
    client.logout(done);
  },

};
