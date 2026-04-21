import { test, expect } from '../support/fixtures';

test.describe('CT03 - Opcionais e cálculo de preço', () => {
  test.beforeEach(async ({ app }) => {
    await app.configurator.openFromLanding();
  });

  test('Deve atualizar o preço com opcionais, restaurar o base e persistir no checkout', async ({
    page,
    app,
  }) => {
    const { configurator } = app;
    const opcionais = page.getByTestId('section-opcionais');

    await expect(page).toHaveURL(/\/configure/);
    await configurator.expectTotalPrice('R$ 40.000,00');

    const precisionCheckbox = opcionais
      .locator('label')
      .filter({ hasText: 'Precision Park' })
      .getByRole('checkbox');
    const fluxCheckbox = opcionais
      .locator('label')
      .filter({ hasText: 'Flux Capacitor' })
      .getByRole('checkbox');

    await expect(precisionCheckbox).toBeVisible();
    await precisionCheckbox.check();
    await configurator.expectTotalPrice('R$ 45.500,00');

    await expect(fluxCheckbox).toBeVisible();
    await fluxCheckbox.check();
    await configurator.expectTotalPrice('R$ 50.500,00');

    await precisionCheckbox.uncheck();
    await fluxCheckbox.uncheck();
    await configurator.expectTotalPrice('R$ 40.000,00');

    await page.getByRole('button', { name: 'Monte o Seu' }).click();
    await expect(page).toHaveURL(/\/order/);

    const summaryTotal = page.getByTestId('summary-total-price');
    await expect(summaryTotal).toBeVisible();
    await expect(summaryTotal).toHaveText('R$ 40.000,00');
  });
});
