const { test, expect } = require('@playwright/test');
const dotenv = require('dotenv');
const {
  fillForm,
  submitForm,
  drawSignature,
  clearSignature,
  expectFieldError,
  expectNoErrors,
  getSignatureDataLength
} = require('./helpers/form-helpers.js');

dotenv.config();

const {
  BASE_URL, VALID_NAME, VALID_EMAIL, VALID_PHONE, VALID_DOB, VALID_PASSWORD, VALID_GENDER,
  INVALID_EMAILS, INVALID_PHONE_SHORT, INVALID_PHONE_ALPHA, INVALID_PASSWORD,
  XSS_INPUT, SQL_INJECTION, LONG_STRING, UNICODE_INPUT, WHITESPACE_EMAIL
} = require('./config/env.js');

test.beforeEach(async ({ page }) => {
  await page.goto(BASE_URL);
});

// ------------------ Field-level Validation ------------------

test('TC-Name-Required', async ({ page }) => {
  await submitForm(page);
  await expectFieldError(page, '#name-input', 'Name is required');
  await page.close();
});

test('TC-Email-InvalidFormat', async ({ page }) => {
  for (const email of INVALID_EMAILS) {
    await page.reload(); // optional: reset form for each iteration
    await page.fill('#email-input', email);
    await submitForm(page);
    await expectFieldError(page, '#email-input', 'Valid email required');
}
  await page.close();
});

test('TC-Phone-InvalidCases', async ({ page }) => {
  for (const phone of [INVALID_PHONE_SHORT, INVALID_PHONE_ALPHA]) {
    await page.reload();
    await page.fill('input[name="phone"]', phone);
    await submitForm(page);
    await expectFieldError(page, 'input[name="phone"]', 'Phone must be 10 digits');
  }
    await page.close();
});

test('TC-Password-MinLength', async ({ page }) => {
  await page.fill('input[name="password"]', INVALID_PASSWORD);
  await submitForm(page);
  await expectFieldError(page, 'input[name="password"]', 'Minimum 6 characters');
  await page.close();
});

test('TC-DOB-Required', async ({ page }) => {
  await submitForm(page);
  await expectFieldError(page, 'input[name="dob"]', 'Date of Birth required');
  await page.close();
});

test('TC-Gender-Required', async ({ page }) => {
  await submitForm(page);
  await expectFieldError(page, '#gender-select', 'Gender is required');
  await page.close();
});

// ------------------ Signature Tests ------------------

test('TC-Sig-CanvasExists', async ({ page }) => {
  const canvas = page.locator('#signature-canvas');
  await expect(canvas).toBeVisible();
  const box = await canvas.boundingBox();
  expect(box.width).toBe(300);
  expect(box.height).toBe(120);
  console.log(box);
  await page.close();
});

test('TC-Sig-Required', async ({ page }) => {
  await fillForm(page, {
    name: VALID_NAME, email: VALID_EMAIL, phone: VALID_PHONE,
    dob: VALID_DOB, password: VALID_PASSWORD, gender: VALID_GENDER
  });
  await submitForm(page);
  await expectFieldError(page, '#signature-canvas', 'Signature is required');
  await page.close();
});

test('TC-Sig-DrawSingleStroke', async ({ page }) => {
  await drawSignature(page);
  const dataLen = await getSignatureDataLength(page);
  expect(dataLen).toBeGreaterThan(1734);
  await page.close();
});

test('TC-Sig-ClearButton', async ({ page }) => {
  await drawSignature(page);
  await clearSignature(page);
  const dataLen = await getSignatureDataLength(page);
  expect(dataLen).toBe(1734);
  await page.close();
});

// ------------------ Form-level E2E ------------------

test('TC-Submit-AllValid', async ({ page }) => {
  await fillForm(page, {
    name: VALID_NAME, email: VALID_EMAIL, phone: VALID_PHONE,
    dob: VALID_DOB, password: VALID_PASSWORD, gender: VALID_GENDER
  });
  await drawSignature(page);
  await submitForm(page);
  await expectNoErrors(page);
  await page.close();
});

// ------------------ Security Tests ------------------

test('TC-XSS-Injection', async ({ page }) => {
  await page.fill('#name-input', XSS_INPUT);
  await submitForm(page);
  const xss = await page.evaluate(() => window.__xss);
  expect(xss).toBeUndefined();
  await page.close();
});

test('TC-SQL-Injection-Like', async ({ page }) => {
  await page.fill('#name-input', SQL_INJECTION);
  await submitForm(page);
  await expect(page.locator('body')).toBeVisible();
  await page.close();
});

// ------------------ Edge Cases ------------------

test('TC-LongStrings', async ({ page }) => {
  await page.fill('#name-input', LONG_STRING);
  await submitForm(page);
  await expect(page.locator('body')).toBeVisible();
  await page.close();
});

test('TC-UnicodeInputs', async ({ page }) => {
  await page.fill('#name-input', UNICODE_INPUT);
  await submitForm(page);
  await expect(page.locator('body')).toBeVisible();
  await page.close();
});

test('TC-WhitespaceTrim', async ({ page }) => {
  await page.fill('#email-input', WHITESPACE_EMAIL);
  await submitForm(page);
  await expect(page.locator('body')).toBeVisible();
  await page.close();
});