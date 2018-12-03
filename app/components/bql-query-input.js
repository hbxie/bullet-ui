/*
 *  Copyright 2016, Yahoo Inc.
 *  Licensed under the terms of the Apache License, Version 2.0.
 *  See the LICENSE file associated with the project for terms.
 */
import { resolve, reject } from 'rsvp';
import $ from 'jquery';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import Component from '@ember/component';
import { isEqual, isNone } from '@ember/utils';

export default Component.extend({
  query: null,
  queryManager: service(),
  scroller: service(),
  isListening: false,
  hasError: false,
  hasSaved: false,
  bqlError: null,

  reset() {
    this.setProperties({
      isListening: false,
      hasError: false,
      hasSaved: false
    });
  },

  validate() {
    this.reset();
    let query = this.get('query');
    return this.get('queryManager').validateBQLQuery(query).then(
      () => {
          return query.validate().then(hash => {
            let isValid =  hash.validations.get('isValid');
            return isValid ? resolve() : reject();
          });
      },
      bqlError => reject(bqlError));
  },

  save() {
    return this.validate().then(
      () => {
        let query = this.get('query');
        return query.save();
      },
      bqlError => {
        this.set('bqlError', bqlError);
        this.set('hasError', true);
        this.get('scroller').scrollVertical('.validation-container');
        return reject();
      });
  },

  actions: {
    save() {
      this.save().then(() => {
        this.set('hasSaved', true);
        this.get('scroller').scrollVertical('.validation-container');
      });
    },

    listen() {
      this.save().then(() => {
        this.setProperties({
          isListening: true,
          hasSaved: true
        });
        this.sendAction('fireQuery');
      });
    }
  }
});
