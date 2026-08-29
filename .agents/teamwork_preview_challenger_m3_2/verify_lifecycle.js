// verify_lifecycle.js
// Simulates and verifies the lifecycle, onLoad handler, and timing/lazy-loading scenarios for the PlayerJS initialization logic.

const assert = require('assert');

// Mock setTimeout and setInterval
let mockTimeouts = [];
let mockIntervals = [];
let activeTimersCount = 0;

function mockSetTimeout(callback, delay) {
  const id = { type: 'timeout', callback, delay, active: true };
  mockTimeouts.push(id);
  activeTimersCount++;
  return id;
}

function mockClearTimeout(id) {
  if (id && id.active) {
    id.active = false;
    activeTimersCount--;
  }
}

function mockSetInterval(callback, delay) {
  const id = { type: 'interval', callback, delay, active: true };
  mockIntervals.push(id);
  activeTimersCount++;
  return id;
}

function mockClearInterval(id) {
  if (id && id.active) {
    id.active = false;
    activeTimersCount--;
  }
}

// Class to simulate the page component's useEffect lifecycle
class PlayerLifecycleSim {
  constructor() {
    this.activeIdx = 0;
    this.playerRef = { current: null };
    this.iframeLoadedRef = { current: false };
    this.iframeLoadHandlerRef = { current: null };
    this.currentTime = 0;
    
    // Globals mock
    this.window = {
      playerjs: null // starts as undefined or null (lazy-loaded)
    };
    
    this.document = {
      querySelector: () => this.iframeMock
    };
    
    this.iframeMock = {
      // simulated iframe element
    };

    this.cleanup = null;
  }

  setCurrentTime(t) {
    this.currentTime = t;
  }

  // Simulates mounting or updating activeIdx
  mount(activeIdx) {
    if (this.cleanup) {
      this.cleanup();
    }
    this.activeIdx = activeIdx;
    
    // The actual useEffect code from page.tsx (adapted to use mocks)
    let player = null;
    let isInitialized = false;
    let fallbackTimeout = null;
    let pollInterval = null;

    this.iframeLoadedRef.current = false;

    const tryInit = () => {
      if (isInitialized) return;

      const iframe = this.document.querySelector('.portal-video-ratio iframe');
      const playerjsLoaded = typeof this.window !== 'undefined' && !!this.window.playerjs;

      if (iframe && playerjsLoaded && this.iframeLoadedRef.current) {
        try {
          isInitialized = true;
          if (fallbackTimeout) {
            mockClearTimeout(fallbackTimeout);
            fallbackTimeout = null;
          }
          if (pollInterval) {
            mockClearInterval(pollInterval);
            pollInterval = null;
          }

          const activePlayer = new this.window.playerjs.Player(iframe);
          player = activePlayer;
          this.playerRef.current = activePlayer;
          
          activePlayer.on('ready', () => {
            activePlayer.on('timeupdate', (data) => {
              const seconds = data?.seconds;
              if (typeof seconds === 'number') {
                this.setCurrentTime(seconds);
              }
            });
          });
        } catch (err) {
          isInitialized = false;
        }
      }
    };

    this.iframeLoadHandlerRef.current = () => {
      this.iframeLoadedRef.current = true;
      tryInit();
    };

    fallbackTimeout = mockSetTimeout(() => {
      if (!this.iframeLoadedRef.current) {
        this.iframeLoadedRef.current = true;
        tryInit();
      }
    }, 3000);

    pollInterval = mockSetInterval(() => {
      tryInit();
    }, 500);

    this.cleanup = () => {
      if (fallbackTimeout) mockClearTimeout(fallbackTimeout);
      if (pollInterval) mockClearInterval(pollInterval);
      this.playerRef.current = null;
      if (player) {
        try {
          player.off('timeupdate');
        } catch {}
      }
    };
  }
}

// Tests
const tests = [];
function test(name, fn) {
  tests.push({ name, fn });
}

