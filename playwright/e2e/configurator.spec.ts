import { test, expect } from '@playwright/test';

test.describe('CT02 - Configuração do veículo', () => {

  test.beforeEach(async ({ page }) => {
    // Arrange - acessar landing e ir para o configurador
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
    await expect(page).toHaveTitle(/Velô by Papito/);

    const heroCta = page.getByTestId('hero-cta-primary');
    await expect(heroCta).toBeVisible();
    await heroCta.click();

    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/\/configure/);
  });

  test('Deve atualizar a imagem do veículo e manter o preço base ao trocar a cor', async ({ page }) => {
    const totalPrice = page.getByTestId('total-price');
    const car = page.locator('img[alt^="Velô Sprint"]');

    // Passo 1 - verificação do preço inicial de venda
    await expect(totalPrice).toHaveText('R$ 40.000,00');

    // Passo 2 - alterar apenas a cor (preço não deve mudar)
    const midnightBlackColor = page.getByTestId('color-option-midnight-black');
    await expect(midnightBlackColor).toBeVisible();
    await midnightBlackColor.click();

    await expect(totalPrice).toHaveText('R$ 40.000,00');

    await expect(car).toHaveAttribute('src', '/src/assets/midnight-black-aero-wheels.png');
  });

  test('Deve atualizar a imagem do veículo e recalcular o preço final ao trocar as rodas', async ({ page }) => {
    const totalPrice = page.getByTestId('total-price');
    const car = page.locator('img[alt^="Velô Sprint"]');
    // Passo 1 - verificação do preço inicial de venda
    await expect(totalPrice).toHaveText('R$ 40.000,00');

    // Passo 3 - selecionar rodas "Sport Wheels" (+ R$ 2.000)
    const sportWheels = page.getByTestId('wheel-option-sport');

    await expect(sportWheels).toBeVisible();
    await sportWheels.click();

    await expect(totalPrice).toHaveText('R$ 42.000,00');

    await expect(car).toHaveAttribute('src', '/src/assets/glacier-blue-sport-wheels.png');

    // Passo 4 - voltar para "Aero Wheels" (preço volta ao base)
    const aeroWheels = page.getByTestId('wheel-option-aero');
    await expect(aeroWheels).toBeVisible();
    await aeroWheels.click();

    await expect(totalPrice).toHaveText('R$ 40.000,00');

    await expect(car).toHaveAttribute('src', '/src/assets/glacier-blue-aero-wheels.png');
  });

});

