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

const removeChilds = (parent) => {
  while (parent.firstChild) {
    parent.firstChild.remove();
  }
};

const renderElement = (container, template, place = 'beforeend') => {
  container.insertAdjacentHTML(place, template);
};

const declinationOfNumber = (value, titles) => {

  // В проверку попадают значения
  // В первую:
  // 1, 21, 31, 41, 51, 61, 71, 81, 91, 101, 121, 131, 141 и т.д.
  // Во вторую:
  // 2, 3, 4, 22, 23, 24, 32, 33, 34, 42, 43, 44 ... 102, 103, 104, 122, 123, 124, 132 и т.д.
  // В третью:
  // 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 25, 26, 27, 28, 29, 30, 35 и т.д.

  return titles[
    value % 10 === 1 && value % 100 !== 11
      ? 0 :
      value % 10 >= 2 && value % 10 <= 4 && (value % 100 < 10 || value % 100 >= 20)
        ? 1 : 2
  ];
}

export { disabledForm, removeChilds, renderElement, declinationOfNumber as declOfNum };
