import { test, expect } from '@playwright/test'

import { generateOrderCode } from '../support/helpers'
import { NavbarComponent } from '../support/components/NavbarComponent'
import { LandingPage } from '../support/pages/LandingPage'
import { OrderLockupPage } from '../support/pages/OrderLockupPage'

/// AAA - Arrange, Act, Assert

test.describe('Consulta de Pedido', () => {

  let orderLockupPage: orderLockupPage;

  test.beforeEach(async ({ page }) => {
    await new LandingPage(page).goto()
    await new NavbarComponent(page).orderLockupLink()

    orderLockupPage = new OrderLockupPage(page);

    await expect(page.getByRole('heading')).toContainText('Consultar Pedido')
  })

  test('deve consultar um pedido aprovado', async ({ page }) => {

    // Test Data
    const order = {
      number: 'VLO-680LJF',
      status: 'APROVADO' as const,
      color: 'Lunar White',
      wheels: 'aero Wheels',
      customer: {
          name: 'Papito Matsumoto',
          email: 'email@email.com'
      },
      payment: 'À Vista'
    }
 
    await orderLockupPage.searchOrder(order.number)

    await orderLockupPage.validateOrderDetails(order);

    await orderLockupPage.validateStatusBadge(order.status)

  })

  test('deve consultar um pedido reprovado', async ({ page }) => {

    // Test Data
    const order = {
      number: 'VLO-6YCTVS',
      status: 'REPROVADO' as const,
      color: 'Midnight Black',
      wheels: 'sport Wheels',
      customer: {
          name: 'Steve Outro',
          email: 'felipe@email.com'
      },
      payment: 'À Vista'
    }

    await orderLockupPage.searchOrder(order.number)

    await orderLockupPage.validateOrderDetails(order);

    await orderLockupPage.validateStatusBadge(order.status)
  })

  test('deve consultar um pedido em analise', async ({ page }) => {

    // Test Data
    const order = {
      number: 'VLO-F8U4SU',
      status: 'EM_ANALISE' as const,
      color: 'Lunar White',
      wheels: 'aero Wheels',
      customer: {
          name: 'joao da silva',
          email: 'joao@velo.dev'
      },
      payment: 'À Vista'
    }

    await orderLockupPage.searchOrder(order.number)

    await orderLockupPage.validateOrderDetails(order);

    await orderLockupPage.validateStatusBadge(order.status)
  })

  test('deve exibir mensagem quando o pedido não é encontrado', async ({ page }) => {

    const order = generateOrderCode()

    await orderLockupPage.searchOrder(order)


    await orderLockupPage.validateOrderNotFound();

  })

  test('deve exibir mensagem quando o pedido em qualquer formato não é encontrado', async ({ page }) => {
    await orderLockupPage.searchOrder('ABC123')


    await orderLockupPage.validateOrderNotFound();

  })
})