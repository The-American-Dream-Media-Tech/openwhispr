/**
 * UpdateManager - LOCAL-ONLY STUB
 *
 * Auto-updater has been disabled for air-gapped / local-only operation.
 * All methods are no-ops that maintain the expected interface.
 */

class UpdateManager {
  constructor() {
    this.mainWindow = null;
    this.controlPanelWindow = null;
    this.updateAvailable = false;
    this.updateDownloaded = false;
    this.lastUpdateInfo = null;
    this.isInstalling = false;
    this.windowManager = null;
  }

  setWindows(mainWindow, controlPanelWindow) {
    this.mainWindow = mainWindow;
    this.controlPanelWindow = controlPanelWindow;
  }

  setWindowManager(windowManager) {
    this.windowManager = windowManager;
  }

  checkForUpdatesOnStartup() {
    // no-op: auto-updater disabled for local-only mode
  }

  checkForUpdates() {
    // no-op: auto-updater disabled for local-only mode
  }

  getUpdateStatus() {
    return {
      updateAvailable: false,
      updateDownloaded: false,
      lastUpdateInfo: null,
      isInstalling: false,
    };
  }

  downloadUpdate() {
    // no-op
  }

  installUpdate() {
    // no-op
  }

  cleanup() {
    // no-op
  }
}

module.exports = UpdateManager;
