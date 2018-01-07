import DS from 'ember-data';
import ENV from 'todobird/config/environment';

export default DS.JSONAPIAdapter.extend({
  namespace: 'api/v1',
  host: ENV.apiHost,
  coalesceFindRequests: true
});
