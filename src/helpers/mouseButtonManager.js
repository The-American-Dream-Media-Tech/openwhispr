/**
 * MouseButtonManager - Handles global mouse button detection for hotkey triggers
 *
 * Uses uiohook-napi to detect when specific mouse buttons are
 * pressed and released, enabling mouse-button-based hotkey triggers
 * (e.g., middle mouse button for Push-to-Talk).
 */

const { uIOhook } = require("uiohook-napi");
const EventEmitter = require("events");
const debugLogger = require("./debugLogger");

// Mouse button codes from uiohook-napi
const MOUSE_BUTTONS = {
  MiddleMouse: 2, // middle click
  Mouse4: 4, // back/side button
  Mouse5: 5, // forward/side button
};

class MouseButtonManager extends EventEmitter {
  constructor() {
    super();
    this.isRunning = false;
    this.targetButton = null;
    this.currentHotkey = null;
    this._mouseDownHandler = null;
    this._mouseUpHandler = null;
  }

  /**
   * Check if a hotkey string refers to a mouse button
   * @param {string} hotkey
   * @returns {boolean}
   */
  static isMouseButtonHotkey(hotkey) {
    return hotkey in MOUSE_BUTTONS;
  }

  /**
   * Start listening for the specified mouse button
   * @param {string} hotkey - "MiddleMouse", "Mouse4", or "Mouse5"
   */
  start(hotkey) {
    if (!MouseButtonManager.isMouseButtonHotkey(hotkey)) {
      debugLogger.warn("[MouseButtonManager] Unknown mouse button hotkey:", hotkey);
      return;
    }

    // If already running with the same button, do nothing
    if (this.isRunning && this.currentHotkey === hotkey) {
      return;
    }

    this.stop();

    this.targetButton = MOUSE_BUTTONS[hotkey];
    this.currentHotkey = hotkey;

    this._mouseDownHandler = (e) => {
      if (e.button === this.targetButton) {
        debugLogger.debug("[MouseButtonManager] Mouse button DOWN", { button: hotkey });
        this.emit("key-down", hotkey);
        this.emit("trigger");
      }
    };

    this._mouseUpHandler = (e) => {
      if (e.button === this.targetButton) {
        debugLogger.debug("[MouseButtonManager] Mouse button UP", { button: hotkey });
        this.emit("key-up", hotkey);
      }
    };

    uIOhook.on("mousedown", this._mouseDownHandler);
    uIOhook.on("mouseup", this._mouseUpHandler);

    // uIOhook.start() is idempotent if already running
    if (!MouseButtonManager._uiohookStarted) {
      uIOhook.start();
      MouseButtonManager._uiohookStarted = true;
    }

    this.isRunning = true;
    debugLogger.debug("[MouseButtonManager] Now listening for", hotkey);
  }

  /**
   * Stop listening for mouse button events
   */
  stop() {
    if (this._mouseDownHandler) {
      uIOhook.off("mousedown", this._mouseDownHandler);
      this._mouseDownHandler = null;
    }
    if (this._mouseUpHandler) {
      uIOhook.off("mouseup", this._mouseUpHandler);
      this._mouseUpHandler = null;
    }
    this.isRunning = false;
    this.currentHotkey = null;
    this.targetButton = null;
  }
}

MouseButtonManager._uiohookStarted = false;

module.exports = MouseButtonManager;
