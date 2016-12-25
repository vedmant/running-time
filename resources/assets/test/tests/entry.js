var entries = require('../data/entries-data');

module.exports = {

  before (client, done) {
    client.logout()
      // .execute(function () {
      //   localStorage.clear();
      // }, [])
      .loginWith('admin', done);
  },

  'it has list of entries' (client) {
    client
      .path('/entries')
      .waitForElementVisible('#entries_list')
      .assert.visible('#entries_list tr');
  },

  'it lets add new entry' (client) {
    const entry = entries.valid;
    client
      .path('/entry/new')
      .waitForElementVisible('#entry_form')
      .setValue('#date', entry.date)
      .setValue('#distance', entry.distance)
      .clearValue('#time_hours')
      .setValue('#time_hours', entry.hours)
      .clearValue('#time_minutes')
      .setValue('#time_minutes', entry.minutes)
      .clearValue('#time_seconds')
      .setValue('#time_seconds', entry.seconds)
      .click('#entry_form [type=submit]')
      .assert.elementNotPresent('.has-error')
      .assert.elementPresent('#entries_list')
      .end();
  },

  after (client, done) {
    client.logout(done);
  },

};
