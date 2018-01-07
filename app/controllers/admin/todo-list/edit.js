import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    submit() {
      var todoList = this.get('model');
      todoList.set('name', this.get('name'));
      todoList.set('description', this.get('description'));
      todoList.save()
      .then(() => {
        this.set('name', '');
        this.set('description', '');
        this.transitionToRoute('admin.todo_list', this.get('model.user.id'));
      })
    }
  }
});
