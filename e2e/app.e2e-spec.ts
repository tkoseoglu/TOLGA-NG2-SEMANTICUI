import { NgSemanticSpritesPage } from './app.po';

describe('ng-semantic-sprites App', function() {
  let page: NgSemanticSpritesPage;

  beforeEach(() => {
    page = new NgSemanticSpritesPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
