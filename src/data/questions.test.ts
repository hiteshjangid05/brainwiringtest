import { describe, it, expect } from 'vitest';
import { QUESTIONS } from './questions';

describe('PDF 30 Questions Dataset', () => {
  it('contains exactly 30 questions from the book', () => {
    expect(QUESTIONS.length).toBe(30);
  });

  it('ensures every question has exactly 3 choices: a, b, and c', () => {
    QUESTIONS.forEach((q) => {
      expect(q.options.length).toBe(3);
      expect(q.options.map((o) => o.id)).toEqual(['a', 'b', 'c']);
      expect(q.text.trim().length).toBeGreaterThan(10);
      q.options.forEach((opt) => {
        expect(opt.text.trim().length).toBeGreaterThan(2);
      });
    });
  });

  it('starts at Question 1 and ends at Question 30 sequentially', () => {
    QUESTIONS.forEach((q, idx) => {
      expect(q.id).toBe(idx + 1);
    });
  });
});
