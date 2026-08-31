// Your plugin starts here.
//
// `hairobo` is already available — the app injects it before this file runs.
// Every call returns a Promise: it RESOLVES with a result, and REJECTS when
// the app refuses (almost always a permission you didn't declare in
// manifest.json).

const status = (msg) => { document.getElementById('status').textContent = msg; };

document.getElementById('go').onclick = async () => {
  try {
    await hairobo.voice.speak("Hello from my plugin");

    // Look left, then right, then back to centre. x/y are -1..1, +y is up.
    for (const [x, y] of [[-0.7, 0], [0.7, 0], [0, 0]]) {
      await hairobo.eyes.look(x, y);
      await hairobo.wait(400);
    }

    status('Done.');
  } catch (err) {
    // Show the reason — this is how you find a missing permission.
    status('Refused: ' + err);
  }
};

// Called when the plugin is closing. Put anything back that you changed.
// Don't rely on it for anything critical: the app resets the robot itself,
// because your plugin might crash before this runs.
//
// Only touch APIs you declared. This starter asks for `voice` and `eyes`, so
// calling hairobo.led.* here would be refused on a device — and rejected at
// submission, which is the faster way to find out.
hairobo.on('exit', () => {
  hairobo.eyes.look(0, 0).catch(() => {});
});
