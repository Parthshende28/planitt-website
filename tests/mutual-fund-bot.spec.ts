import { test, expect } from '@playwright/test';

test.describe('Mutual Fund Bot', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      window.sessionStorage.setItem('planitt_coming_soon_seen', '1');
    });
    await page.goto('/mutual-fund-bot');
  });

  test('should complete the bot flow and show divided investment split', async ({ page }) => {
    // 1. Select Goal: Wealth Creation
    const wealthCreationBtn = page.getByRole('button', { name: 'Wealth Creation' });
    await expect(wealthCreationBtn).toBeVisible();
    await wealthCreationBtn.click();

    // 2. Select Horizon: 5 years (default is 5, just click next)
    const nextHorizonBtn = page.getByRole('button', { name: 'Next', exact: true });
    await expect(nextHorizonBtn).toBeVisible();
    await nextHorizonBtn.click();

    // 3. Select Risk: Moderate (default is moderate, click it to move to next step)
    const moderateRiskBtn = page.getByRole('button', { name: 'moderate' });
    await expect(moderateRiskBtn).toBeVisible();
    await moderateRiskBtn.click();

    // 4. Enter Total Investment amount
    const totalInvestInput = page.locator('input[type="number"]').first();
    await expect(totalInvestInput).toBeVisible();
    await totalInvestInput.fill('5000');

    // 5. Click "Get suggestions"
    const getSuggestionsBtn = page.getByRole('button', { name: 'Get suggestions' });
    await expect(getSuggestionsBtn).toBeVisible();
    await getSuggestionsBtn.click();

    // 6. Verify Results
    const resultsTitle = page.getByRole('heading', { name: 'Top matches for you' });
    await expect(resultsTitle).toBeVisible();

    // 7. Check if there are 5 fund suggestions
    const fundCards = page.locator('.rounded-xl.border.border-gray-200.dark\\:border-gray-800.bg-gray-50.dark\\:bg-gray-900\\/40.p-4');
    await expect(fundCards).toHaveCount(5);

    // 8. Verify each card shows ₹1,000 (5000 / 5)
    for (let i = 0; i < 5; i++) {
      const card = fundCards.nth(i);
      const suggestedAmount = card.getByText('Suggested Investment: ₹1,000');
      await expect(suggestedAmount).toBeVisible();
    }
  });
});
