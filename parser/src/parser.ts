import './config/dotenv.config';
const htmlparser2 = require('htmlparser2');
import PuppeteerService from './services/puppeteer.service';
import ContentHandlers from './handlers/content.handlers';
import logger from './utils/logger';
import { htmlparserConfig } from './config/htmlparser.config';
import DBService from './services/db.service';

/**
 * @info
 * Site that we will parse
 */
const url = "https://lifehacker.com/rss";

(async () => {
  try {
    const browser = await PuppeteerService.initBrowser();
    
    const page = await PuppeteerService.initPage(browser, url);

    const content = await page.content();

    /**
     * @info
     * For navigation a DOM, you need to parse the XML to DOM tree
     */
    const dom = htmlparser2.parseDocument(content, htmlparserConfig);

    const links = ContentHandlers.getLinks(dom);

    const posts = await ContentHandlers.parsePosts(links);

    await DBService.savePosts(posts);

    browser.close();
  } catch (err) {
    logger.error("❌ Error", err);
  }

  logger.info(`✅ End!`);
  process.exit();
})();