import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    delete(list) {
      if (confirm('Are you sure you want to delete this todo list?')) {
        list.destroyRecord();
      }
    }
  }
});
