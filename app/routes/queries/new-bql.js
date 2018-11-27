/*
 *  Copyright 2018, Oath Inc.
 *  Licensed under the terms of the Apache License, Version 2.0.
 *  See the LICENSE file associated with the project for terms.
 */
import Route from '@ember/routing/route';

export default Route.extend({
  beforeModel() {
    return this.createEmptyBqlQuery().then(query => {
      query.save().then(() => {
        this.transitionTo('query', query.get('id'));
      });
    });
  },

  createEmptyFilter(query) {
    let empty = this.store.createRecord('filter', {
      clause: this.get('emptyClause'),
      query: query
    });
    return empty.save();
  },

  createEmptyBqlQuery() {
    let aggregation = this.store.createRecord('aggregation', this.get('querier.defaultAggregation'));
    aggregation.save();
    let query = this.store.createRecord('query', {
      bql: 'SELECT * FROM STREAM(20000, TIME) LIMIT 1;',
      aggregation: aggregation
    });
    return this.createEmptyFilter(query).then(() => query);
  }
});
