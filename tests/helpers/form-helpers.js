const { expect } = require('@playwright/test');
const env = require('../config/env');

async function openDemoForm(context) {
  const page = await context.newPage();
  await page.goto(env.demoPageUrl);

  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    page.click(env.demoBtnSelector),
  ]);
  await newPage.waitForLoadState();
  return { page, newPage };
}

async function acceptTerms(newPage) {
  const frame = await newPage.frame({ url: /termsConditions/ });
  if (frame) {
    await frame.click('.icheckbox_minimal .iCheck-helper', { force: true });
  }
}

async function fillForm(newPage, name, email) {
  await newPage.fill('#input_4', name);
  await newPage.fill('#input_5', email);
}

async function drawSignature(newPage) {
  const signature = newPage.locator('canvas');
  const box = await signature.boundingBox();
  if (box) {
    await newPage.mouse.move(box.x + 10, box.y + 10);
    await newPage.mouse.down();
    await newPage.mouse.move(box.x + 100, box.y + 50);
    await newPage.mouse.up();
  }
}

async function submitAndCheckEmptyError(newPage) {
  await newPage.click('button[type="submit"]');
  const banner = newPage.locator(env.errorLocator);
  await expect(banner).toHaveText(env.emptyErrorMessage);
}

async function submitAndCheckInvalidEmailError(newPage) {
  await newPage.click('button[type="submit"]');
  const banner = newPage.locator(env.errorLocator);
  await expect(banner).toHaveText(env.invalidEmailMessage);
}

async function submitAndCheckSuccess(newPage) {
  await newPage.click('button[type="submit"]');
  await expect(newPage.locator(env.successMessageSelector)).toContainText("Thank You!");
}

module.exports = {
  openDemoForm,
  acceptTerms,
  fillForm,
  drawSignature,
  submitAndCheckEmptyError,
  submitAndCheckInvalidEmailError,
  submitAndCheckSuccess
};
