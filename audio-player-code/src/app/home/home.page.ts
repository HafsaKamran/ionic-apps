/**
 * HomePage
 *
 * This class manages the audio playback functionality for the application 
 *
 * @author James Griffiths
 * @date 20/01/2021
 * @version 0.1
 * @export
 * @class HomePage
 * @packageDocumentation
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { SoundManagerService } from '../services/sound-manager.service';

/**
 * @ignore
 */
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage {


  /**
   * @public
   * @property track
   * @type {ElementRef}
   * @memberof HomePage
   */
  @ViewChild('track') public track: ElementRef;


  /**
   * @public
   * @property progress
   * @type {ElementRef}
   * @memberof HomePage
   */
  @ViewChild('progress') public progress: ElementRef;


  /**
   * @public
   * @property scrubber
   * @type {ElementRef}
   * @memberof HomePage
   */
  @ViewChild('scrubber') public scrubber: ElementRef;


  /**
   * @public
   * @property preloaderBar
   * @type {ElementRef}
   * @memberof HomePage
   */
  @ViewChild('preloaderBar') public preloaderBar: ElementRef;


  /**
   * @public
   * @property volume
   * @type number
   * @memberof HomePage
   */
  public volume     = 1.5;


  /**
   * @public
   * @property panning
   * @type number
   * @memberof HomePage
   */
  public panning     = 0;


  /**
   * @public
   * @property isPlaying
   * @type boolean
   * @memberof HomePage
   */
  public isPlaying = false;


  /**
   * @public
   * @property currentTrack
   * @type number
   * @memberof HomePage
   */
  public currentTrack = 0;


  /**
   * @public
   * @property trackDuration
   * @type string
   * @memberof HomePage
   */
  public trackDuration = '';


  /**
   * @public
   * @property currentTime
   * @type string
   * @memberof HomePage
   */
  public currentTime = '';


  /**
   * @private
   * @property requestAnimation
   * @type {*}
   * @memberof HomePage
   */
  private requestAnimation: any;


  /**
   * @private
   * @property dragging
   * @type boolean
   * @memberof HomePage
   */
  private dragging = false;


  /**
   * @private
   * @property startX
   * @type number
   * @memberof HomePage
   */
  private startX = 0;


  /**
   * @private
   * @property startLeft
   * @type number
   * @memberof HomePage
   */
  private startLeft = 0;


  /**
   * @private
   * @property playbackPosition
   * @type number
   * @memberof HomePage
   */
  private playbackPosition = 0;


  /**
   * @public
   * @property trackName
   * @type string
   * @memberof HomePage
   */
  public trackName = '';


  /**
   * @public
   * @property artistName
   * @type string
   * @memberof HomePage
   */
  public artistName = '';


  /**
   * @private
   * @property durationToggle
   * @type boolean
   * @memberof HomePage
   */
  private durationToggle = false;


  /**
   * @public
   * @property isReversed
   * @type boolean
   * @memberof HomePage
   */
  public isReversed = false;


  /**
   * @public
   * @property isLoading
   * @type boolean
   * @memberof HomePage
   */
  public isLoading = false;


  /**
   * @public
   * @property tracksAreLooped
   * @type boolean
   * @memberof HomePage
   */
  public tracksAreLooped = false;


  /**
   * @private
   * @property playHeadPosition
   * @type number
   * @memberof HomePage
   */
  private playHeadPosition = 0;


  /**
   * @private
   * @property playbackBarWidth
   * @type number
   * @memberof HomePage
   */
  private playbackBarWidth: number;


  /**
   * @private
   * @property playbackTime
   * @type number
   * @memberof HomePage
   */
  private playbackTime: number;


  /**
   * @public
   * @property tracks
   * @type {Array<{artist: string, name: string, track: string}>}
   * @memberof HomePage
   */
  public tracks: Array<{artist: string, name: string, track: string}>     = [
    // {
    //    artist  : 'De/vision',
    //    name    : 'Until the end of time',
    //    track   : '/assets/tracks/until-the-end-of-time.mp3'
    // },
    // {
    //    artist  : 'Rollins Band',
    //    name    : 'Shame',
    //    track   : '/assets/tracks/shame.mp3'
    // },
    // {
    //    artist  : 'Eleven Pond',
    //    name    : 'Watching Trees',
    //    track   : '/assets/tracks/watching-trees.mp3'
    // },
    // {
    //    artist  : 'New Model Army',
    //    name    : 'Angry Planet',
    //    track   : '/assets/tracks/angry-planet.mp3'
    // },
    {
       artist  : 'Jim Hall',
       name    : 'Explosions in the sky',
       track   : '/assets/tracks/explosions-in-the-sky.mp3'
    },
    {
       artist  : 'Synth Kid',
       name    : 'Hope is not lost',
       track   : '/assets/tracks/hope-is-not-lost.mp3'
    },
    {
       artist  : 'Synth Kid',
       name    : 'Last Breath',
       track   : '/assets/tracks/last-breath.mp3'
    },
    {
       artist  : 'Synth Kid',
       name    : 'Please Stay',
       track   : '/assets/tracks/please-stay.mp3'
    },
    {
       artist  : 'Synth Kid',
       name    : 'They mostly come at night',
       track   : '/assets/tracks/they-mostly-come-at-night.mp3'
    },
  ];


  /**
   * @public
   * @property animationTriggered
   * @type number
   * @memberof HomePage
   */
  private animationTriggered: number;


  /**
   * @public
   * @property framesPerSecond
   * @type number
   * @memberof HomePage
   */
  private framesPerSecond = 5;


  /**
   * @public
   * @property framesPerSecondInterval
   * @type number
   * @memberof HomePage
   */
  private framesPerSecondInterval: number;


  /**
   * @public
   * @property isMuted
   * @type boolean
   * @memberof HomePage
   */
  public isMuted = false;


  /**
   * @public
   * @property isVolumeChanged
   * @type boolean
   * @memberof HomePage
   */
  public isVolumeChanged = false;


  /**
   * @constructor
   * Creates an instance of HomePage.
   * @param {SoundManagerService} soundManager
   * @param {ChangeDetectorRef} cdr
   * @memberof HomePage
   */
  constructor(private renderer: Renderer2,
              private soundManager: SoundManagerService,
              private cdr: ChangeDetectorRef) {}


  /**
   * @public
   * @method loadSound
   * @description   Manges the loading of the selected track from the playlist
   * @param {string} track
   * @param {number} index
   * @returns {none}
   * @memberof HomePage
   */
  public loadSound(track: string, index: number): void {
    this.isLoading = true;
    if (this.soundManager.getSource() !== undefined) {
       this.stopPlayback();
    }
    this.currentTrack = index;
    if (!this.isPlaying) {
      this.triggerPlayback(track);
    } else {
      this.triggerPlayback(track);
    }
  }


  /**
   * @public
   * @method toggleDuration
   * @description       Toggles the track duration timing display
   * @returns {none}
   * @memberof HomePage
   */
  public toggleDuration(): void {
    this.durationToggle = !this.durationToggle;
  }


  /**
   * @public
   * @method triggerPlayback
   * @description     Loads the selected track from the playlist and triggers playback
   * @param {string} track
   * @returns {none}
   * @memberof HomePage
   */
  public triggerPlayback(track: string): void {
    this.soundManager.loadSound(track, this.playbackPosition);

    setTimeout(() => {
      this.manageSoundSettings();

      this.animationTriggered = Date.now();
      this.framesPerSecondInterval = 1000 / this.framesPerSecond;
      this.isLoading = false;
      this.isPlaying = true;
      this.artistName = ' - ' + this.tracks[this.currentTrack].artist;
      this.trackName = this.tracks[this.currentTrack].name;
      this.soundManager.getDuration();
      this.update();
    }, 1000);
  }


  /**
   * @public
   * @method mute
   * @description   Allows the playback audio to be muted/un-muted
   * @param {*} event
   * @returns {none}
   * @memberof HomePage
   */
  public mute(event: any): void {
    this.isMuted = event.detail.checked;
    if (this.isMuted) {
      this.mutePlayback();
    } else {
      this.soundManager.changeVolume(1.5);
      this.volume = 1.5;
    }
  }


  /**
   * @private
   * @method mutePlayback
   * @description   Mutes all audio for the application
   * @returns {none}
   * @memberof HomePage
   */
  private mutePlayback(): void {
    this.soundManager.changeVolume(0);
    this.volume = 0;
  }


  /**
   * @public
   * @method changeVolume
   * @description Allows the volume of the audio output to be altered
   * @param {*} volume
   * @returns {none}
   * @memberof HomePage
   */
  public changeVolume(volume: any): void {
    this.isVolumeChanged = true;
    this.volume = volume.detail.value;
    this.soundManager.changeVolume(volume.detail.value);
  }


  /**
   * @public
   * @method changePanning
   * @description Allows the speaker balance of the audio output to be altered
   * @param {*} panning
   * @returns {none}
   * @memberof HomePage
   */
  public changePanning(panning: any): void {
    this.soundManager.changePanning(panning.detail.value);
  }


  /**
   * @public
   * @method shuffle
   * @description     Toggles the playlist shuffle functionality
   * @param {*} event
   * @rreturns {none}
   * @memberof HomePage
   */
  public shuffle(event: any): void {
    const isChecked = event.detail.checked;
    if (isChecked) {
      this.shuffleArray(this.tracks);
    }
  }


  /**
   * @private
   * @method shuffleArray
   * @description     Shuffles the order in which trracks in the playlist are displayed/played
   * @param {Array<{artist: string, name: string, track: string}>} arr
   * @returns {none}
   * @memberof HomePage
   */
  private shuffleArray(arr: Array<{artist: string, name: string, track: string}>): void {
    arr.sort(() => Math.random() - 0.5);

    // Reset the counter as the playlist order has now changed
    this.currentTrack = 0;
  }


  /**
   * @public
   * @method stopPlayback
   * @description       Cancels the current track being played and resets the player
   * @returns {none}
   * @memberof HomePage
   */
  public stopPlayback(): void {
    // this.currentTrack = 0;
    this.cancelPlayback();
  }


  /**
   * @public
   * @method previousTrack
   * @description       Allows the previous track (if it exists) in the playlist to be loaded/played
   * @returns {none}
   * @memberof HomePage
   */
  public previousTrack(): void {
    // Ensure previous song is cleared from playback :)
    this.cancelPlayback();

    // Ensure we reset counter for accurate tracking/matching track listings
    if (this.currentTrack === this.tracks.length) {
      this.currentTrack--;
    }

    // If this is not the first track in the listing
    if (this.currentTrack !== 0) {
      this.currentTrack--;
      this.loadSound(this.tracks[this.currentTrack].track, this.currentTrack);
    }
  }


  /**
   * @public
   * @method nextTrack
   * @description       Allows the next track (if it exists) in the playlist to be loaded/played
   * @returns {none}
   * @memberof HomePage
   */
  public nextTrack(): void {
    // Ensure previous song is cleared from playback :)
    this.cancelPlayback();

    // Increment counter for tracking/accurate matching of next track listing to be played
    this.currentTrack++;

    // If we have reached the end of the track listings ensure the currentTrack value uses the last array index
    if (this.currentTrack === this.tracks.length - 1) {
      this.currentTrack = this.tracks.length - 1;
    }

    // If we are looping the playlist AND we are at the end of the currrent playlist then we need to reset the play counter
    if (this.tracksAreLooped && this.currentTrack === this.tracks.length) {
      this.currentTrack = 0;
    }

    // Load and play
    this.loadSound(this.tracks[this.currentTrack].track, this.currentTrack);
  }


  /**
   * @public
   * @method update
   * @description  Uses the requestAnimationFrame utility to manage the playback display of the following
   *               items for the track currently being played:
   *
   *               1. Progress bar indicating how much of the track has been played
   *               2. Movement of playback head in relation to the current position in the track
   *               3. Display of current time position of the track (in minutes/seconds)
   *               4. Display of length of track (in minutes/seconds)
   * @returns {none}
   * @memberof HomePage
   */
  public update(): void {
    this.manageSoundSettings();

    // Request animation frame here
    this.requestAnimation = window.requestAnimationFrame(() => this.update());

    // Set the scrubber width minus 3 pixels (to offset the right hand edge of the scrubber from protruding over
    // the end of the progress bar track at the end of playback)
    const scrubberWidth = (this.scrubber.nativeElement.offsetWidth - 3);

    // Properties for tracking visual rendering of playback duration/progress
    const progress  = ( this.updatePosition() / this.soundManager.getDuration() );
    const width     = this.track.nativeElement.offsetWidth - scrubberWidth;

    // Determine current position for track playback
    this.determinePlaybackTime(width);

    // If we have a sound source active then scale the width of the progress bar based on current playback position value
    if (this.soundManager.getSource() !== null) {
      this.renderer.setStyle(this.progress.nativeElement, 'width', (progress * 100 ) + '%');
    }

    // If the user is NOT dragging the playhead AND we have a sound source active then move the playhead based on current
    // playback position value
    if (!this.dragging && this.soundManager.getSource() !== null) {
      this.renderer.setStyle(this.scrubber.nativeElement, 'left', (width * progress) + 'px');
      this.startLeft = parseInt(this.scrubber.nativeElement.style.left || 0, 10);
    } else if (!this.dragging && this.soundManager.getSource() === null) {
      // this.scrubber.nativeElement.style.left = this.startLeft + 'px';
    }


    // Has the playback of the currrent track completed/or is no longer available?
    if (this.soundManager.getSource() === null) {

      // Immediately cancel the requestanimationframe - the track has finished
      window.cancelAnimationFrame(this.requestAnimation);

      // Calculate the time that has elapsed since the last animation frame redraw
      const now = Date.now();
      const elapsed = now - this.animationTriggered;


      // if enough time has elapsed, check to see if we are looping tracks
      // If we are then we want to play the next track in the listing
      if (elapsed >= this.framesPerSecondInterval) {
        if (this.tracksAreLooped) {
          this.nextTrack();
        }
      }
    }
    this.cdr.detectChanges();
  }


  /**
   * @private
   * @method manageSoundSettings
   * @description     Persists volume/mute settings for the application
   * @returns {none}
   * @memberof HomePage
   */
  private manageSoundSettings(): void {
    if (this.isMuted) {
      this.mutePlayback();
    }

    if (this.isVolumeChanged) {
      this.soundManager.changeVolume(this.volume);
    }
  }


  /**
   * @private
   * @method determineCurrentTime
   * @description     Determines the playback time display
   * @param {number} time
   * @returns {none}
   * @memberof HomePage
   */
  private determineCurrentTime(time: number): void {
    const minutes = this.soundManager.getMinutes(time);
    const seconds = this.soundManager.getSeconds(time);
    this.currentTime = minutes + ':' + seconds;

    // this.trackDuration =  ((this.soundManager.getDuration() % 3600) / 60).toFixed(2);
  }


  /**
   * @private
   * @method determinePlaybackTime
   * @description   Determines the current playback time for the track being played
   * @param {number} width
   * @return {none}
   * @memberof HomePage
   */
  private determinePlaybackTime(width: number): void {
    this.playHeadPosition = parseInt(this.scrubber.nativeElement.style.left || 0, 10);
    this.playbackBarWidth = width;
    this.playbackTime = this.playHeadPosition / this.playbackBarWidth * this.soundManager.getDuration();

    // Properties for tracking visual rendering of playback duration/progress
    // console.log('playHeadPosition is: ' + this.playHeadPosition);
    // console.log('PLayback is: ' + this.playbackTime);
    // console.log('PLayback width: ' + this.playbackBarWidth);
    // console.log('PLayback get duration: ' + this.soundManager.getDuration());
    // tslint:disable-next-line:max-line-length
    // console.log('PLayback time conversion 1: ' + ((((this.playbackBarWidth - 17) * this.soundManager.getDuration()) / 1000) % 60));
    // tslint:disable-next-line:max-line-length
    // console.log('PLayback time conversion 2: ' + (((((this.playbackBarWidth - 17) * this.soundManager.getDuration()) / 1000) % 3600) / 60));
    // ((530106.5142857142/1000) % 3660) / 60
    this.determineCurrentTime(this.playbackTime);
  }


  /**
   * @private
   * @method cancelPlayback
   * @description  Resets all applicable playback values and stops the current track being played
   * @returns {none}
   * @memberof HomePage
   */
  private cancelPlayback(): void {
    window.cancelAnimationFrame(this.requestAnimation);
    this.currentTime = '0.00';
    this.trackDuration = '0.00';
    this.renderer.setStyle(this.progress.nativeElement, 'width', 0);
    this.renderer.setStyle(this.scrubber.nativeElement, 'left', 0);
    this.playbackPosition = 0;
    this.trackName = '';
    this.artistName = '';
    this.dragging  = false;
    this.isPlaying  = false;
    this.soundManager.stopSound();
  }


  /**
   * @public
   * @method isPlayback
   * @descrription    Reverses the playback of a track (MUST be preset BEFORE loading the track to play)
   * @param {*} event
   * @returns {none}
   * @memberof HomePage
   */
  public isPlaybackReversed(event: any): void {
    this.soundManager.setReversedState(event.detail.checked);
  }


  /**
   * @public
   * @method loopTracks
   * @description     Sets the value for wheether playback of trracks continues on a loop or just one-time only
   * @param {*} event
   * @returns {none}
   * @memberof HomePage
   */
  public loopTracks(event): void {
    this.tracksAreLooped = event.detail.checked;
  }


  /**
   * @public
   * @method onDragDown
   * @description     Triggered when the playback head is depressed - prior to dragging
   * @param {MouseEvent} event
   * @returns {none}
   * @memberof HomePage
   */
  public onDragDown(event: MouseEvent): void {

    // Cancel requestionAnimationFrame utility - we need to ensure that the playback is NOT updated whilst we drag
    // the playback head across the playback indicator bar
    window.cancelAnimationFrame(this.requestAnimation);

    // Set up initial property values for tracking/determining dragging
    this.dragging = true;
    this.startX = event.pageX;
    this.startLeft = parseInt(this.scrubber.nativeElement.style.left, 10);
  }


  /**
   * @public
   * @method onDragMove
   * @description   When the playback head is dragged across the playback bar we need to calculate currrent position
   *                and update the width of the progress bar and the position of the playback head accordingly
   * @param {MouseEvent} event
   * @returns {none}
   * @memberof HomePage
   */
  public onDragMove(event: MouseEvent): void {
    let width: number;
    let position: number;
    if ( !this.dragging ) {
      return;
    }

    // Draggable boundary is determined by track - handle width...and 3 pixels for visual tidiness :)
    width = this.track.nativeElement.offsetWidth - ((this.scrubber.nativeElement.offsetWidth) - 3);
    position = this.startLeft + ( event.pageX - this.startX );
    position = Math.max(Math.min(width, position), 0);
    const percentage = ((position / width) * 100);
    this.renderer.setStyle(this.scrubber.nativeElement, 'left', position + 'px');
    this.renderer.setStyle(this.progress.nativeElement, 'width', percentage + '%');
  }


  /**
   * @public
   * @method onDragRelease
   * @description     When the playback head is released from being dragged we need to update its position, the width of
   *                  the playback progress bar and determine where the current track will now play from based on the
   *                  current position of the playhead
   * @param {MouseEvent} event
   * @returns {none}
   * @memberof HomePage
   */
  public onDragRelease(event: MouseEvent): void {
    this.playHeadPosition = parseInt(this.scrubber.nativeElement.style.left || 0, 10);
    if (this.dragging) {
      this.playbackBarWidth = this.track.nativeElement.offsetWidth;
      this.playbackTime = this.playHeadPosition / this.playbackBarWidth * this.soundManager.getDuration();
      this.renderer.setStyle(this.progress.nativeElement, 'width', ((this.playbackTime / this.soundManager.getDuration() * 100)) + '%');
      this.renderer.setStyle(this.scrubber.nativeElement, 'left', this.playHeadPosition + 'px');
      this.startLeft = this.playHeadPosition;
      this.determinePlaybackOfTrack(this.playbackTime);
      this.dragging = false;
    }
  }


  /**
   * @public
   * @method determinePlaybackOfTrack
   * @description     Manages the playback of the current track after the playhead has been released from being dragged
   * @param {number} time
   * @returns {none}
   * @memberof HomePage
   */
  public determinePlaybackOfTrack(time: number): void {
    if (this.isPlaying) {
      this.soundManager.stopSound();
      this.soundManager.loadSound(this.tracks[this.currentTrack].track, time);
      // We need to delay the triggering of the requestAnimationFrame - if we don't the playback bar and playhead
      // reset to zero before jumping back to their dragged position (play with the timeout value - see what works best for you)
      setTimeout(() => {
        this.determineCurrentTime(this.playbackTime);
        this.update();
      }, 1000);
    }
    else {
      this.playbackPosition = time;
    }
  }


  /**
   * @public
   * @method pause
   * @description     Pauses the current track and stores its current playback position for subsequent playing
   * @returns {none}
   * @memberof HomePage
   */
  public pause(): void {
    if (this.soundManager.getSource()) {
      this.soundManager.pause();
      this.playbackPosition = this.soundManager.getTime() - this.soundManager.getStartTime();
      this.isPlaying = false;
    }
  }


  /**
   * @public
   * @method updatePosition
   * @description     Calculates the current playback position
   * @returns {number}
   * @memberof HomePage
   */
  public updatePosition(): number {
    this.playbackPosition = this.isPlaying ? this.soundManager.getTime() - this.soundManager.getStartTime() : this.playbackPosition;
    // If we are at the end of the track we might want to pause :)
    if ( this.playbackPosition >= this.soundManager.getDuration() ) {
      this.playbackPosition = this.soundManager.getDuration();
      this.pause();
    }
    return this.playbackPosition;
  }

}
