/**
 * ImageComponent
 *
 * This class generates an <img> component with a <h2> and <button> elements.
 * These will be used to generte individual images with headings that a user can then
 * select the button to view further information on.
 *
 * @author James Griffiths
 * @date 13/11/2020
 * @version 0.1
 * @export
 * @class ImageComponent
 * @packageDocumentation
 */
import { EventEmitter } from '../../stencil-public-runtime';
/**
 * @ignore
 */
export declare class ImageComponent {
  /**
   * @public
   * @property heading
   * @type {string}
   * @memberof ImageComponent
   */
  heading: string;
  /**
   * @public
   * @property image
   * @type {string}
   * @memberof ImageComponent
   */
  image: string;
  /**
   * @public
   * @property description
   * @type {string}
   * @memberof ImageComponent
   */
  description: string;
  /**
   * @public
   * @property onSelection
   * @type {EventEmitter}
   * @memberof ImageComponent
   */
  selection: EventEmitter;
  /**
   * @private
   * @method imageSelected
   * @description   Uses the EventEmitter to broadcast the title and description of a
   *                selected image to other components using the onSelection Event
   * @returns {none}
   * @memberof ImageComponent
   */
  private imageSelected;
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
  render(): any;
}
