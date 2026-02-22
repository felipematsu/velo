import { Page } from '@playwright/test'

export class NavbarComponent {
  constructor(private page: Page) {}

  async orderLockupLink() {
    await this.page.getByRole('link', { name: 'Consultar Pedido' }).click()
  }
}
