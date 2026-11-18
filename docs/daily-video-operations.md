# Daily Tech: operation and delivery

## Automated trigger
When the editorial automation commits `content/daily/YYYY-MM-DD.json` to `main`, GitHub Actions starts the Daily Tech render workflow. Manual `workflow_dispatch` is also available. The source bridge remains conditional on the ChatGPT automation's ability to retrieve the original Resumen Tech result and write the JSON.

## Render and narration
The composition is 90 seconds, 1080×1920, 30 fps. The video is a template-based preview, not yet cinematic 3D.

For professional es-ES narration, configure GitHub Actions secrets:
- `AZURE_SPEECH_KEY`: Azure AI Speech resource key
- `AZURE_SPEECH_REGION`: region of that resource (e.g. westeurope)

Optional repository variable: `AZURE_SPEECH_VOICE` (default `es-ES-AlvaroNeural`).

If Speech credentials are not present, the workflow deliberately produces a **silent preview**, an SRT and a narration script. It does not falsely claim to have produced a narrated video. If Azure Speech fails or the script exceeds scene timings, the workflow fails rather than clipping narration.

## Limitations
- The SRT uses section-level timing, not word-aligned transcription. It is a draft, not broadcast-ready captions.
- Source validation checks references structurally but cannot independently establish factual accuracy. Human editorial review required.
- No licensed background music is included. No social publishing is automated.
- A commit made using GitHub's default GITHUB_TOKEN may not trigger a second push workflow; if the bridge uses GitHub App/user credentials, verify trigger behavior in Actions.
- Review artifact before sharing. Do not upload videos automatically to social media.
