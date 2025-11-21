import { expect, test } from "@playwright/test";

const mockUser = {
  valid: {
    email: "cliente@pizzalab.com",
    password: "123456",
  },
  invalid: {
    email: "invalido@pizzalab.com",
    password: "senhaerrada",
  },
};

describe("Página de Login", () => {
  test("validação de campos obrigatórios", async ({ page }) => {
    await page.goto("http://localhost:5173/login");
    const submitButton = page.locator('button[type="submit"]');
    await submitButton.click();
    await expect(page.locator("text=Campo obrigatório")).toBeVisible();
  });

  test("autenticação com usuário válido", async ({ page }) => {
    await page.goto("http://localhost:5173/login");
    await page.fill('input[name="email"]', mockUser.valid.email);
    await page.fill('input[name="password"]', mockUser.valid.password);
    await page.click('button[type="submit"]');

    // Aguardar redirecionamento para a página de Cardápio
    await page.waitForURL("http://localhost:5173/cardapio");
    expect(page.url()).toBe("http://localhost:5173/cardapio");
  });

  test("resposta do servidor para usuário inválido", async ({ page }) => {
    await page.goto("http://localhost:5173/login");
    await page.fill('input[name="email"]', mockUser.invalid.email);
    await page.fill('input[name="password"]', mockUser.invalid.password);
    await page.click('button[type="submit"]');

    // Verificar mensagem de erro
    await expect(page.locator("text=Credenciais inválidas")).toBeVisible();
  });
});
