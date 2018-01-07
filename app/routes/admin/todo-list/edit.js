import Route from '@ember/routing/route';

export default Route.extend({
  model(params) {
    return this.store.findRecord('todoList', params.list_id)
  },

  setupController(controller, model) {
    this._super(controller, model);
    controller.set('name', model.get('name'));
    controller.set('description', model.get('description'));
  }
});
