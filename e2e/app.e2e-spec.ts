import { MyBadGirlPage } from './app.po';

describe('my-bad-girl App', () => {
  let page: MyBadGirlPage;

  beforeEach(() => {
    page = new MyBadGirlPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
