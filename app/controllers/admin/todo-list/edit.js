import Controller from '@ember/controller';
import { inject } from '@ember/service';

export default Controller.extend({
  'user-socket': inject(),

  actions: {
    submit() {
      var todoList = this.get('model');
      todoList.set('name', this.get('name'));
      todoList.set('description', this.get('description'));
      todoList.save()
      .then(() => {
        this.set('name', '');
        this.set('description', '');

        console.log("sending updatedTodoList");
        let socket = this.get('user-socket');
        let channel = socket.get('channels')[0]
        channel.push("updatedTodoList", {todoListId: todoList.get('id')})
          .receive("ok", (msg) => console.log("sent updatedTodoList"))

        this.transitionToRoute('admin.todo_list', this.get('model.user.id'));
      })
    }
  }
});
