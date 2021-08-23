import { newE2EPage } from '@stencil/core/testing';

describe('image-gallery-component', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<image-gallery-component></image-gallery-component>');

    const element = await page.find('image-gallery-component');
    expect(element).toHaveClass('hydrated');
  });
});
