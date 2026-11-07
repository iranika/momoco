import { beforeEach, describe, expect, it, vi } from 'vitest';
import { advanceReadingPosition, readReadingPosition, writeReadingPosition } from './readingPosition';

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

  describe('advanceReadingPosition', () => {
    it('advances to a higher episode', () => {
      advanceReadingPosition(10);
      expect(readReadingPosition()).toBe(10);
      advanceReadingPosition(13);
      expect(readReadingPosition()).toBe(13);
    });

    it('never moves the position backwards', () => {
      advanceReadingPosition(13);
      advanceReadingPosition(5);
      expect(readReadingPosition()).toBe(13);
    });

    it('ignores invalid values', () => {
      advanceReadingPosition(7);
      advanceReadingPosition('abc');
      advanceReadingPosition(-2);
      advanceReadingPosition(0);
      expect(readReadingPosition()).toBe(7);
    });

    it('recovers from a corrupted stored value', () => {
      backing.set('reading_position', 'abc');
      advanceReadingPosition(4);
      expect(readReadingPosition()).toBe(4);
    });
  });
});
