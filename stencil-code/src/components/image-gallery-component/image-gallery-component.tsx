/**
 * ImageGalleryComponent
 *
 * This class generates an image gallery of thumbnails (using the <mi-image> component) and a
 * 'writeable' panel for rendering selected image information to
 *
 * @author James Griffiths
 * @date 13/11/2020
 * @version 0.1
 * @export
 * @class ImageGalleryComponent
 * @packageDocumentation
 */
import { Component, Host, h, Listen, Prop, State } from '@stencil/core';

/**
 * @ignore
 */
@Component({
  tag: 'mi-gallery',
  styleUrl: 'image-gallery-component.css',
  shadow: true,
})
export class ImageGalleryComponent {


  /**
   * @public
   * @property items
   * @type {Array<any>}
   * @memberof ImageGalleryComponent
   */
  @Prop() items: Array<any>;


  /**
   * @property heading
   * @type {string}
   * @memberof ImageGalleryComponent
   */
  @State() heading: string;


  /**
   * @property description
   * @type {string}
   * @memberof ImageGalleryComponent
   */
  @State() description: string;


  /**
   * @method componentWillLoad
   * @description   Uses Stencil's componentWillLoad lifecycle hook to trigger a call to
   *                a remote URL - using the Fetch API - to retrieve/parse JSON data that
   *                will be used to populate each <mi-image> component with
   * @returns {Promise<any>}
   * @memberof ImageGalleryComponent
   */
  componentWillLoad(): Promise<any> {
    return fetch('https://masteringionic.com/project-examples/technologies/images.json')
             .then(response => response.json())
             .then(data => {
               console.dir(data);
               this.items = data.items;
             })
             .catch(error => {
               console.dir(error);
             });
  }


  /**
   * @method write
   * @description Listens for broadcasts through the onSelection event (that was declared in the <mi-image>)
   *              component
   * @param {*} ev
   * @memberof ImageGalleryComponent
   */
  @Listen('selection', { capture: true })
  write(ev) {
    // Here we update the state properties that we defined earlier - assigning them the
    // broadcast image name and description
    this.heading = ev.detail.heading;
    this.description = ev.detail.description;
  } 


  /**
   * @method render
   * @description   Renders a component tree consisting of the <mi-image> web components with data assigned, via
   *                looping through the items array, to their title, image and description attributes as well as
   *                an information panel where the heading and descriptive content of a selected image are displayed
   * @returns 
   * @memberof ImageGalleryComponent
   */
  render() {
    return (
      <Host>
        <section class="panel">
          <section class="gallery">
            { this.items.map((item: any) =>
              <section class="image">
                <mi-image heading={ item.name } image={ item.image } description={ item.description }></mi-image>
              </section>
            )}
          </section>
          <section class="information">
            <h2>{ this.heading }</h2>
            <p>{ this.description }</p>
          </section>
        </section>
      </Host>
    );
  }

}
