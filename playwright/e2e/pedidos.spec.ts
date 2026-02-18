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
        // const order = 'VLO-680LJF';
        const order = {
          number: 'VLO-680LJF',
          status: 'APROVADO',
          color: 'Lunar White',
          wheels: 'aero Wheels',
          customer: {
            name: 'Papito Matsumoto',
            email: 'email@email.com'
          },
          payment: 'À Vista'
        }

        // Act
        await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(order.number); // xpath - //label[text()='Número do Pedido']/..//input
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
        // const containerPedido = page.getByRole('paragraph')
        //   .filter({ hasText: /^Pedido$/ })
        //   .locator('..') // Sobe para o elemento pai (a div que agrupa ambos)
      
        // await expect(containerPedido).toContainText(order, { timeout: 10_000 });
        await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
          - img
          - paragraph: Pedido
          - paragraph: ${order.number}
          - img
          - text: ${order.status}
          - img "Velô Sprint"
          - paragraph: Modelo
          - paragraph: Velô Sprint
          - paragraph: Cor
          - paragraph: ${order.color}
          - paragraph: Interior
          - paragraph: cream
          - paragraph: Rodas
          - paragraph: ${order.wheels}
          - heading "Dados do Cliente" [level=4]
          - paragraph: Nome
          - paragraph: ${order.customer.name}
          - paragraph: Email
          - paragraph: ${order.customer.email}
          - paragraph: Loja de Retirada
          - paragraph
          - paragraph: Data do Pedido
          - paragraph: /\\d+\\/\\d+\\/\\d+/
          - heading "Pagamento" [level=4]
          - paragraph: ${order.payment}
          - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
          `);
      
      //   await expect(page.getByTestId('order-result-id')).toBeVisible({ timeout: 30000 });
      //   await expect(page.getByTestId('order-result-id')).toContainText('VLO-680LJF');
      //   await expect(page.getByTestId('order-result-status')).toBeVisible();
      //   await expect(page.getByTestId('order-result-status')).toContainText('APROVADO');
      });

      test('deve consultar um pedido reprovado', async ({ page }) => {

        // Test Data
        // const order = 'VLO-6YCTVS';
        const order = {
          number: 'VLO-6YCTVS',
          status: 'REPROVADO',
          color: 'Midnight Black',
          wheels: 'sport Wheels',
          customer: {
            name: 'Steve Outro',
            email: 'felipe@email.com'
          },
          payment: 'À Vista'
        }

        // Act
        await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(order.number); // xpath - //label[text()='Número do Pedido']/..//input
        await page.getByRole('button', { name: 'Buscar Pedido' }).click();
      
        // Assert
        await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
          - img
          - paragraph: Pedido
          - paragraph: ${order.number}
          - img
          - text: ${order.status}
          - img "Velô Sprint"
          - paragraph: Modelo
          - paragraph: Velô Sprint
          - paragraph: Cor
          - paragraph: ${order.color}
          - paragraph: Interior
          - paragraph: cream
          - paragraph: Rodas
          - paragraph: ${order.wheels}
          - heading "Dados do Cliente" [level=4]
          - paragraph: Nome
          - paragraph: ${order.customer.name}
          - paragraph: Email
          - paragraph: ${order.customer.email}
          - paragraph: Loja de Retirada
          - paragraph
          - paragraph: Data do Pedido
          - paragraph: /\\d+\\/\\d+\\/\\d+/
          - heading "Pagamento" [level=4]
          - paragraph: ${order.payment}
          - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
          `);
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

