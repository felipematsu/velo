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
  const orderResult = page.locator('//p[text()="Pedido"]/..//p[text()="VLO-680LJF"]');
  await expect(orderResult).toBeVisible({ timeout: 30000 });
  await expect(orderResult).toContainText('VLO-680LJF');

  const orderStatus = page.locator('//div[text()="APROVADO"]');
  await expect(orderStatus).toBeVisible({ timeout: 30000 });
  await expect(orderStatus).toContainText('APROVADO');
});