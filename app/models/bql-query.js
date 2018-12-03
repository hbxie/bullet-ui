/*
 *  Copyright 2018, Oath Inc.
 *  Licensed under the terms of the Apache License, Version 2.0.
 *  See the LICENSE file associated with the project for terms.
 */
import { isEmpty, isEqual, isNone } from '@ember/utils';
import { computed } from '@ember/object';
import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';

let Validations = buildValidations({
  bql: validator('presence', {
    presence: true,
    message: 'BQL is empty'
  })
});

export default DS.Model.extend(Validations, {
  name: DS.attr('string'),
  created: DS.attr('date', {
    defaultValue() {
      return new Date(Date.now());
    }
  }),
  bql: DS.attr('string'),
  jsonObject: DS.attr(),
  results: DS.hasMany('result', { async: true, dependent: 'destroy' })
});
