/*
 *  Copyright 2016, Yahoo Inc.
 *  Licensed under the terms of the Apache License, Version 2.0.
 *  See the LICENSE file associated with the project for terms.
 */
import { alias } from '@ember/object/computed';
import Component from '@ember/component';
import { isNone } from '@ember/utils';

export default Component.extend({
  classNames: ['query-blurb'],
  summary: null,

  bql: alias('summary.bql').readOnly(),

  isBql: alias('summary.isBql').readOnly()
});