test('Standard path: Script already loaded, iframe onload triggers first', () => {
  mockTimeouts = [];
  mockIntervals = [];
  activeTimersCount = 0;

  const sim = new PlayerLifecycleSim();
  // PlayerJS is already available
  let onCallbacks = {};
  sim.window.playerjs = {
    Player: class {
      on(event, cb) {
        onCallbacks[event] = cb;
      }
      off(event) {
        delete onCallbacks[event];
      }
    }
  };

  sim.mount(0);

  // Assert timers scheduled
  assert.strictEqual(mockTimeouts.length, 1);
  assert.strictEqual(mockIntervals.length, 1);
  assert.strictEqual(mockTimeouts[0].active, true);
  assert.strictEqual(mockIntervals[0].active, true);

  // Trigger iframe onLoad
  sim.iframeLoadHandlerRef.current();

  // Initialization should succeed and clear the timers
  assert.strictEqual(sim.playerRef.current !== null, true);
  assert.strictEqual(mockTimeouts[0].active, false);
  assert.strictEqual(mockIntervals[0].active, false);
  assert.strictEqual(activeTimersCount, 0);

  // Simulate player ready callback and check event registration
  assert.strictEqual(typeof onCallbacks['ready'], 'function');
  onCallbacks['ready']();

  assert.strictEqual(typeof onCallbacks['timeupdate'], 'function');
  onCallbacks['timeupdate']({ seconds: 12.3 });
  assert.strictEqual(sim.currentTime, 12.3);
});

test('Lazy-loading scenario: iframe loads, but playerjs script takes 1 second to load', () => {
  mockTimeouts = [];
  mockIntervals = [];
  activeTimersCount = 0;

  const sim = new PlayerLifecycleSim();
  sim.mount(0);

  // Iframe loads immediately
  sim.iframeLoadHandlerRef.current();
  
  // Initialization should NOT succeed yet because playerjs is not on window
  assert.strictEqual(sim.playerRef.current, null);
  assert.strictEqual(mockIntervals[0].active, true);

  // Trigger first poll (500ms), still not loaded
  mockIntervals[0].callback();
  assert.strictEqual(sim.playerRef.current, null);

  // Now script loads
  let onCallbacks = {};
  sim.window.playerjs = {
    Player: class {
      on(event, cb) {
        onCallbacks[event] = cb;
      }
      off(event) {
        delete onCallbacks[event];
      }
    }
  };

  // Next poll triggers (1000ms)
  mockIntervals[0].callback();

  // Initialization should succeed and clear the timers
  assert.strictEqual(sim.playerRef.current !== null, true);
  assert.strictEqual(mockIntervals[0].active, false);
  assert.strictEqual(mockTimeouts[0].active, false);
});

test('Backup timeout scenario: iframe onLoad never triggers, fallback timeout fires after 3 seconds', () => {
  mockTimeouts = [];
  mockIntervals = [];
  activeTimersCount = 0;

  const sim = new PlayerLifecycleSim();
  let onCallbacks = {};
  sim.window.playerjs = {
    Player: class {
      on(event, cb) {
        onCallbacks[event] = cb;
      }
      off(event) {
        delete onCallbacks[event];
      }
    }
  };

  sim.mount(0);

  // Trigger fallback timeout
  mockTimeouts[0].callback();

  // Initialization should succeed and clear the poll interval
  assert.strictEqual(sim.playerRef.current !== null, true);
  assert.strictEqual(mockIntervals[0].active, false);
  assert.strictEqual(sim.iframeLoadedRef.current, true);
});

test('Quick lesson switching: mount Lesson 0 then immediately Lesson 1', () => {
  mockTimeouts = [];
  mockIntervals = [];
  activeTimersCount = 0;

  const sim = new PlayerLifecycleSim();
  
  sim.mount(0);
  const timeout0 = mockTimeouts[0];
  const interval0 = mockIntervals[0];
  assert.strictEqual(timeout0.active, true);
  assert.strictEqual(interval0.active, true);

  // Immediately switch to lesson 1 before anything triggers
  sim.mount(1);

  // The first set of timers should be cleaned up / cancelled
  assert.strictEqual(timeout0.active, false);
  assert.strictEqual(interval0.active, false);

  // A new set of timers is created
  assert.strictEqual(mockTimeouts.length, 2);
  assert.strictEqual(mockIntervals.length, 2);
  assert.strictEqual(mockTimeouts[1].active, true);
  assert.strictEqual(mockIntervals[1].active, true);
});

// Run all tests
let failed = 0;
for (const t of tests) {
  try {
    t.fn();
    console.log(`✓ PASS: ${t.name}`);
  } catch (err) {
    console.error(`✗ FAIL: ${t.name}`);
    console.error(err);
    failed++;
  }
}

if (failed > 0) {
  process.exit(1);
} else {
  console.log('\nAll lifecycle unit tests passed successfully!');
}
