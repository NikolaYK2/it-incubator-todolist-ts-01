describe("Task", () => {
  it("base example, visually looks correct", async () => {
    // APIs from jest-puppeteer
    await page.goto("http://localhost:6006/iframe.html?args=&id=components-task--task-store&viewMode=story");
    const image = await page.screenshot();

    // API from jest-image-snapshot
    expect(image).toMatchImageSnapshot();
  });
});
