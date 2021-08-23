import { newSpecPage } from '@stencil/core/testing';
import { ImageGalleryComponent } from '../image-gallery-component';

describe('image-gallery-component', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ImageGalleryComponent],
      html: `<image-gallery-component></image-gallery-component>`,
    });
    expect(page.root).toEqualHtml(`
      <image-gallery-component>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </image-gallery-component>
    `);
  });
});
