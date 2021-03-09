const disabledFormElements = function(form, isDisabled) {
  const formElements = Array.from(form.children);

  formElements.forEach((formElement) => {
    formElement.disabled = isDisabled;
  });
};

const disabledForm = function(form, isDisabled) {
  const mainFormClass = form.classList[0];

  if (isDisabled) {
    form.classList.add(`${mainFormClass}--disabled`);
  } else {
    form.classList.remove(`${mainFormClass}--disabled`);
  }

  disabledFormElements(form, isDisabled);
};

export { disabledForm };
