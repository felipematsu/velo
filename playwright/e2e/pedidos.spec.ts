import { test, expect } from '../support/fixtures';
import { generateOrderCode } from '../support/helpers';

/// AAA - Arrange, Act, Assert

test.describe('Consulta de Pedido', () => {
  test.beforeEach(async ({ app, page }) => {
    await app.orderLockup.open();
  });

  test('deve consultar um pedido aprovado', async ({ app }) => {
    // Test Data
    const order = {
      number: 'VLO-680LJF',
      status: 'APROVADO' as const,
      color: 'Lunar White',
      wheels: 'aero Wheels',
      customer: {
        name: 'Papito Matsumoto',
        email: 'email@email.com',
      },
      payment: 'À Vista',
    };

    await app.orderLockup.searchOrder(order.number);
    await app.orderLockup.validateOrderDetails(order);
    await app.orderLockup.validateStatusBadge(order.status);
  });

  test('deve consultar um pedido reprovado', async ({ app }) => {
    // Test Data
    const order = {
      number: 'VLO-6YCTVS',
      status: 'REPROVADO' as const,
      color: 'Midnight Black',
      wheels: 'sport Wheels',
      customer: {
        name: 'Steve Outro',
        email: 'felipe@email.com',
      },
      payment: 'À Vista',
    };

    await app.orderLockup.searchOrder(order.number);
    await app.orderLockup.validateOrderDetails(order);
    await app.orderLockup.validateStatusBadge(order.status);
  });

  test('deve consultar um pedido em analise', async ({ app }) => {
    // Test Data
    const order = {
      number: 'VLO-F8U4SU',
      status: 'EM_ANALISE' as const,
      color: 'Lunar White',
      wheels: 'aero Wheels',
      customer: {
        name: 'joao da silva',
        email: 'joao@velo.dev',
      },
      payment: 'À Vista',
    };

    await app.orderLockup.searchOrder(order.number);
    await app.orderLockup.validateOrderDetails(order);
    await app.orderLockup.validateStatusBadge(order.status);
  });

  test('deve exibir mensagem quando o pedido não é encontrado', async ({ app }) => {
    const order = generateOrderCode();
    await app.orderLockup.searchOrder(order);
    await app.orderLockup.validateOrderNotFound();
  });

  test('deve exibir mensagem quando o pedido em qualquer formato não é encontrado', async ({ app }) => {
    await app.orderLockup.searchOrder('ABC123');
    await app.orderLockup.validateOrderNotFound();
  });

  test('deve manter o botão de busca desabilitado com campo vazio ou apenas espaços', async ({ app, page }) => {
    const button = app.orderLockup.elements.searchButton;
    await expect(button).toBeDisabled();

    await app.orderLockup.elements.orderInput.fill('   ');
    await expect(button).toBeDisabled();
  });
});