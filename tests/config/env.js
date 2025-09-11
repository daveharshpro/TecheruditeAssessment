require('dotenv').config();

module.exports = {
  BASE_URL: process.env.base_url,
  
  // Valid Inputs
  VALID_NAME: process.env.valid_name,
  VALID_EMAIL: process.env.valid_email,
  VALID_PHONE: process.env.valid_phone,
  VALID_DOB: process.env.valid_dob,
  VALID_PASSWORD: process.env.valid_password,
  VALID_GENDER: process.env.valid_gender,
  
  // Invalid Inputs
  INVALID_EMAILS: process.env.invalid_emails.split(','),
  INVALID_PHONE_SHORT: process.env.invalid_phone_short,
  INVALID_PHONE_ALPHA: process.env.invalid_phone_alpha,
  INVALID_PASSWORD: process.env.invalid_password,
  
  // Security Inputs
  XSS_INPUT: process.env.xss_input,
  SQL_INJECTION: process.env.sql_injection,
  LONG_STRING: process.env.long_string,
  UNICODE_INPUT: process.env.unicode_input,
  
  // Edge Cases
  WHITESPACE_EMAIL: process.env.whitespace_email
};