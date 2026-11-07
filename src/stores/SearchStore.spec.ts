import { describe, expect, it, vi } from 'vitest';

vi.mock('quasar', () => ({
  Notify: { create: vi.fn() },
}));

import {
  normalizeSearchInfo,
  toSearchInfoMap,
  toStringArray,
} from './SearchStore';

describe('toStringArray', () => {
  it('keeps non-empty strings from an array', () => {
    expect(toStringArray([' せり ', '', 123, 'すずな'])).toEqual(['せり', 'すずな']);
  });

  it('splits a comma/、 separated string', () => {
    expect(toStringArray('せり, すずな、いね')).toEqual(['せり', 'すずな', 'いね']);
  });

  it('returns an empty array for other types', () => {
    expect(toStringArray(undefined)).toEqual([]);
    expect(toStringArray(42)).toEqual([]);
    expect(toStringArray(null)).toEqual([]);
  });
});

describe('normalizeSearchInfo', () => {
  it('accepts the Characters spelling', () => {
    const info = normalizeSearchInfo({ Characters: ['せり'], Keyword: 'a,b', Comment: 'c' });
    expect(info.Characters).toEqual(['せり']);
    expect(info.Keyword).toEqual(['a', 'b']);
    expect(info.Comment).toBe('c');
  });

  it('accepts the Charactors (misspelled) spelling', () => {
    const info = normalizeSearchInfo({ Charactors: 'せり,すずな', Keyword: [], Comment: 'x' });
    expect(info.Characters).toEqual(['せり', 'すずな']);
  });

  it('falls back for null/invalid input', () => {
    const info = normalizeSearchInfo(undefined);
    expect(info.Characters).toEqual([]);
    expect(info.Keyword).toEqual([]);
    expect(info.Comment).toContain('検索DB');
  });
});

describe('toSearchInfoMap', () => {
  it('maps rows by their key (episode index)', () => {
    const rows = [
      { '0': { Characters: ['せり'], Keyword: [], Comment: 'a' } },
      { '5': { Characters: [], Keyword: ['x'], Comment: 'b' } },
    ];
    const map = toSearchInfoMap(rows);
    expect(map.get(0)?.Characters).toEqual(['せり']);
    expect(map.get(5)?.Keyword).toEqual(['x']);
    expect(map.has(1)).toBe(false);
  });

  it('uses the array index when the key is empty', () => {
    const map = toSearchInfoMap([{ '': { Characters: [], Keyword: [], Comment: 'c' } }]);
    expect(map.get(0)?.Comment).toBe('c');
  });

  it('returns an empty map for non-array input', () => {
    expect(toSearchInfoMap(null).size).toBe(0);
    expect(toSearchInfoMap({}).size).toBe(0);
  });

  it('skips malformed rows', () => {
    const map = toSearchInfoMap([null, {}, { abc: {} }]);
    expect(map.size).toBe(0);
  });
});
