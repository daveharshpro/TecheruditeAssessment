const { test} = require('@playwright/test');
const {
  openDemoForm,
  acceptTerms,
  fillForm,
  drawSignature,
  submitAndCheckEmptyError,
  submitAndCheckInvalidEmailError,
  submitAndCheckSuccess
} = require('./helpers/form-helpers');

test.describe('Jotform Signature Form Automation', () => {

  test('shows validation messages for empty required fields', async ({ browser }) => {
    const context = await browser.newContext();
    const { page, newPage } = await openDemoForm(context);

    // Submit empty form
    await newPage.click('button[type="submit"]');
    await submitAndCheckEmptyError(newPage);
    await page.close();
  });

  test('handles invalid email scenario', async ({ browser }) => {
    const context = await browser.newContext();
    const { page, newPage } = await openDemoForm(context);

    await acceptTerms(newPage);
    await fillForm(newPage, 'Test User', 'invalid-email');
    await submitAndCheckInvalidEmailError(newPage);
    await page.close();
  });

  test('accepts valid input and shows success message', async ({ browser }) => {
    const context = await browser.newContext();
    const { page, newPage } = await openDemoForm(context);

    await acceptTerms(newPage);
    await fillForm(newPage, 'Test User', 'test@example.com');
    await drawSignature(newPage);
    await submitAndCheckSuccess(newPage);
    await page.close();
  });

});
