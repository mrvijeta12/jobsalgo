export const validate = (formData, validationConfig, setErrors) => {
  const errorData = {};

  Object.entries(formData).forEach(([key, value]) => {
    const rules = validationConfig[key];
    if (!rules) return;

    rules.some((rule) => {
      if (rule.required && !value) {
        errorData[key] = rule.message;
        return true;
      }
      if (rule.minLength && value.length < rule.minLength) {
        errorData[key] = rule.message;
        return true;
      }
      if (rule.pattern && value && !rule.pattern.test(value)) {
        errorData[key] = rule.message;
        return true;
      }
      if (rule.custom && !rule.custom(value, formData)) {
        errorData[key] = rule.message;
        return true;
      }
      return false;
    });
  });

  setErrors(errorData);
  return errorData;
};
