// verify_message_listener.js
// Unit tests for verifying the robustness of the fallback message listener logic in page.tsx

const assert = require('assert');

// The logic under test extracted from src/app/ultimate-guide/portal/page.tsx
function createMessageListener(setCurrentTime) {
  return function handleMessage(event) {
    let parsed = null;
    if (typeof event.data === 'string') {
      try {
        parsed = JSON.parse(event.data);
      } catch {
        // Silently skip non-JSON messages
        return;
      }
    } else if (event.data && typeof event.data === 'object') {
      parsed = event.data;
    } else {
      return;
    }

    if (parsed && parsed.event === 'timeupdate') {
      let secs = -1;
      if (typeof parsed.value === 'number') {
        secs = parsed.value;
      } else if (parsed.value && typeof parsed.value === 'object' && typeof parsed.value.seconds === 'number') {
        secs = parsed.value.seconds;
      } else if (parsed.data && typeof parsed.data === 'object' && typeof parsed.data.seconds === 'number') {
        secs = parsed.data.seconds;
      } else if (typeof parsed.seconds === 'number') {
        secs = parsed.seconds;
      }
      if (secs >= 0) {
        setCurrentTime(secs);
      }
    }
  };
}

// Test Runner
const tests = [];
function test(name, fn) {
  tests.push({ name, fn });
}

test('Valid JSON timeupdate with value number', () => {
  let times = [];
  const listener = createMessageListener((t) => times.push(t));
  listener({ data: JSON.stringify({ event: 'timeupdate', value: 42.5 }) });
  assert.deepStrictEqual(times, [42.5]);
});

test('Valid JSON timeupdate with value object containing seconds', () => {
  let times = [];
  const listener = createMessageListener((t) => times.push(t));
  listener({ data: JSON.stringify({ event: 'timeupdate', value: { seconds: 12 } }) });
  assert.deepStrictEqual(times, [12]);
});

test('Valid JSON timeupdate with data object containing seconds', () => {
  let times = [];
  const listener = createMessageListener((t) => times.push(t));
  listener({ data: JSON.stringify({ event: 'timeupdate', data: { seconds: 100 } }) });
  assert.deepStrictEqual(times, [100]);
});

test('Valid JSON timeupdate with seconds attribute directly', () => {
  let times = [];
  const listener = createMessageListener((t) => times.push(t));
  listener({ data: JSON.stringify({ event: 'timeupdate', seconds: 50 }) });
  assert.deepStrictEqual(times, [50]);
});

test('Direct object message instead of stringified JSON', () => {
  let times = [];
  const listener = createMessageListener((t) => times.push(t));
  listener({ data: { event: 'timeupdate', value: 88 } });
  assert.deepStrictEqual(times, [88]);
});

test('Non-JSON string (should not throw and should be ignored)', () => {
  let times = [];
  const listener = createMessageListener((t) => times.push(t));
  listener({ data: 'Hello world, this is random text' });
  assert.deepStrictEqual(times, []);
});

test('Invalid event type in JSON', () => {
  let times = [];
  const listener = createMessageListener((t) => times.push(t));
  listener({ data: JSON.stringify({ event: 'other-event', value: 42 }) });
  assert.deepStrictEqual(times, []);
});

test('Negative number in value (should be ignored)', () => {
  let times = [];
  const listener = createMessageListener((t) => times.push(t));
  listener({ data: JSON.stringify({ event: 'timeupdate', value: -5 }) });
  assert.deepStrictEqual(times, []);
});

test('Value of zero (should succeed since secs >= 0)', () => {
  let times = [];
  const listener = createMessageListener((t) => times.push(t));
  listener({ data: JSON.stringify({ event: 'timeupdate', value: 0 }) });
  assert.deepStrictEqual(times, [0]);
});

test('Missing value and other time fields', () => {
  let times = [];
  const listener = createMessageListener((t) => times.push(t));
  listener({ data: JSON.stringify({ event: 'timeupdate' }) });
  assert.deepStrictEqual(times, []);
});

test('Value is null (should not crash and should be ignored)', () => {
  let times = [];
  const listener = createMessageListener((t) => times.push(t));
  listener({ data: JSON.stringify({ event: 'timeupdate', value: null }) });
  assert.deepStrictEqual(times, []);
});

test('Data is null (should not crash and should be ignored)', () => {
  let times = [];
  const listener = createMessageListener((t) => times.push(t));
  listener({ data: JSON.stringify({ event: 'timeupdate', data: null }) });
  assert.deepStrictEqual(times, []);
});

test('Event data is null', () => {
  let times = [];
  const listener = createMessageListener((t) => times.push(t));
  listener({ data: null });
  assert.deepStrictEqual(times, []);
});

test('Event data is undefined', () => {
  let times = [];
  const listener = createMessageListener((t) => times.push(t));
  listener({ data: undefined });
  assert.deepStrictEqual(times, []);
});

test('Event data is NaN', () => {
  let times = [];
  const listener = createMessageListener((t) => times.push(t));
  listener({ data: { event: 'timeupdate', value: NaN } });
  assert.deepStrictEqual(times, []);
});

test('Event data is Infinity', () => {
  let times = [];
  const listener = createMessageListener((t) => times.push(t));
  listener({ data: { event: 'timeupdate', value: Infinity } });
  assert.deepStrictEqual(times, [Infinity]);
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
  console.log('\nAll message listener unit tests passed successfully!');
}
