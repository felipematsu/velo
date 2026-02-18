import { test, expect } from '@playwright/test';
import { generateOrderCode } from '../support/helpers';

// AAA - Arrange, Act, Assert
// PAV - Preparar, Agir, Verificar

test.describe('Consulta de pedido', () => {
 
      test.beforeEach(async ({ page }) => {
            // Arrange
            await page.goto('http://localhost:5173/');
            await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint');

            await page.getByRole('link', { name: 'Consultar Pedido' }).click();
            await expect(page.getByRole('heading')).toContainText('Consultar Pedido');
      })
      

    test('deve consultar um pedido aprovado', async ({ page }) => {

        // Test Data
        const order = 'VLO-680LJF';

        // Act
        await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(order); // xpath - //label[text()='Número do Pedido']/..//input
        // await page.getByTestId('search-order-button').click();
        await page.getByRole('button', { name: 'Buscar Pedido' }).click();
      
        // Assert
      //   const orderResult = page.locator('//p[text()="Pedido"]/..//p[text()="VLO-680LJF"]');
      //   await expect(orderResult).toBeVisible({ timeout: 30000 });
      //   await expect(orderResult).toContainText('VLO-680LJF');
      
      //   const orderStatus = page.locator('//div[text()="APROVADO"]');
      //   await expect(orderStatus).toBeVisible({ timeout: 30000 });
      //   await expect(orderStatus).toContainText('APROVADO');
      
        // Solução do desafio
        const containerPedido = page.getByRole('paragraph')
          .filter({ hasText: /^Pedido$/ })
          .locator('..') // Sobe para o elemento pai (a div que agrupa ambos)
      
        await expect(containerPedido).toContainText(order, { timeout: 10_000 });
      
      //   await expect(page.getByTestId('order-result-id')).toBeVisible({ timeout: 30000 });
      //   await expect(page.getByTestId('order-result-id')).toContainText('VLO-680LJF');
      //   await expect(page.getByTestId('order-result-status')).toBeVisible();
      //   await expect(page.getByTestId('order-result-status')).toContainText('APROVADO');
      });
      
      test('deve exibir mensagem quando o pedido não é encontrado', async ({ page }) => {
          // Test Data
          const order = generateOrderCode();
      
          // Act
          await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(order); // xpath - //label[text()='Número do Pedido']/..//input
          await page.getByRole('button', { name: 'Buscar Pedido' }).click();
      
          await expect(page.locator('#root')).toContainText('Pedido não encontrado');
          await expect(page.locator('#root')).toContainText('Verifique o número do pedido e tente novamente');
      
          // const title = page.getByRole('heading', { name: 'Pedido não encontrado', level: 3 });
          // await expect(title).toBeVisible();
      
          // // const message = page.locator('//p[text()="Verifique o número do pedido e tente novamente"]');
          // const message = page.locator('p', { hasText: 'Verifique o número do pedido e tente novamente' });
          // await expect(message).toBeVisible();
      
          await expect(page.locator('#root')).toMatchAriaSnapshot(`
              - img
              - heading "Pedido não encontrado" [level=3]
              - paragraph: Verifique o número do pedido e tente novamente
              `);
      });
});

