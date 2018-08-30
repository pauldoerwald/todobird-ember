# todobird

Before you can use todobird-ember, make sure you set up todobird-phoenix properly.

To start the ember server:

    ember s

You will have created a user on the Phoenix side, presumably user 1. Connect to:

    http://localhost:4200/admin/users/1

You should be able to create new todo lists. You can't create todos yet, unfortunately. What's really cool though, is if you open a second browser window, you'll be able to see the todo lists update over web sockets (phoenix channels). You should also be able to create new users and todolists using the Phoenix console and watch them automatically appear in the UI as well.

Possible tasks:

* creating todos
* upgrade to latest version of ember. Hint: use ember-cli-upgrade.
* sharing todo lists between users, or assigning todo items to users
* account (user) creation
* login/authentication. Hint: use ember-simple-auth. You can do partial steps along the way by just adding a Bearer token to your requests and checking that on the server side, and then using hand-generated JWT tokens and implementing them on the Ember side before you go all the way to implementing ember-simple-auth.
