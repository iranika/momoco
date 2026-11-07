import { beforeEach, describe, expect, it, vi } from 'vitest';
import { readReadingPosition, writeReadingPosition } from './readingPosition';

const backing = new Map<string, string>();

vi.stubGlobal('window', {
  localStorage: {
    getItem: (key: string) => backing.get(key) ?? null,
    setItem: (key: string, value: string) => {
      backing.set(key, value);
    },
  },
});

describe('readingPosition', () => {
  beforeEach(() => backing.clear());

  it('returns null when nothing is stored', () => {
    expect(readReadingPosition()).toBeNull();
  });

  it('round-trips an episode index', () => {
    writeReadingPosition(404);
    expect(readReadingPosition()).toBe(404);
  });

  it('accepts string indexes', () => {
    writeReadingPosition('12');
    expect(readReadingPosition()).toBe(12);
  });

  it('returns null for invalid values', () => {
    backing.set('reading_position', 'abc');
    expect(readReadingPosition()).toBeNull();
    backing.set('reading_position', '-3');
    expect(readReadingPosition()).toBeNull();
    backing.set('reading_position', '0');
    expect(readReadingPosition()).toBeNull();
  });
});
