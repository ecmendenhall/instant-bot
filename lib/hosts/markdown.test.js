const markdown = require('./markdown');
jest.mock('fs');
const fs = require('fs');

describe('markdown', () => {

  test('renders a markdown string to HTML', () => {
     expect(markdown.renderString('# Hello world')).toBe('<h1 id="hello-world">Hello world</h1>\n');
  });

  test('renders a markdown file to HTML', (done) => {
    fs.readFile = jest.fn((path, callback) => {
      expect(path).toBe('./README.md');
      callback(null, Buffer.from('# Hello world'));
    });
    markdown.renderFile('./README.md', (renderedMarkdown) => {
      expect(renderedMarkdown).toBe('<h1 id="hello-world">Hello world</h1>\n');
      done();
    });
  });

});
