import { test, expect } from '@playwright/test';

test.describe('CT02 - Checkout - Validação de campos obrigatórios', () => {
  test('deve bloquear envio com campos obrigatórios inválidos', async ({ page }) => {
    // Arrange - chegar até o checkout a partir da landing
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
    await expect(page).toHaveTitle(/Velô by Papito/);

    // Ir para o configurador pelo CTA principal
    const heroCta = page.getByTestId('hero-cta-primary');
    await expect(heroCta).toBeVisible();
    await heroCta.click();

    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/\/configure/);

    // Avançar para o checkout
    const checkoutButton = page.getByTestId('checkout-button');
    await expect(checkoutButton).toBeVisible();
    await checkoutButton.click();

    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/\/order/);
    await expect(page.getByRole('heading', { name: 'Dados Pessoais' })).toBeVisible();

    const nomeInput = page.getByLabel('Nome');
    const sobrenomeInput = page.getByLabel('Sobrenome');
    const emailInput = page.getByLabel('Email');
    const telefoneInput = page.getByLabel('Telefone');
    const cpfInput = page.getByLabel('CPF');
    const confirmarButton = page.getByRole('button', { name: 'Confirmar Pedido' });

    // Passo 1 - Nome vazio ou com 1 caractere
    await nomeInput.fill('A');
    await confirmarButton.click();

    await expect(page.getByText('Nome deve ter pelo menos 2 caracteres')).toBeVisible();
    await expect(page.getByText('Sobrenome deve ter pelo menos 2 caracteres')).toBeVisible();
    await expect(page.getByText('Email inválido')).toBeVisible();
    await expect(page.getByText('Telefone inválido')).toBeVisible();
    await expect(page.getByText('CPF inválido')).toBeVisible();
    await expect(page.getByText('Selecione uma loja')).toBeVisible();
    await expect(page.getByText('Aceite os termos')).toBeVisible();
    await expect(page).toHaveURL(/\/order/);

    // Passo 2 - Email com formato inválido (ex: teste@)
    await nomeInput.fill('Ana');
    await sobrenomeInput.fill('Silva');
    await emailInput.fill('teste@');
    await telefoneInput.fill('');
    await cpfInput.fill('');

    await confirmarButton.click();

    await expect(page.getByText('Email inválido')).toBeVisible();
    await expect(page).toHaveURL(/\/order/);

    // Passo 3 - CPF incompleto ou vazio
    await cpfInput.fill('');
    await confirmarButton.click();
    await expect(page.getByText('CPF inválido')).toBeVisible();
    await expect(page).toHaveURL(/\/order/);

    // Passo 4 - Loja para retirada não selecionada
    await confirmarButton.click();
    await expect(page.getByText('Selecione uma loja')).toBeVisible();

    // Passo 5 - Termos não aceitos
    await expect(page.getByText('Aceite os termos')).toBeVisible();

    // Passo 6 - Pedido não deve ser criado (continua na mesma página)
    await expect(page).toHaveURL(/\/order/);
  });
});

