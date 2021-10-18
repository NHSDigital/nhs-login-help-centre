/*
  Builds a form object that can be used for validation and that will update the dom of the main element
  It expects a form in the following format:

  form.nhs-help-centre__form#[mainFormElementID]
    [just one of]
    div.nhsuk-error-summary
      ul.nhsuk-error-summary__list

    [any amount of]
    div.nhsuk-form-group#[formControlId]
      span.nhs-help-centre__form-control-error
      input.nhs-help-centre__form-control-input#[inputId]
*/
const FormBuilder = function(mainFormElementID) {
  let formControls = [];
  let onSuccessHandler = Utils.noop;

  const originalTitle = document.title;
  const mainFormElement = document.querySelector(`#${mainFormElementID}`);
  const errorSummaryElement = mainFormElement.querySelector('.nhsuk-error-summary');
  const errorSummaryListElement = errorSummaryElement.querySelector('.nhsuk-error-summary__list');

  mainFormElement.addEventListener('submit', e => {
    e.preventDefault();
    resetForm();
    validateForm();
  });

  const Form = {
    addFormControl(id, validator) {
      const containerElement = mainFormElement.querySelector(`#${id}`);

      if (containerElement) {
        formControls.push({
          validator,
          containerElement,
          errorElement: containerElement.querySelector('.nhs-help-centre__form-control-error'),
          inputElement: containerElement.querySelector('.nhs-help-centre__form-control-input'),
        });
      } else {
        console.error(`No element with id: "${id}" in`, mainFormElement);
      }

      return Form;
    },

    addSuccessHandler(handler) {
      if (typeof handler === 'function') {
        onSuccessHandler = handler;
      }
      return Form;
    },

    addSuccessHandler(handler) {
      if (typeof handler === 'function') {
        onSuccessHandler = handler;
      }
      return Form;
    },

    updateFieldValue(id, valueToInsert){

       const containerElement = mainFormElement.querySelector(`#${id}`);
       if(containerElement){
          containerElement.value = valueToInsert
       } else { 
         console.error(`No element with id: "${id}" in`, mainFormElement);
       }
       
       return Form

    },

    setSelectedClient(idOfSelect, idOfClient){
      const containerElement = mainFormElement.querySelector(`#${idOfSelect}`);
      if(containerElement){
          for (var i = 0; i < containerElement.options.length; ++i) {
              if (containerElement.options[i].id === idOfClient) containerElement.options[i].selected = true;
          }
       } else { 
         console.error(`No element with id: "${id}" in`, mainFormElement);
       }

       return Form

    }
  };

  function resetForm() {
    document.title = originalTitle;
    formControls.forEach(resetFormControl);
    resetErrorSummary();
  }

  function validateForm() {
    const formData = new FormData(mainFormElement);

    let valid = true;
    formControls.forEach(formControl => {
      const error = formControl.validator(formData);
      if (error) {
        valid = false;
        addErrorToFormControl(formControl, error);
        addErrorToErrorSummary(formControl, error);
      }
    });

    if (valid) {
      onSuccessHandler(formData);
    } else {
      errorSummaryElement.focus();
      document.title = `Error: ${originalTitle}`;
    }
  }

  function resetErrorSummary() {
    errorSummaryListElement.innerHTML = '';
    errorSummaryElement.classList.add('nhsuk-error-summary--hidden');
  }

  function addErrorToErrorSummary(formControl, error) {
    const listItemElement = document.createElement('li');
    const errorMessageLinkElement = document.createElement('a');

    errorMessageLinkElement.innerText = error;
    errorMessageLinkElement.href = `#${formControl.inputElement.id}`;

    listItemElement.appendChild(errorMessageLinkElement);
    errorSummaryListElement.appendChild(listItemElement);
    errorSummaryElement.classList.remove('nhsuk-error-summary--hidden');
  }

  function resetFormControl(formControl) {
    formControl.errorElement.innerText = '';
    formControl.containerElement.classList.remove('nhsuk-form-group--error');
  }

  function addErrorToFormControl(formControl, error) {
    formControl.errorElement.innerText = error;
    formControl.containerElement.classList.add('nhsuk-form-group--error');
  }

  return Form;
};
