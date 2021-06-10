/**
 * SoundManagerService
 *
 * This class manages interaction with the HTML5 Web Audio API
 *
 * @author James Griffiths
 * @date 20/01/2021
 * @version 0.1
 * @export
 * @class SoundManagerService
 * @packageDocumentation
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/**
 * @ignore
 */
@Injectable({
  providedIn: 'root'
})
export class SoundManagerService {


  /**
   * @private
   * @property audio
   * @type {*}
   * @memberof SoundManagerService
   */
  private audio: any;


  /**
   * @private
   * @property source
   * @type {*}
   * @memberof SoundManagerService
   */
  private source: any;


  /**
   * @private
   * @property context
   * @type {*}
   * @memberof SoundManagerService
   */
  private context: any;


  /**
   * @private
   * @property gain
   * @type {*}
   * @memberof SoundManagerService
   */
  private gain: any;


  /**
   * @public
   * @property duration
   * @type number
   * @memberof SoundManagerService
   */
  public duration: number;


  /**
   * @public
   * @property position
   * @type number
   * @memberof SoundManagerService
   */
  public position = 0;


  /**
   * @public
   * @property startTime
   * @type number
   * @memberof SoundManagerService
   */
  public startTime = 0;


  /**
   * @private
   * @property pan
   * @type {*}
   * @memberof SoundManagerService
   */
  private pan: any;


  /**
   * @private
   * @property isReversed
   * @type boolean
   * @memberof SoundManagerService
   */
  private isReversed = false;


  /**
   * @constructor
   * Creates an instance of SoundManagerService.
   * @param {HttpClient} http
   * @memberof SoundManagerService
   */
  constructor(private http: HttpClient) {
  }


  /**
   * @public
   * @method loadSound
   * @description Initialises the Web Audio API for use and loads the supplied track for subsequent playback
   * @param {string} track
   * @param {number} playbackPosition
   * @returns {none}
   * @memberof SoundManagerService
   */
  public loadSound(track: string, playbackPosition: number): void {

    // Create the audio context object - cross browser support enabled as some platforms require webkitAudioContext.
    // The web audio context is required for sounds to be played and manipulated and forms a parent object for audio
    // objects that will develop from this
    this.context = new((window as any).webkitAudioContext || window.AudioContext)();

    // Load the selected MP3 file as binary data and deliver that as an arraybuffer object
    this.http.get(track, { responseType: 'arraybuffer' })
    .subscribe((arrayBufferContent: any) =>
    {
       this.setUpAudio(arrayBufferContent, playbackPosition);
    });
  }


  /**
   * @private
   * @method setUpAudio
   * @description     Loads the selected track and configures the Audio API to play this back
   * @param {*} bufferedContent
   * @param {number} playbackPosition
   * @returns {none}
   * @memberof SoundManagerService
   */
  private setUpAudio(bufferedContent: any, playbackPosition: number): void {

    // Take the arraybuffer of audio data and decode that for creating an audio source for subsequent playback
     this.context.decodeAudioData(bufferedContent)
     .then((buffer: any) => {
       // Retrieve the MP3 duration time and store that in memory
       this.setDuration(buffer.duration);

       // Assign song data for playback
       this.audio         = buffer;
       this.playSound(this.audio, playbackPosition);
     });
  }


