const { expect } = require('@playwright/test');
const env = require('../config/env.js');

export async function fillForm(page, { name, email, phone, dob, password, gender }) {
  if (name) await page.fill('#name-input', name);
  if (email) await page.fill('#email-input', email);
  if (phone) await page.fill('input[name="phone"]', phone);
  if (dob) await page.fill('input[name="dob"]', dob);
  if (password) await page.fill('input[name="password"]', password);
  if (gender) await page.selectOption('#gender-select', gender);
}

export async function submitForm(page) {
  await page.click('button[type="submit"]');
}

export async function drawSignature(page) {
  const canvas = page.locator('#signature-canvas');
  const box = await canvas.boundingBox();
  if (box) {
    await page.mouse.move(box.x + 10, box.y + 10);
    await page.mouse.down();
    await page.mouse.move(box.x + 50, box.y + 50);
    await page.mouse.up();
  }
}

export async function clearSignature(page) {
  await page.click('.clear-btn');
}

export async function expectFieldError(page, selector, expectedText) {
  const errorLocator = page.locator(selector).locator('..').locator('.error-text');
  await expect(errorLocator).toHaveText(expectedText);
}

export async function expectNoErrors(page) {
  await expect(page.locator('.error-text')).toHaveCount(0);
}

export async function getSignatureDataLength(page) {
  return await page.evaluate(() =>
    document.getElementById('signature-canvas').toDataURL().length
  );
}