# How to Apply Changes to Your OpenWhispr Fork

## Quick Start (3 commands)

```bash
# 1. Clone your fork
git clone https://github.com/The-American-Dream-Media-Tech/openwhispr.git
cd openwhispr

# 2. Switch to the feature branch and apply the patch
git checkout feat/mouse-button-stt-ollama
git am openwhispr-all-changes.patch

# 3. Install dependencies (including the new uiohook-napi) and push
npm install
git push origin feat/mouse-button-stt-ollama
```

Place the `openwhispr-all-changes.patch` file in the repo root before running `git am`.

## What the Patch Contains (8 files, 1 new)

| File | Change |
|------|--------|
| `src/helpers/mouseButtonManager.js` | **NEW** - Global mouse button listener via uiohook-napi |
| `src/helpers/hotkeyManager.js` | Wire in MouseButtonManager for MiddleMouse/Mouse4/Mouse5 |
| `src/utils/hotkeyValidator.ts` | Accept mouse button hotkeys as valid |
| `src/utils/hotkeys.ts` | Display labels ("Middle Mouse Button", etc.) |
| `src/helpers/whisperServer.js` | Auto-set thread count (75% CPU cores, max 4) |
| `src/helpers/audioManager.js` | Raise silence threshold 0.002 -> 0.005 |
| `src/stores/settingsStore.ts` | Default Whisper model: "base" -> "tiny" |
| `package.json` | Add uiohook-napi dependency |

## Ollama Setup (GPU-Accelerated)

Since you have a powerful local GPU, use Ollama with GPU acceleration:

```bash
# Install Ollama
curl -fsSL https://ollama.com/install.sh | sh

# Pull a model (Ollama auto-detects and uses your GPU)
ollama pull mistral          # Fast, great quality, ~4.1 GB
ollama pull llama3:8b        # Strong all-rounder, ~4.7 GB
ollama pull qwen2.5:14b      # Excellent for coding, ~9 GB (if you have 16GB+ VRAM)

# Verify GPU is being used
ollama run mistral "Hello" --verbose
# Look for "gpu" in the output
```

Ollama automatically detects NVIDIA GPUs (via CUDA) and AMD GPUs (via ROCm). No extra config needed.

### Configure in OpenWhispr

1. Open OpenWhispr Settings
2. Go to **Reasoning / AI Model** section
3. Click **Cloud** tab -> select **Custom**
4. Set endpoint: `http://localhost:11434/v1`
5. Leave API key **blank**
6. Click **Fetch Models** -> select your model
7. Done - zero API costs, runs entirely on your GPU

### Whisper GPU Acceleration Too

For STT, if you have an NVIDIA GPU, also enable GPU-accelerated Whisper:

```bash
# Set in your shell profile or the app's .env file:
export TRANSCRIPTION_GPU_INDEX=0
```

The app will auto-detect and use the CUDA-accelerated `whisper-server` binary. Combined with the `tiny` model default, expect near-instant transcription.

## Test It

```bash
npm run dev
```

1. Go to Settings -> Hotkey -> type `MiddleMouse` -> should register
2. Middle-click anywhere -> dictation should start
3. Settings -> Transcription -> confirm "tiny" model or Parakeet
4. Settings -> Reasoning -> Custom -> `http://localhost:11434/v1` -> Fetch Models
