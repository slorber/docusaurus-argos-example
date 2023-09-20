import * as cheerio from "cheerio";
import * as fs from "fs";

export function extractSitemapPathnames(sitemapPath: string): string[] {
  const sitemap = fs.readFileSync(sitemapPath).toString();
  const $ = cheerio.load(sitemap, { xmlMode: true });
  const urls: string[] = [];
  $("loc").each(function handleLoc() {
    urls.push($(this).text());
  });
  return urls.map((url) => new URL(url).pathname);
}

// Converts a pathname to a decent screenshot name
export function pathnameToArgosName(pathname: string): string {
  function removeTrailingSlash(str: string): string {
    return str.endsWith("/") ? str.slice(0, -1) : str;
  }
  function removeLeadingSlash(str: string): string {
    return str.startsWith("/") ? str.slice(1) : str;
  }
  pathname = removeTrailingSlash(pathname);
  pathname = removeLeadingSlash(pathname);
  if (pathname === "") {
    return "index";
  }
  return pathname;
}
