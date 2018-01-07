import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    submit() {
      var newTodoList = this.store.createRecord('todoList', {
        name: this.get('name'),
        description: this.get('description'),
        user: this.get('model')
      });
      newTodoList.save()
      .then(() => {
        this.set('name', '');
        this.set('description', '');
        this.get('model.todoLists').pushObject(newTodoList);
        this.transitionToRoute('admin.todo_list', this.get('model.id'));
      })
    }
  }
});
