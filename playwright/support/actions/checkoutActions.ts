import { Page, expect } from '@playwright/test';

export function createCheckoutActions(page: Page) {
  return {
    async expectSummaryTotal(price: string) {
      const summaryTotal = page.getByTestId('summary-total-price');
      await expect(summaryTotal).toBeVisible();
      await expect(summaryTotal).toHaveText(price);
    },
  };
}
