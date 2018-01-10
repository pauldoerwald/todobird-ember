import Controller from '@ember/controller';
import { inject } from '@ember/service';

export default Controller.extend({
  'user-socket': inject(),

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

        console.log("sending newTodoList");
        let socket = this.get('user-socket');
        let channel = socket.get('channels')[0]
        channel.push("newTodoList", {todoListId: newTodoList.get('id')})
          .receive("ok", (msg) => console.log("sent newTodoList"))

      this.transitionToRoute('admin.todo_list', this.get('model.id'));
      })
    }
  }
});
