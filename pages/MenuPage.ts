import { expect, Locator, Page } from '@playwright/test';

export class MenuPage {
  readonly page: Page;
  readonly menuButton: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.menuButton = page.getByRole('button', { name: 'Open Menu' });
    this.logoutLink = page.locator('[data-test="logout-sidebar-link"]');
  }

  async openMenu() {
    await this.menuButton.click();
  }

  async logout() {
    await this.logoutLink.click();
  }
}