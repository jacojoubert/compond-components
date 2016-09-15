import FieldKit from "npm:field-kit";
import FormComponent from './form-component';
import layout from '../templates/components/form-income';

export default FormComponent.extend({
  layout,

  value: undefined,

  error: Ember.computed('value', function() {
    if (!this.get('value')) {
      return "You must enter an income."
    }
  }),

  conditionalValue: Ember.computed('value', 'isFocused', {
    get(key) {
      if (this.get('isFocused')) {
        return this.get('value');

      } else {
        const formatter = new FieldKit.NumberFormatter()
                            .setNumberStyle(FieldKit.NumberFormatter.Style.CURRENCY)
                            .setLocale('en-US')
                            .setCountryCode('US')
                            .setCurrencyCode('USD')
                            .setMaximumFractionDigits(0);
        const value = (this.get('value') || '').replace(/\D/g,'');
        return formatter.format(value);
      }
    },

    set(key, value) {
      return this.set('value', value.replace(/\D/g,''));
    }
  })
});
