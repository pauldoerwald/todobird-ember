import Controller from '@ember/controller';
import { inject } from '@ember/service';

export default Controller.extend({
  'user-socket': inject(),

  init() {
    this._super(...arguments);
    let socket = this.get('user-socket');
    socket.connect();
    let channel = socket.get('channels')[0];
    channel.on("open", this.onOpened);
    channel.on("ping", this.onPing);
    channel.on("newTodoList", (payload) => this.onNewTodoList(payload));
    channel.on("updatedTodoList", (payload) => this.onUpdatedTodoList(payload));
    channel.on("deletedTodoList", (payload) => this.onDeletedTodoList(payload));
  },

  onOpened() {
    console.log('socket was opened!');
  },

  onNewTodoList(payload) {
    console.log("loading payload into store");
    console.log(payload);
    this.get('store').push(payload);
  },

  onUpdatedTodoList(payload) {
    console.log("loading payload into store");
    console.log(payload);
    this.get('store').push(payload);
  },

  onDeletedTodoList(payload) {
    console.log("removing item referenced by payload from store");
    console.log(payload);
    // debugger;
    var tl = this.get('store').peekRecord('todoList', parseInt(payload.todoListId));
    console.log(tl);
    if (tl) {
      tl.get('user.todoLists').removeObject(tl);
      tl.unloadRecord(tl);
    }
  },

  onPing(payload) {
    console.log(payload)
  },

  actions: {
    delete(list) {
      if (confirm('Are you sure you want to delete this todo list?')) {
        list.destroyRecord().then(() => {
          console.log("sending deletedTodoList");
          let socket = this.get('user-socket');
          let channel = socket.get('channels')[0]
          channel.push("deletedTodoList", {todoListId: list.get('id')})
            .receive("ok", (msg) => console.log("sent deletedTodoList"))
        });
      }
    },

    ping() {
      console.log("pinging");
      let socket = this.get('user-socket');
      socket.socket.channels[0].push("ping", {})
        .receive("ok", (payload) => console.log("ping was received"));
    }
  }
});
