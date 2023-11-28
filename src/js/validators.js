const Validators = (function() {
  const EMAIL_REGEX = /(^[a-zA-Z0-9_.+'-]+@[a-zA-Z0-9-]+(?!.*?\.\.)(?!.*\.$)\.[a-zA-Z0-9-.]+$)/;

  return {
    combineValidators(validators) {
      return formData => validators.reduce((error, fn) => error || fn(formData), null);
    },

    hasValue(key, errorMessage) {
      return formData => (formData.get(key).trim().length ? null : errorMessage);
    },

    isOptionSelected(radioName, errorMessage) {
      return formData => {
        const radios = document.querySelectorAll(`input[type="radio"][name="${radioName}"]`);
        const isAnyRadioChecked = Array.from(radios).some(radio => radio.checked);
        return isAnyRadioChecked ? null : errorMessage;
      };
    },

    validateClient(radioName, errorMessage) {
      return formData => {
        const radios = Array.from(document.querySelectorAll(`input[type="radio"][name="${radioName}"]`));
        const selectElement = document.querySelector('select[name="client"]');
        const isAnyRadioChecked = radios.some(radio => radio.checked);
        const isOtherRadioChecked = radios.some(radio => radio.checked && radio.value === 'other');
        
        if (!isAnyRadioChecked || (isOtherRadioChecked && selectElement.value === '')) {
          return errorMessage;
        }
        
        return null;
      };
    },

    matchesPattern(key, pattern, errorMessage) {
      return formData => (pattern.test(formData.get(key).trim()) ? null : errorMessage);
    },

    validEmail(key, errorMessage) {
      return Validators.matchesPattern(key, EMAIL_REGEX, errorMessage);
    },
  };
})();
