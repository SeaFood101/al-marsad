import { Howl } from 'howler';

/**
 * SoundManager - Centralized audio and haptic feedback system
 *
 * Usage:
 * - SoundManager.playClick() - Button/keypad press
 * - SoundManager.playUnlock() - Success/unlock sound
 * - SoundManager.playError() - Error/wrong code
 * - SoundManager.playTurn() - Camera rotation
 * - SoundManager.playSlide() - Drawer opening
 * - SoundManager.playStatic(true/false) - TV static (looping)
 */

class SoundManagerClass {
  constructor() {
    // Sound instances (using Howler)
    // NOTE: Audio files don't exist yet - using placeholder paths
    // Add actual .mp3 files to /public/sounds/ when ready
    this.sounds = {
      click: this.createSound('/sounds/click.mp3', { volume: 0.3 }),
      unlock: this.createSound('/sounds/unlock.mp3', { volume: 0.5 }),
      error: this.createSound('/sounds/error.mp3', { volume: 0.4 }),
      turn: this.createSound('/sounds/turn.mp3', { volume: 0.3 }),
      slide: this.createSound('/sounds/slide.mp3', { volume: 0.4 }),
      static: this.createSound('/sounds/static.mp3', { volume: 0.2, loop: true }),
    };

    // Track if static is currently playing
    this.staticPlaying = false;

    // Master volume control
    this.masterVolume = 1.0;

    // Check if haptics are supported
    this.hapticsSupported = 'vibrate' in navigator;
  }

  /**
   * Create a Howl sound instance with error handling
   */
  createSound(src, options = {}) {
    try {
      return new Howl({
        src: [src],
        html5: true, // Use HTML5 Audio for better mobile support
        ...options,
        onloaderror: (id, error) => {
          console.warn(`[SoundManager] Failed to load: ${src}`, error);
        },
        onplayerror: (id, error) => {
          console.warn(`[SoundManager] Failed to play: ${src}`, error);
        },
      });
    } catch (error) {
      console.warn(`[SoundManager] Error creating sound: ${src}`, error);
      return null;
    }
  }

  /**
   * Play a sound (safely handles missing files)
   */
  playSound(soundName) {
    try {
      const sound = this.sounds[soundName];
      if (sound && this.masterVolume > 0) {
        sound.volume(sound._volume * this.masterVolume);
        sound.play();
      }
    } catch (error) {
      // Silently fail if sound doesn't exist yet
      console.debug(`[SoundManager] ${soundName} not available yet`);
    }
  }

  /**
   * Trigger haptic feedback (vibration)
   */
  triggerHaptic(pattern = 50) {
    if (!this.hapticsSupported) return;

    try {
      if (Array.isArray(pattern)) {
        navigator.vibrate(pattern);
      } else {
        navigator.vibrate(pattern);
      }
    } catch (error) {
      console.debug('[SoundManager] Haptics not available');
    }
  }

  // ========================================
  // Public API Methods
  // ========================================

  /**
   * Play click sound (keypad buttons, UI clicks)
   * Haptic: Light tap (50ms)
   */
  playClick() {
    this.playSound('click');
    this.triggerHaptic(50);
  }

  /**
   * Play unlock/success sound
   * Haptic: Double pulse (100ms, 50ms pause, 100ms)
   */
  playUnlock() {
    this.playSound('unlock');
    this.triggerHaptic([100, 50, 100]);
  }

  /**
   * Play error sound
   * Haptic: Error shake (50ms, 30ms, 50ms, 30ms, 50ms)
   */
  playError() {
    this.playSound('error');
    this.triggerHaptic([50, 30, 50, 30, 50]);
  }

  /**
   * Play camera turn sound
   * Haptic: Light tap (30ms)
   */
  playTurn() {
    this.playSound('turn');
    this.triggerHaptic(30);
  }

  /**
   * Play drawer slide sound
   * Haptic: Medium pulse (80ms)
   */
  playSlide() {
    this.playSound('slide');
    this.triggerHaptic(80);
  }

  /**
   * Toggle TV static sound (looping)
   * @param {boolean} enable - True to start, false to stop
   */
  playStatic(enable) {
    try {
      const staticSound = this.sounds.static;
      if (!staticSound) return;

      if (enable && !this.staticPlaying) {
        staticSound.play();
        this.staticPlaying = true;
      } else if (!enable && this.staticPlaying) {
        staticSound.stop();
        this.staticPlaying = false;
      }
    } catch (error) {
      console.debug('[SoundManager] Static sound not available yet');
    }
  }

  /**
   * Set master volume (0.0 to 1.0)
   */
  setVolume(volume) {
    this.masterVolume = Math.max(0, Math.min(1, volume));
  }

  /**
   * Mute all sounds
   */
  mute() {
    this.setVolume(0);
  }

  /**
   * Unmute sounds
   */
  unmute() {
    this.setVolume(1.0);
  }

  /**
   * Stop all currently playing sounds
   */
  stopAll() {
    Object.values(this.sounds).forEach(sound => {
      if (sound) {
        sound.stop();
      }
    });
    this.staticPlaying = false;
  }
}

// Export singleton instance
const SoundManager = new SoundManagerClass();
export default SoundManager;
