const puppeteer = require('puppeteer')

const argv = require('yargs')
  .example('$0 --url=https://example.com')
  .option('url')
  .option('width', {
    describe: 'Width of viewport'
  })
  .option('height', {
    describe: 'Height of viewport'
  })
  .option('out', {
    default: '-',
    describe: 'File path to save. If `-` specified, outputs to console in base64-encoded'
  })
  .option('delay', {
    describe: 'Delay to save screenshot after loading CSS. Milliseconds'
  })
  .option('css', {
    describe: 'Additional CSS URL to load'
  })
  .option('style', {
    describe: 'Additional style to apply to body'
  })
  .demandOption(['url'])
  .argv

const { url, out, delay, css, style, width, height } = argv

const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

(async() => {
  const browser = await puppeteer.launch({args: [
    '--no-sandbox',
    '--disable-setuid-sandbox'
  ]})
  const page = await browser.newPage()
  if (width && height) {
    await page.setViewport({ width, height })
  }
  await page.goto(url)
  if (css || style) {
    await page.evaluate((css, style) => {
      if (css) {
        const head = document.head
        const link = document.createElement('link')
        link.href = css
        link.rel = 'stylesheet'
        head.appendChild(link)
      }
      if (style) {
        document.body.setAttribute('style', style)
      }
    }, css, style)
  }
  if (delay) {
    await sleep(delay)
  }
  if (out === '-') {
    const screenshot = await page.screenshot()
    console.log(screenshot.toString('base64'))
  } else {
    await page.screenshot({path: out})
  }
  browser.close()
})()
