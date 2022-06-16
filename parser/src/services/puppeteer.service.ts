import puppeteer, { Browser } from "puppeteer";
import { LAUNCH_PUPPETEER_OPTS, PAGE_PUPPETEER_OPTS } from "../config/puppeteer.config";
import logger from "./../utils/logger";

class PuppeteerService{
  async initBrowser() {
    try {
      const browser = await puppeteer.launch(LAUNCH_PUPPETEER_OPTS);
      logger.info(`✅ Browser was opened`);
      return browser;
    } catch (err) {
      throw err;
    }
  }

  async initPage(browser: Browser, url: string) {
    try {
      const page = await browser.newPage();
      await page.goto(url, PAGE_PUPPETEER_OPTS);
      logger.info(`✅ Page ${url} was opened`);
      return page;
    } catch (err) {
      throw err;
    }
  }

}

export default new PuppeteerService();