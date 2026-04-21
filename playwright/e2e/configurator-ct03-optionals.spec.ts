import { test, expect } from '../support/fixtures';

test.describe('CT03 - Opcionais e cálculo de preço', () => {
  test.beforeEach(async ({ app }) => {
    await app.configurator.openFromLanding();
  });

  test('Deve atualizar o preço com opcionais, restaurar o base e persistir no checkout', async ({
    page,
    app,
  }) => {
    const { configurator, checkout } = app;

    await expect(page).toHaveURL(/\/configure/);
    await configurator.expectTotalPrice('R$ 40.000,00');

    await configurator.checkOptional('Precision Park');
    await configurator.expectTotalPrice('R$ 45.500,00');

    await configurator.checkOptional('Flux Capacitor');
    await configurator.expectTotalPrice('R$ 50.500,00');

    await configurator.uncheckOptional('Precision Park');
    await configurator.uncheckOptional('Flux Capacitor');
    await configurator.expectTotalPrice('R$ 40.000,00');

    await configurator.finishConfigurator();
    await checkout.expectSummaryTotal('R$ 40.000,00');
  });
});
