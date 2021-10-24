import React from 'react';
import styles from './form.module.css'

const Input = ({
  id,
  label,
  value,
  type,
  onChange,
  error,
  onBlur,
  placeholder,
  ...props
}) => {
  return (
    <>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        {...props}
      />
      {error && <small className={styles.error}>{error}</small>}
    </>
  );
};

export default Input;
