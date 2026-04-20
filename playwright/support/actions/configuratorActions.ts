import { Page, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:5173';

export type ConfiguratorColorId = 'midnight-black';
export type ConfiguratorWheelId = 'sport' | 'aero';

export function createConfiguratorActions(page: Page) {

  const colorOption = (colorId: ConfiguratorColorId) =>
    page.getByTestId(`color-option-${colorId}`);

  const wheelOption = (wheelId: ConfiguratorWheelId) =>
    page.getByTestId(`wheel-option-${wheelId}`);

  return {
    async openFromLanding() {
      await page.goto(BASE_URL, { waitUntil: 'networkidle' });
      await expect(page).toHaveTitle(/Velô by Papito/);

      const heroCta = page.getByTestId('hero-cta-primary');
      await expect(heroCta).toBeVisible();
      await heroCta.click();

      await page.waitForLoadState('networkidle');
      await expect(page).toHaveURL(/\/configure/);
    },

    async selectColor(colorId: ConfiguratorColorId) {
      const option = colorOption(colorId);
      await expect(option).toBeVisible();
      await option.click();
    },

    async selectWheels(wheelId: ConfiguratorWheelId) {
      const option = wheelOption(wheelId);
      await expect(option).toBeVisible();
      await option.click();
    },

    async expectTotalPrice(price: string) {
      const totalPrice = page.getByTestId('total-price');
      await expect(totalPrice).toBeVisible();
      await expect(totalPrice).toHaveText(price);
    },

    async expectCarImageSrc(src: string) {
      const carImage = page.locator('img[alt^="Velô Sprint"]');
      await expect(carImage).toHaveAttribute('src', src);
    },
  };
}
