import { r as registerInstance, f as createEvent, h, e as Host } from './index-49650b28.js';

const imageComponentCss = ":host{display:block}img{display:block;margin:auto;width:100%}h2{display:block;margin:0.5em auto;text-align:center;font-size:1.1em;font-family:Arial, Helvetica, sans-serif}button{display:block;margin:1em auto;background:none;border:none;background:rgba(230, 230, 230,1);color:rgba(68, 68, 68, 1);padding:1em;font-size:1em;cursor:pointer}";

const ImageComponent = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.selection = createEvent(this, "selection", 7);
  }
  /**
   * @private
   * @method imageSelected
   * @description   Uses the EventEmitter to broadcast the title and description of a
   *                selected image to other components using the onSelection Event
   * @returns {none}
   * @memberof ImageComponent
   */
  imageSelected() {
    this.selection.emit({ heading: this.heading, description: this.description });
  }
  /**
   * @public
   * @method render
   * @description   Returns a DOM tree of components for subsequent rendering.
   *                Here we use data binding to assign the image property value to the
   *                <img> tag and the title property value to the <h2> tag.
   *                Additionally we assign a click event to a <button> tag which binds the
   *                imageSelected method (so that image data can be broadcast using the
   *                Stencil @Event decorator and EventEmitter module)
   * @returns
   * @memberof ImageComponent
   */
  render() {
    return (h(Host, null, h("img", { src: this.image }), h("h2", null, this.heading), h("button", { onClick: () => this.imageSelected() }, "More information")));
  }
};
ImageComponent.style = imageComponentCss;

export { ImageComponent as mi_image };
