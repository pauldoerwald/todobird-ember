import PhoenixSocket from 'phoenix/services/phoenix-socket';
import { inject } from '@ember/service';

export default PhoenixSocket.extend({
  store: inject(),

  channels: null,

  init() {
    this.set('channels', []);
  },

  connect(/*url, options*/) {
    this._super('ws://localhost:4000/socket', {});

    const channel = this.joinChannel("user:lobby", {
      nickname: "Paul"
    });

    this.get('channels').pushObject(channel);
  }
});
