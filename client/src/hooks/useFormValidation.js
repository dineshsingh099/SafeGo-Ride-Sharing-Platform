import { useState, useCallback } from "react";

const rules = {
  required: (v) => (!v || !String(v).trim() ? "This field is required." : null),
  email: (v) => (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "Enter a valid email address." : null),
  minLength: (n) => (v) => (String(v).length < n ? `Must be at least ${n} characters.` : null),
  match: (other, label) => (v, all) => (v !== all[other] ? `Must match ${label}.` : null),
  phone: (v) => (!/^\+?[\d\s\-()]{7,15}$/.test(v) ? "Enter a valid phone number." : null),
};

export function useFormValidation(schema) {
  const [values, setValues] = useState(() =>
    Object.fromEntries(Object.keys(schema).map((k) => [k, schema[k].default ?? ""]))
  );
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validate = useCallback(
    (fieldValues = values) => {
      const newErrors = {};
      for (const [field, config] of Object.entries(schema)) {
        for (const rule of config.rules || []) {
          const fn = typeof rule === "function" ? rule : rules[rule];
          if (!fn) continue;
          const err = fn(fieldValues[field], fieldValues);
          if (err) { newErrors[field] = err; break; }
        }
      }
      return newErrors;
    },
    [schema, values]
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      const err = validate({ ...values, [name]: value });
      setErrors((prev) => ({ ...prev, [name]: err[name] || null }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const err = validate();
    setErrors((prev) => ({ ...prev, [name]: err[name] || null }));
  };

  const handleSubmitValidation = () => {
    const newErrors = validate();
    setErrors(newErrors);
    setTouched(Object.fromEntries(Object.keys(schema).map((k) => [k, true])));
    return Object.keys(newErrors).length === 0;
  };

  const reset = () => {
    setValues(Object.fromEntries(Object.keys(schema).map((k) => [k, schema[k].default ?? ""])));
    setErrors({});
    setTouched({});
  };

  return { values, errors, touched, handleChange, handleBlur, handleSubmitValidation, reset, setValues };
}
