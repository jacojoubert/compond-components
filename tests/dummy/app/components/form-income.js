import FieldKit from "npm:field-kit";
import FormComponent from './form-component';
import layout from '../templates/components/form-income';

export default FormComponent.extend({
  layout,
  
  didInsertElement() {
    const field = new FieldKit.TextField(this.$().find('input')[0],
                    new FieldKit.NumberFormatter()
                      .setNumberStyle(FieldKit.NumberFormatter.Style.CURRENCY)
                      .setLocale('en-US')
                      .setCountryCode('US')
                      .setCurrencyCode('USD')
                      .setMaximumFractionDigits(0));
    field.setFocusedPlaceholder('$');
    field.setUnfocusedPlaceholder('$');
  }
});
