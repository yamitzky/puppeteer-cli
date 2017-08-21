# Puppeteeer CLI

Puppeteer CLI version to snapshot websites.

Currently, the CLI is expected to run on Docker.

## Feature

- Take snapshot and save to file.
- Take snapshot and print to console.
- Additional CSS support to render CJK websites.

## Usage

To print base64-encoded screenshot to console some websites,

```
docker run -it --rm yamitzky/puppeteer-cli --url https://yamitzky.com
```

If you would like to save to file,

```
docker run -it --rm -v "$PWD:/tmp" yamitzky/puppeteer-cli --url https://yamitzky.com --out /tmp/example.png
```

To render Japanese with no tofu,

```
docker run -it --rm -v "$PWD:/tmp" yamitzky/puppeteer-cli --url https://yamitzky.com --out /tmp/example.png --delay 1000 --css 'https://fonts.googleapis.com/earlyaccess/notosansjapanese.css' --style 'font-family: "Noto Sans Japanese"'
```

## Future work

- Additional tasks such as saving innerHTML(source)
- More sophisticated CLI options
- npm binary
- ESLint and Jest
