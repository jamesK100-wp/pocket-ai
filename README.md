# Pocket AI — personal mobile chat

A real browser-local AI starter: no API key, backend, or running PC. Built with Transformers.js 3.8.1 and the quantized SmolLM2-135M-Instruct ONNX model. This is a tiny general text assistant, not Claude or a clone of its model. It can produce incorrect or incoherent answers. Vivo V21e performance is not verified.

## Put it on GitHub and open it on your phone

1. Create a GitHub repository named `pocket-ai`. The free Pages route normally uses a public repository: code and the website are publicly accessible. Do not upload personal files, chats, passwords, or API keys.
2. Upload `index.html` and `worker.js` to the repository root. Upload the files inside this folder, not the ZIP itself.
3. Open repository Settings → Pages → Build and deployment → Deploy from a branch. Choose `main` and `/ (root)`, then Save.
4. Once published, use the HTTPS website address shown in Pages settings. On your Vivo, open it in updated Chrome.
5. Tap **Download & start AI** on Wi-Fi. The first load downloads model/runtime files, potentially hundreds of MB. Wait for Ready before sending. Downloads are cached when the browser permits; browser cleanup/eviction can require another download.
6. Use Chrome's menu → Add to Home screen to make a shortcut. The PC can be switched off after deployment.

## Test on your PC without GitHub

Install Python, open a terminal in this folder, run:

    python -m http.server 8000

Open http://localhost:8000. Do not double-click index.html: module workers need an HTTP(S) origin. Local testing requires the PC server only during the test.

## Included

- Mobile layout, streaming replies, Stop, clear chat, custom instructions and JSON export.
- Recent conversation context (last 6 messages, bounded text lengths).
- Browser-local chat persistence, safe text rendering, failure recovery.
- CPU/WASM inference: does not require WebGPU support on older phones.

## Privacy and limits

No chat backend or analytics. Prompts are processed on the device and saved to this browser's local storage. CDN and model hosts receive download requests (including normal connection metadata). This is personal storage, not authentication: the website is public and browser/device users can access its stored chat. Do not use public computers for confidential chats.

No live search, attachments, Excel processing, cloud sync or guaranteed offline launch. The page/runtime may require internet on reopening, even when model weights are cached. Android can suspend background tabs; keep the app visible during generation. Slow replies or out-of-memory errors are possible. The 135M model is intentionally small; quality, Hindi support and reasoning are limited. Custom instructions are guidance, not a guarantee.

## Troubleshooting

- Worker/module error: serve via HTTPS or localhost; confirm worker.js is beside index.html.
- Download error: retry on stable Wi-Fi; check access to cdn.jsdelivr.net and huggingface.co.
- Memory issue: close other apps/tabs and restart the AI.
- Page not updating: reload after GitHub Pages deployment completes.
- Stop terminates the worker immediately. Tap Restart AI to load it again (cached files may be reused).

## Validation

JavaScript syntax checked during delivery. Actual model download/inference and Vivo device performance were not tested in the delivery environment. Test a simple prompt such as 'Say hello in one sentence' after deployment before relying on it.

References:
https://huggingface.co/docs/transformers.js/v3.8.1/index
https://huggingface.co/onnx-community/SmolLM2-135M-Instruct-ONNX
