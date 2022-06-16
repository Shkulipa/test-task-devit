import cheerio from 'cheerio';
import { IPost } from '../interfaces/post.interfaces';
import logger from '../utils/logger';
import PuppeteerService from './../services/puppeteer.service';
import { className } from './../utils/className';

class ContentHandlers {
  getLinks(dom: string): string[] {
    const links: string[] = [];

    const $ = cheerio.load(dom);
    $('item > link').each((_, el) => {
      const link = $(el).text();
      links.push(link);
    });
    logger.info(`✅ Links were parsed`);
    return links;
  }

  async parsePosts(links: string[]): Promise<IPost[]> {
    const posts: IPost[] = [];
    const browser = await PuppeteerService.initBrowser();

    for(const link of links) {
      try {
        const page = await PuppeteerService.initPage(browser, link);

        const dom = await page.content();
        const $ = cheerio.load(dom);

        const title = $(className.title).html() || '';
        const description = $(className.description).html() || '';
        const author = $(className.author).html() || '';
        const createdAt = $(className.createdAt).attr('datetime') || '';
        const img = $(className.img).attr('srcset') || '';

        $(className.content).find('figure').remove();
        $(className.content).find('div').remove();
        const content = $(className.content).html() || '';
        
        const post = {
          title,
          description,
          author,
          createdAt,
          img,
          content
        }
        
        posts.push(post);
        logger.info(`✅ Link <${link}> was parsed`);
      } catch (err) {
        throw err;
      }
    }

    logger.info(`✅ Success parsed!`);
    return posts;
  };

}

export default new ContentHandlers();