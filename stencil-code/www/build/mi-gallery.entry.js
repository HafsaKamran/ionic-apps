import { r as registerInstance, h, e as Host } from './index-49650b28.js';

const imageGalleryComponentCss = ":host{display:block}.panel{display:flex;flex-flow:row;padding:0.5em}.gallery{display:flex;flex-flow:row wrap;width:50%}.image{width:32%;margin:0 0 0 1%}.information{display:flex;flex-flow:column;width:50%;padding:0 0 0 1.5em;background:rgba(240, 240, 240,1)}";

const ImageGalleryComponent = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  /**
   * @method componentWillLoad
   * @description   Uses Stencil's componentWillLoad lifecycle hook to trigger a call to
   *                a remote URL - using the Fetch API - to retrieve/parse JSON data that
   *                will be used to populate each <mi-image> component with
   * @returns {Promise<any>}
   * @memberof ImageGalleryComponent
   */
  componentWillLoad() {
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
    return (h(Host, null, h("section", { class: "panel" }, h("section", { class: "gallery" }, this.items.map((item) => h("section", { class: "image" }, h("mi-image", { heading: item.name, image: item.image, description: item.description })))), h("section", { class: "information" }, h("h2", null, this.heading), h("p", null, this.description)))));
  }
};
ImageGalleryComponent.style = imageGalleryComponentCss;

export { ImageGalleryComponent as mi_gallery };
