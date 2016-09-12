import Ember from 'ember';
import layout from '../templates/components/cc-tooltip';

export default Ember.Component.extend({
  layout,
  tagName: '',

  showTooltip: false,

  targetId: Ember.computed(function() {
    return `${Ember.guidFor(this)}--target`;
  }),

  actions: {
    show() {
      this.set('showTooltip', true);
    },

    hide() {
      this.set('showTooltip', false);
    },

    toggle() {
      this.toggleProperty('showTooltip');
    }
  }
});
