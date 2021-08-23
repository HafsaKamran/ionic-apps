/**
 * @ignore
 */
export declare class ImageGalleryComponent {
  /**
   * @public
   * @property items
   * @type {Array<any>}
   * @memberof ImageGalleryComponent
   */
  items: Array<any>;
  /**
   * @property heading
   * @type {string}
   * @memberof ImageGalleryComponent
   */
  heading: string;
  /**
   * @property description
   * @type {string}
   * @memberof ImageGalleryComponent
   */
  description: string;
  /**
   * @method componentWillLoad
   * @description   Uses Stencil's componentWillLoad lifecycle hook to trigger a call to
   *                a remote URL - using the Fetch API - to retrieve/parse JSON data that
   *                will be used to populate each <mi-image> component with
   * @returns {Promise<any>}
   * @memberof ImageGalleryComponent
   */
  componentWillLoad(): Promise<any>;
  /**
   * @method write
   * @description Listens for broadcasts through the onSelection event (that was declared in the <mi-image>)
   *              component
   * @param {*} ev
   * @memberof ImageGalleryComponent
   */
  write(ev: any): void;
  /**
   * @method render
   * @description   Renders a component tree consisting of the <mi-image> web components with data assigned, via
   *                looping through the items array, to their title, image and description attributes as well as
   *                an information panel where the heading and descriptive content of a selected image are displayed
   * @returns
   * @memberof ImageGalleryComponent
   */
  render(): any;
}
