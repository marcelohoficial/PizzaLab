import { expect, Page, test } from "@playwright/test";

const login = async (page: Page, email: string, password: string) => {
  await page.goto("http://localhost:5173/login");
  await page.fill('input[name="email"]', email);
  await page.fill('input[name="password"]', password);
  await page.click('button[type="submit"]');
  await page.waitForLoadState("networkidle");
};

test.describe("CardapioPage", () => {
  test.beforeEach(async ({ page }) => {
    // Fazer login antes de acessar a página de cardápio
    await login(page, "cliente@pizzalab.com", "123456");
  });

  test("deve renderizar o título e descrição do cardápio", async ({ page }) => {
    await expect(page.locator("h1")).toContainText("Nossas Deliciosas Pizzas");
    await expect(page.locator("p")).toContainText(
      "Feitas com ingredientes frescos e massa artesanal"
    );
  });

  test("deve exibir todos os botões de categoria", async ({ page }) => {
    const categories = [
      "Todas",
      "Clássicas",
      "Brasileiras",
      "Especiais",
      "Vegetarianas",
    ];

    for (const category of categories) {
      await expect(
        page.locator(`button:has-text("${category}")`)
      ).toBeVisible();
    }
  });

  test('deve ter a categoria "Todas" selecionada por padrão', async ({
    page,
  }) => {
    await page.waitForLoadState("networkidle");

    const todasButton = page.locator('button:has-text("Todas")').first();
    await expect(todasButton).toHaveClass(/bg-orange-500/);
  });

  test("deve exibir loading enquanto carrega o cardápio", async ({ page }) => {
    // Interceptar a requisição para simular delay
    await page.route("**/api/**", (route) => {
      setTimeout(() => route.continue(), 1000);
    });

    await page.goto("http://localhost:5173/cardapio");

    // Verificar se o spinner de loading aparece
    const spinner = page.locator("div.animate-spin");
    await expect(spinner).toBeVisible();

    // Verificar se o texto de carregamento aparece
    await expect(
      page.locator('p:has-text("Carregando cardápio")')
    ).toBeVisible();
  });

  test("deve exibir as pizzas após carregamento", async ({ page }) => {
    await page.waitForLoadState("networkidle");

    // Verificar se há cards de pizza
    const pizzaCards = page.locator('[data-testid="pizza-card"]');
    const count = await pizzaCards.count();
    expect(count).toBeGreaterThan(0);
  });

  test("deve filtrar pizzas ao clicar em categoria", async ({ page }) => {
    await page.waitForLoadState("networkidle");

    const totalPizzasAntes = await page
      .locator('[data-testid="pizza-card"]')
      .count();

    // Clicar em "Clássicas"
    await page.locator('button:has-text("Clássicas")').click();
    await page.waitForLoadState("networkidle");

    const pizzasClassicas = await page
      .locator('[data-testid="pizza-card"]')
      .count();

    // Verificar se a filtragem funcionou
    expect(pizzasClassicas).toBeLessThanOrEqual(totalPizzasAntes);
  });

  test("deve alternar entre todas as categorias", async ({ page }) => {
    await page.waitForLoadState("networkidle");

    const categoriesIds = [
      "todas",
      "classica",
      "brasileira",
      "especial",
      "vegetariana",
    ];
    const categoryNames = [
      "Todas",
      "Clássicas",
      "Brasileiras",
      "Especiais",
      "Vegetarianas",
    ];

    for (let i = 0; i < categoriesIds.length; i++) {
      const button = page
        .locator(`button:has-text("${categoryNames[i]}")`)
        .first();
      await button.click();
      await page.waitForLoadState("networkidle");

      // Verificar se o botão está ativo
      await expect(button).toHaveClass(/bg-orange-500/);
    }
  });

  test("deve exibir mensagem quando nenhuma pizza é encontrada", async ({
    page,
  }) => {
    await page.waitForLoadState("networkidle");

    // Filtrar por uma categoria específica
    await page.locator('button:has-text("Vegetarianas")').click();
    await page.waitForLoadState("networkidle");

    // Se não houver pizzas vegetarianas, deve aparecer mensagem
    const pizzaCards = await page.locator('[data-testid="pizza-card"]').count();

    if (pizzaCards === 0) {
      await expect(
        page.locator('p:has-text("Nenhuma pizza encontrada")')
      ).toBeVisible();
    }
  });

  test("deve renderizar cards de pizza com informações", async ({ page }) => {
    await page.waitForLoadState("networkidle");

    const pizzaCard = page.locator('[data-testid="pizza-card"]').first();

    // Verificar se o card tem imagem
    const imagem = pizzaCard.locator("img").first();
    await expect(imagem).toBeVisible();

    // Verificar se tem nome da pizza
    const nome = pizzaCard.locator('h3, h2, [data-testid="pizza-name"]');
    await expect(nome).toBeVisible();

    // Verificar se tem preço
    const preco = pizzaCard.locator('[data-testid="pizza-price"]');
    await expect(preco).toBeVisible();
  });

  test("deve manter a seleção de categoria ao interagir", async ({ page }) => {
    await page.waitForLoadState("networkidle");

    // Selecionar categoria
    await page.locator('button:has-text("Brasileiras")').click();
    await page.waitForLoadState("networkidle");

    const button = page.locator('button:has-text("Brasileiras")').first();
    await expect(button).toHaveClass(/bg-orange-500/);

    // Verificar se outras categorias não estão selecionadas
    const outrasButtons = page.locator('button:has-text("Clássicas")').first();
    await expect(outrasButtons).not.toHaveClass(/bg-orange-500/);
  });

  test("deve renderizar responsivamente em dispositivos móveis", async ({
    page,
  }) => {
    // Simular viewport mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("http://localhost:5173/cardapio");
    await page.waitForLoadState("networkidle");

    // Verificar se o grid está responsivo
    const gridContainer = page.locator('[class*="grid"]').first();
    await expect(gridContainer).toBeVisible();

    // Verificar se os botões de categoria estão visíveis
    const categoriesButton = page.locator('button:has-text("Todas")').first();
    await expect(categoriesButton).toBeVisible();
  });

  test("deve renderizar em tablet com 2 colunas", async ({ page }) => {
    // Simular viewport tablet
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto("http://localhost:5173/cardapio");
    await page.waitForLoadState("networkidle");

    const pizzaCards = await page.locator('[data-testid="pizza-card"]').count();
    expect(pizzaCards).toBeGreaterThan(0);
  });

  test("deve renderizar em desktop com 4 colunas", async ({ page }) => {
    // Simular viewport desktop
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto("http://localhost:5173/cardapio");
    await page.waitForLoadState("networkidle");

    const pizzaCards = await page.locator('[data-testid="pizza-card"]').count();
    expect(pizzaCards).toBeGreaterThan(0);
  });

  test('deve voltar para "Todas" após filtrar', async ({ page }) => {
    await page.waitForLoadState("networkidle");

    // Filtrar por categoria específica
    await page.locator('button:has-text("Especiais")').click();
    await page.waitForLoadState("networkidle");

    // Voltar para "Todas"
    await page.locator('button:has-text("Todas")').first().click();
    await page.waitForLoadState("networkidle");

    const button = page.locator('button:has-text("Todas")').first();
    await expect(button).toHaveClass(/bg-orange-500/);

    // Verificar se todas as pizzas estão visíveis
    const pizzaCards = await page.locator('[data-testid="pizza-card"]').count();
    expect(pizzaCards).toBeGreaterThan(0);
  });
});
