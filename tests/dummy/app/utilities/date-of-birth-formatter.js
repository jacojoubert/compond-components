import FieldKit from "npm:field-kit";

function daysInMonth(year, month) {
  return new Date(year, month, 0).getDate();
}

// Based on https://github.com/square/field-kit/blob/master/src/expiry_date_formatter.js
class DateOfBirthFormatter extends FieldKit.DelimitedTextFormatter {
  constructor() {
    super('-');
    this.maximumLength = 10;
  }

  hasDelimiterAtIndex(index) {
    return index === 4 || index === 7;
  }

  format(value) {
    if (!value) { return ''; }

    let { year, month, day } = value;

    return super.format(year + month + day);
  }

  parse(text, error) {
    const date = text.split(this.delimiter);
    let year = date[0];
    let month = date[1];
    let day = date[2];

    if (year && year.length === 4 && month && month.length === 2 && day && day.length === 2) {
      return {
        year: Number(year),
        month: Number(month),
        day: Number(day)
      };

    } else {
      if (typeof error === 'function') {
        error('expiry-date-formatter.invalid-date');
      }

      return null;
    }
  }

  isChangeValid(change, error) {
    if (!error) { error = function(){}; }

    const isBackspace = change.proposed.text.length < change.current.text.length;
    let newText = change.proposed.text;

    if (change.inserted.text === this.delimiter && change.current.text === '1') {
      newText = '01' + this.delimiter;

    } else if (change.inserted.text.length > 0 && !/^\d$/.test(change.inserted.text)) {
      error('expiry-date-formatter.only-digits-allowed');
      return false;

    } else {
      if (isBackspace) {
        if (change.deleted.text === this.delimiter) {
          newText = newText.slice(0, newText.length - 1);
        }

        if (newText === '0') {
          newText = '';
        }

        if (change.inserted.text.length > 0 && !/^\d$/.test(change.inserted.text)) {
          error('expiry-date-formatter.only-digits-allowed');
          return false;
        }
      }

      // Must start with 1 or 2
      const year = newText.split(this.delimiter)[0];
      if (year.slice(0, 1) !== '1' && year.slice(0, 1) !== '2') {
        newText = '';
      }

      // Must follow 1 with 9, 2 with a 0
      if (year.length > 1 && year.slice(0, 2) !== '19' && year.slice(0, 2) !== '20') {
        newText = newText.slice(0, 1);
      }

      // Auto-complete month 4| -> 04
      const month = newText.split(this.delimiter)[1];
      if (month && month.length === 1 && month > 1) {
        newText = newText.slice(0, newText.length - 1) + '0' + newText.slice(-1);
      }

      // Auto complete day if it would exceed # of days allowed for 4| -> 04
      const day = newText.split(this.delimiter)[2];
      if (day && day.length === 1 && day > (daysInMonth(year, month) + '').slice(0, 1)) {
        newText = newText.slice(0, newText.length - 1) + '0' + newText.slice(-1);
      }

      // Ensure day doesn't exceed days in month
      if (day && day > daysInMonth(year, month)) {
        newText = newText.slice(0, newText.length - 1);
      }

      // Add delimiters where needed
      if (this.hasDelimiterAtIndex(newText.length)) {
        newText = newText + this.delimiter;
      }

      // Ensure maximum length
      if (newText.length > this.maximumLength) {
        newText = newText.slice(0, this.maximumLength);
      }
    }

    change.proposed.text = newText;
    change.proposed.selectedRange = { start: newText.length, length: 0 };

    return true;
  }
}

export default DateOfBirthFormatter;
