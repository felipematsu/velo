import { test, expect } from '@playwright/test';

// AAA - Arrange, Act, Assert
// PAV - Preparar, Agir, Verificar

test('deve consultar um pedido aprovado', async ({ page }) => {
  // Arrange
  await page.goto('http://localhost:5173/');
  await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint');

  await page.getByRole('link', { name: 'Consultar Pedido' }).click();    // a[href='/lookup'] - css selector    //a[text()='Consultar Pedido'] - xpath
  await expect(page.getByRole('heading')).toContainText('Consultar Pedido');

  // Act
  await page.getByRole('textbox', { name: 'Número do Pedido' }).fill('VLO-680LJF'); // xpath - //label[text()='Número do Pedido']/..//input
  // await page.getByTestId('search-order-button').click();
  await page.getByRole('button', { name: 'Buscar Pedido' }).click();

  // Assert
  await expect(page.getByTestId('order-result-id')).toBeVisible({ timeout: 30000 });
  await expect(page.getByTestId('order-result-id')).toContainText('VLO-680LJF');
  await expect(page.getByTestId('order-result-status')).toBeVisible();
  await expect(page.getByTestId('order-result-status')).toContainText('APROVADO');
});