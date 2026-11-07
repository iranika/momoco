import { describe, expect, it } from 'vitest';
import {
  DEFAULT_KOMA_ASPECT,
  LOOKAHEAD_KOMA_ASPECT,
  estimateEpisodeHeight,
  estimateFrameHeight,
  formatAspectRatio,
  parseAspectRatio,
} from './komaAspect';

describe('parseAspectRatio', () => {
  it('parses "width / height"', () => {
    expect(parseAspectRatio('1408 / 1850')).toBeCloseTo(1408 / 1850);
  });

  it('parses without spaces', () => {
    expect(parseAspectRatio('4/3')).toBeCloseTo(4 / 3);
  });

  it('returns undefined for invalid input', () => {
    expect(parseAspectRatio(undefined)).toBeUndefined();
    expect(parseAspectRatio('')).toBeUndefined();
    expect(parseAspectRatio('abc')).toBeUndefined();
    expect(parseAspectRatio('0 / 5')).toBeUndefined();
  });
});

describe('formatAspectRatio', () => {
  it('formats as "width / height"', () => {
    expect(formatAspectRatio(1408, 1850)).toBe('1408 / 1850');
  });
});

describe('estimateFrameHeight', () => {
  it('uses the stored aspect ratio for the url', () => {
    const height = estimateFrameHeight(500, { 'a.webp': '2 / 1' }, 'a.webp');
    expect(height).toBe(250);
  });

  it('falls back to the lookahead aspect when unknown', () => {
    expect(estimateFrameHeight(500, {}, 'missing.webp')).toBeCloseTo(
      500 / LOOKAHEAD_KOMA_ASPECT,
    );
  });
});

describe('estimateEpisodeHeight', () => {
  it('sums frame heights plus actions height', () => {
    const page = { ImagesUrl: ['a.webp', 'b.webp'] } as Page;
    const height = estimateEpisodeHeight(500, { 'a.webp': '2 / 1', 'b.webp': '2 / 1' }, page, 48);
    expect(height).toBe(250 + 250 + 48);
  });
});

describe('constants', () => {
  it('default aspect matches 1408x1850', () => {
    expect(DEFAULT_KOMA_ASPECT).toBeCloseTo(1408 / 1850);
  });
});
