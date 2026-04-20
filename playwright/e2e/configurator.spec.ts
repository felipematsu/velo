import { test } from '../support/fixtures';

test.describe('CT02 - Configuração do veículo', () => {

  test.beforeEach(async ({ app }) => {
    await app.configurator.openFromLanding();
  });

  test('Deve atualizar a imagem do veículo e manter o preço base ao trocar a cor', async ({ app }) => {
    const { configurator } = app;

    await configurator.expectTotalPrice('R$ 40.000,00');

    await configurator.selectColor('midnight-black');

    await configurator.expectTotalPrice('R$ 40.000,00');
    await configurator.expectCarImageSrc('/src/assets/midnight-black-aero-wheels.png');
  });

  test('Deve atualizar a imagem do veículo e recalcular o preço final ao trocar as rodas', async ({ app }) => {
    const { configurator } = app;

    await configurator.expectTotalPrice('R$ 40.000,00');

    await configurator.selectWheels('sport');

    await configurator.expectTotalPrice('R$ 42.000,00');
    await configurator.expectCarImageSrc('/src/assets/glacier-blue-sport-wheels.png');

    await configurator.selectWheels('aero');

    await configurator.expectTotalPrice('R$ 40.000,00');
    await configurator.expectCarImageSrc('/src/assets/glacier-blue-aero-wheels.png');
  });

});
