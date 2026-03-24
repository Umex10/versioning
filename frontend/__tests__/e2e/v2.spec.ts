import { test, expect } from '@playwright/test';

test.describe('Taskex V2 - Modern Task Input', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173');
  });

  test('should allow typing into the input field', async ({ page }) => {
    const input = page.getByTestId('task-title-name');
    await input.fill('homework');
    await expect(input).toHaveValue('homework');
  });

  test('Add button should be disabled for short text (under= 3 chars)', async ({ page }) => {
    const input = page.getByTestId('task-title-name');
    const addButton = page.getByTestId('task-title-add');
    await input.fill('Hi');
    await expect(addButton).toBeDisabled();
  });

  test('should show the added task in the list', async ({ page, browserName }) => {
    // unique identifier as in v1 test
    const uniqueTask = `UniqueV2-${browserName}-${Date.now()}`;
    await page.getByTestId('task-title-name').fill(uniqueTask);
    await page.getByTestId('task-title-add').click();

    const secondList = page.locator('ul').last();
    await expect(secondList).toContainText(uniqueTask);
  });

  test('should edit the task using a prompt', async ({ page, browserName }) => {
    const task = `EditMeV2-${browserName}-${Date.now()}`;
    const updatedTask = `DoneV2-${browserName}-${Date.now()}`;

    await page.getByTestId('task-title-name').fill(task);
    await page.getByTestId('task-title-add').click();

    // Since we have two lists rendered on the left side and right side
    const secondList = page.locator('ul').last();
    const taskItem = secondList.locator('li').filter({ hasText: task });

    // alert
    page.once('dialog', async dialog => {
      await dialog.accept(updatedTask);
    });

    await taskItem.getByTestId("task-title-edit").click();

    await expect(secondList).toContainText(updatedTask);
    await expect(secondList).not.toContainText(task);
  });

  test('should check the task', async ({ page, browserName }) => {
    const checkTask = `CheckMeV2-${browserName}-${Date.now()}`;

    await page.getByTestId('task-title-name').fill(checkTask);
    await page.getByTestId('task-title-add').click();

    const secondList = page.locator('ul').last();
    const taskItem = secondList.locator('li').filter({ hasText: checkTask });

    await taskItem.getByTestId("task-title-check").click();

    const taskText = taskItem.locator('span').first();
    await expect(taskText).toHaveClass(/line-through/);
  });

  test('should delete the task', async ({ page, browserName }) => {
    const deleteBtnTask = `DeleteMeV2-${browserName}-${Date.now()}`;

    await page.getByTestId('task-title-name').fill(deleteBtnTask);
    await page.getByTestId('task-title-add').click();

    const secondList = page.locator('ul').last();
    const taskItem = secondList.locator('li').filter({ hasText: deleteBtnTask });

    await taskItem.getByTestId("task-title-delete").click();

    await expect(secondList).not.toContainText(deleteBtnTask);
  });
});