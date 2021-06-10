import { newSpecPage } from '@stencil/core/testing';
import { ImageComponent } from '../image-component';

describe('image-component', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ImageComponent],
      html: `<image-component></image-component>`,
    });
    expect(page.root).toEqualHtml(`
      <image-component>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </image-component>
    `);
  });
});
