import { newE2EPage } from '@stencil/core/testing';

describe('image-component', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<image-component></image-component>');

    const element = await page.find('image-component');
    expect(element).toHaveClass('hydrated');
  });
});
