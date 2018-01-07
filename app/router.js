import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('admin', function() {
    this.route('todo_list', { path: 'user/:user_id/lists' }, function() {
      this.route('new');
      this.route('edit', { path: ':list_id/edit'});
    });
  });
});

export default Router;
