import { test, expect } from '@playwright/test';

test('CT01 - Acesso e Navegação na Landing Page', async ({ page }) => {
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });

  // Hero principal (heading de destaque)
  const heroHeading = page.getByRole('heading', { level: 1 });
  await expect(heroHeading).toBeVisible();

  // Seções chave da landing (ajuste se os textos forem diferentes)
  await expect(page.getByText(/Especificações/i)).toBeVisible();
  await expect(page.getByText(/FAQ/i)).toBeVisible();

  // CTA para configurar ou reservar o veículo
  const cta = page.getByTestId('hero-cta-primary');
  await expect(cta).toBeVisible();

  await page.screenshot({ path: 'evidencias/ct01-landing-page.png', fullPage: true });

  await cta.click();

  // Deve navegar para o configurador
  await page.waitForLoadState('networkidle');
  await expect(page).toHaveURL(/\/configure/);

  await page.screenshot({ path: 'evidencias/ct01-configurador-page.png', fullPage: true });
});
