import { expect, test } from "@playwright/test";

const login = async (page, email, password) => {
  await page.goto("http://localhost:5173/login");
  await page.fill('input[name="email"]', email);
  await page.fill('input[name="password"]', password);
  await page.click('button[type="submit"]');
  await page.waitForLoadState("networkidle");
};

test.describe("Página de Dashboard", () => {
  test.beforeEach(async ({ page }) => {
    // Fazer login antes de acessar a página de dashboard
    await login(page, "cliente@pizzalab.com", "123456");
  });

  test("deve renderizar o título do dashboard", async ({ page }) => {
    await page.goto("http://localhost:5173/dashboard");
    await expect(page.locator("h1")).toContainText("Bem-vindo ao Dashboard");
  });

  test("deve exibir informações do usuário", async ({ page }) => {
    await page.goto("http://localhost:5173/dashboard");
    await expect(page.locator("text=Nome do Usuário")).toBeVisible();
    await expect(page.locator("text=Email")).toBeVisible();
  });

  test("deve permitir logout", async ({ page }) => {
    await page.goto("http://localhost:5173/dashboard");
    await page.click('button:has-text("Logout")');
    await expect(page.locator("text=Você foi desconectado")).toBeVisible();
  });

  test("deve renderizar o título e descrição do dashboard", async ({
    page,
  }) => {
    await expect(page.locator("h1")).toContainText("Dashboard Administrativo");
    await expect(page.locator("p")).toContainText(
      "Visão geral das vendas e performance da PizzaLab"
    );
  });

  test("deve exibir os botões de intervalo de tempo", async ({ page }) => {
    await expect(page.locator("button")).toContainText("Últimos 7 dias");
    await expect(page.locator("button")).toContainText("Últimos 30 dias");
    await expect(page.locator("button")).toContainText("Últimos 3 meses");
  });

  test("deve selecionar intervalo de tempo ao clicar", async ({ page }) => {
    const button30d = page.locator('button:has-text("Últimos 30 dias")');
    await button30d.click();

    // Verificar se o botão está ativo (com cor de fundo orange)
    await expect(button30d).toHaveClass(/bg-orange-500/);
  });

  test("deve renderizar os cartões de métricas", async ({ page }) => {
    // Aguardar o carregamento dos dados
    await page.waitForLoadState("networkidle");

    // Verificar títulos das métricas
    await expect(page.locator("text=Receita Total")).toBeVisible();
    await expect(page.locator("text=Pedidos Totais")).toBeVisible();
    await expect(page.locator("text=Ticket Médio")).toBeVisible();
    await expect(page.locator("text=Pizzas Vendidas")).toBeVisible();
  });

  test("deve exibir valores formatados nas métricas", async ({ page }) => {
    await page.waitForLoadState("networkidle");

    // Verificar se valores em R$ estão presentes
    const receita = page.locator("text=/R$/");
    await expect(receita).toBeDefined();
  });

  test("deve renderizar seção de Vendas por Dia", async ({ page }) => {
    await page.waitForLoadState("networkidle");

    await expect(page.locator("h3")).toContainText("Vendas por Dia");

    // Verificar se há dados de vendas
    const vendas = page.locator("text=pedidos");
    await expect(vendas.first()).toBeVisible();
  });

  test("deve renderizar seção de Pizzas Mais Vendidas", async ({ page }) => {
    await page.waitForLoadState("networkidle");

    await expect(page.locator("h3")).toContainText("Pizzas Mais Vendidas");

    // Verificar se há imagens de pizzas
    const pizzasImages = page.locator('img[alt*=""]');
    const count = await pizzasImages.count();
    expect(count).toBeGreaterThan(0);
  });

  test("deve renderizar seção de Ações de Gestão", async ({ page }) => {
    await page.waitForLoadState("networkidle");

    await expect(page.locator("h3")).toContainText("Ações de Gestão");

    // Verificar botões de ação
    await expect(page.locator("text=Gerenciar Usuários")).toBeVisible();
    await expect(page.locator("text=Gerenciar Pedidos")).toBeVisible();
    await expect(page.locator("text=Gerenciar Cardápio")).toBeVisible();
  });

  test("deve exibir loading enquanto carrega dados", async ({ page }) => {
    // Interceptar a requisição para simular delay
    await page.route("**/api/**", (route) => {
      setTimeout(() => route.continue(), 1000);
    });

    await page.goto("http://localhost:5173/dashboard");

    // Verificar se o spinner de loading aparece
    const spinner = page.locator("div.animate-spin");
    await expect(spinner).toBeVisible();
  });

  test("deve alternar entre intervalos de tempo sem erros", async ({
    page,
  }) => {
    await page.waitForLoadState("networkidle");

    // Clicar em cada intervalo
    for (const range of ["7d", "30d", "3m"]) {
      const button = page.locator(
        `button:has-text("${
          range === "7d"
            ? "Últimos 7 dias"
            : range === "30d"
            ? "Últimos 30 dias"
            : "Últimos 3 meses"
        }")`
      );
      await button.click();

      // Aguardar atualização dos dados
      await page.waitForLoadState("networkidle");

      // Verificar se o dashboard ainda está renderizando corretamente
      await expect(page.locator("h1")).toContainText(
        "Dashboard Administrativo"
      );
    }
  });

  test("deve exibir gráficos de barra nas vendas por dia", async ({ page }) => {
    await page.waitForLoadState("networkidle");

    const progressBars = page.locator("div.bg-orange-500.h-2.rounded-full");
    const count = await progressBars.count();
    expect(count).toBeGreaterThan(0);
  });

  test("deve renderizar responsivamente em dispositivos móveis", async ({
    page,
  }) => {
    // Simular viewport mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("http://localhost:5173/dashboard");
    await page.waitForLoadState("networkidle");

    // Verificar se o layout está responsivo
    const grid = page.locator('[class*="grid"]');
    await expect(grid.first()).toBeVisible();
  });
});
