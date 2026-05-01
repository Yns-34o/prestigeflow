/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://prestigeflow.fr',
  generateRobotsTxt: false,
  changefreq: 'weekly',
  priority: 0.7,
  exclude: ['/admin/*', '/api/*'],
  sitemapSize: 5000,
}
