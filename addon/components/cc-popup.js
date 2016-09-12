import Ember from 'ember';
import layout from '../templates/components/cc-popup';

export default Ember.Component.extend({
  layout,
  tagName: '',

  attachment: 'bottom center',
  targetAttachment: 'top center',
  targetId: null,

  constraints: [{
    to: 'window',
    attachment: 'together'
  }]
});
