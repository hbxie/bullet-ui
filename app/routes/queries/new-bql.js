/*
 *  Copyright 2018, Oath Inc.
 *  Licensed under the terms of the Apache License, Version 2.0.
 *  See the LICENSE file associated with the project for terms.
 */
import Route from '@ember/routing/route';

export default Route.extend({
  beforeModel() {
    let query = this.createEmptyBqlQuery();
    return query.save().then(() => {
      this.transitionTo('bql-query', query.get('id'));
    });
  },

  createEmptyBqlQuery() {
    return this.store.createRecord('bql-query', {
      bql: 'SELECT * FROM STREAM(20000, TIME) LIMIT 1;'
    });
  }
});