  /**
   * @public
   * @method playSound
   * @description       Plays the supplied track and configures various properties associated with
   *                    playback of the track
   * @param {*} track
   * @param {number} playbackPosition
   * @returns {none}
   * @memberof SoundManagerService
   */
  public playSound(track: any, playbackPosition: number): void {

     // If createGain method is not supported
     if (!this.context.createGain) {
        this.context.createGain   = this.context.createGainNode;
     }

     // Create a gain node - can be used to help manage volume in the audio output
     this.gain                    = this.context.createGain();

     // Create a stereopanner node - can be used to help manage stereo balance in the audio output
     this.pan                     = this.context.createStereoPanner();

     // Create a buffer source node - can be used to help manage playback of audio data
     this.source                  = this.context.createBufferSource();

     // If the reverse play checkbox has been enabled we want to parse the track data and reverse
     // that for subsequent playback (this does take  2 - 3 seconds longer to convert than regular playback)
     if (this.isReversed) {
      Array.prototype.reverse.call(track.getChannelData(0));
      Array.prototype.reverse.call(track.getChannelData(1));
     }

     // Assign the decoded audio data to the buffer as the data source for playback
     this.source.buffer           = track;

     // Connect nodes to targets for output
     this.source.connect(this.gain).connect(this.pan);
     this.pan.connect(this.context.destination);
     this.gain.connect(this.context.destination);

     // Determine position and start time prior to playback
     this.position = typeof playbackPosition === 'number' ? playbackPosition : this.position || 0;
     this.startTime = this.context.currentTime - ( this.position || 0 );

     // Initate playback (begin from, offset by):)
     this.source.start(this.context.currentTime, this.position);
  }


  /**
   * @public
   * @method setReversedState
   * @description     Determines whether the reversed state for track playback is set or not
   * @param {boolean} state
   * @returns {none}
   * @memberof SoundManagerService
   */
  public setReversedState(state: boolean): void {
    this.isReversed = state;
  }


  /**
   * @public
   * @method stopSound
   * @description    Stops the current track being played
   * @returns {none}
   * @memberof SoundManagerService
   */
  public stopSound(): void {

    // Is buffer still available - i.e. is audio being played?
    if (this.getSource() !== null) {
      this.source.stop(0);
      this.startTime = 0;
      this.position = 0;
    }
  }


  /**
   * @public
   * @method pause
   * @description    Pauses the current track being played
   * @returns {none}
   * @memberof SoundManagerService
   */
  public pause(): void {
    this.source.stop(0);
    this.source = null;
  }


  /**
   * @public
   * @method changeVolume
   * @description     Sets the volume rate for the current track being played
   * @param {*} volume
   * @returns {none}
   * @memberof SoundManagerService
   */
  public changeVolume(volume: any): void {
    this.gain.gain.value = volume;
  }


  /**
   * @public
   * @method changePanning
   * @description     Sets the audio balance for the current track being played
   * @param {*} value
   * @returns {none}
   * @memberof SoundManagerService
   */
  public changePanning(value: any): void {
    this.pan.pan.value = value;
  }


  /**
   * @public
   * @method setDuration
   * @description     Sets the track duration
   * @param {number} val
   * @returns {none}
   * @memberof SoundManagerService
   */
  public setDuration(val: number): void {
    this.duration = val;
  }


  /**
   * @public
   * @method getDuration
   * @description     Returns the track duration value
   * @returns number
   * @memberof SoundManagerService
   */
  public getDuration(): number {
    return this.duration;
  }


  /**
   * @public
   * @method getTime
   * @description     Returns the curent playback time of the track being played
   * @returns number
   * @memberof SoundManagerService
   */
  public getTime(): number {
    return this.context.currentTime;
  }


  /**
   * @public
   * @method getMinutes
   * @description     Returns the curent playback time in minutes
   * @returns number
   * @memberof SoundManagerService
   */
  public getMinutes(time: number): string | number {
    const num = Math.floor((time % 3600) / 60);
    // Ensure returned number is formatted with a leading zero if less than 10
    return num < 10 ? '0' + num : num;
  }


  /**
   * @public
   * @method getSeconds
   * @description     Returns the current playback time in seconds
   * @returns {string|number}
   * @memberof SoundManagerService
   */
  public getSeconds(time: number): string | number {
    const num = Math.floor(time % 60);
    // Ensure returned number is formatted with a leading zero if less than 10
    return num < 10 ? '0' + num : num;
  }


  /**
   * @public
   * @method getStartTime
   * @description     Returns the track start time
   * @returns {number}
   * @memberof SoundManagerService
   */
  public getStartTime(): number {
    return this.startTime;
  }


  /**
   * @public
   * @method getSource
   * @description     Returns the Audio API buffer source
   * @returns {*}
   * @memberof SoundManagerService
   */
  public getSource(): any {
    return this.source;
  }


}
