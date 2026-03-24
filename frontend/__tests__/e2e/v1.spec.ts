import { test, expect } from '@playwright/test';

test.describe('Taskex V1 - Legacy Task Input', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173');
  });

  test('should allow typing into the input field', async ({ page }) => {
    const input = page.getByTestId('task-name-string');
    await input.fill('homework');
    await expect(input).toHaveValue('homework');
  });

  test('Add button should be disabled for short text (under= 3 chars)', async ({ page }) => {
    const input = page.getByTestId('task-name-string');
    const addButton = page.getByTestId('task-name-add');
    await input.fill('Hi');
    await expect(addButton).toBeDisabled();
  });

  test('should show the added task in the list', async ({ page, browserName }) => {
    // This unique identifier is needed, since webkit could interfere other browsers or other way around
    const uniqueTask = `Unique-${browserName}-${Date.now()}`;
    await page.getByTestId('task-name-string').fill(uniqueTask);
    await page.getByTestId('task-name-add').click();

    // Locate the ul list and get the first element, since the tasks are arranged like that
    const firstList = page.locator('ul').first();
    await expect(firstList).toContainText(uniqueTask);
  });

  test('should edit the task using a prompt', async ({ page, browserName }) => {
    const task = `EditMe-${browserName}-${Date.now()}`;
    const updatedTask = `Done-${browserName}-${Date.now()}`;

    await page.getByTestId('task-name-string').fill(task);
    await page.getByTestId('task-name-add').click();

    const firstList = page.locator('ul').first();

    // use firstList as an refernce to only search inside the list itself, but not outside
    const taskItem = firstList.locator('li').filter({ hasText: task });

    // needed for alert, since when a task will be edited, an alert comes to shine
    page.once('dialog', async dialog => {
      await dialog.accept(updatedTask);
    });

    await taskItem.getByTestId("task-name-edit").click();

    await expect(firstList).toContainText(updatedTask);
    await expect(firstList).not.toContainText(task);
  });

  test('should delete the task', async ({ page, browserName }) => {
    const deleteBtnTask = `DeleteMe-${browserName}-${Date.now()}`;

    await page.getByTestId('task-name-string').fill(deleteBtnTask);
    await page.getByTestId('task-name-add').click();

    const firstList = page.locator('ul').first();
    const taskItem = firstList.locator('li').filter({ hasText: deleteBtnTask });

    await taskItem.getByTestId("task-name-delete").click();

    await expect(firstList).not.toContainText(deleteBtnTask);
  });
});