import { describe, it, expect } from 'vitest';
import { calculateScore, getProfile, getUnansweredQuestionIds } from './scoring';
import { QUESTIONS } from '../data/questions';

describe('Book PDF Scoring Table Logic', () => {
  it('calculates score correctly for males (A=10, B=5, C=-5)', () => {
    // 10 A's (10*10 = 100), 10 B's (10*5 = 50), 10 C's (10*-5 = -50) => 100
    const answers: Record<number, string> = {};
    for (let i = 1; i <= 10; i++) answers[i] = 'a';
    for (let i = 11; i <= 20; i++) answers[i] = 'b';
    for (let i = 21; i <= 30; i++) answers[i] = 'c';

    const result = calculateScore(answers, 'male', QUESTIONS);
    expect(result.countA).toBe(10);
    expect(result.countB).toBe(10);
    expect(result.countC).toBe(10);
    expect(result.pointsA).toBe(100);
    expect(result.pointsB).toBe(50);
    expect(result.pointsC).toBe(-50);
    expect(result.totalScore).toBe(100);
    expect(getProfile(result.totalScore).id).toBe('masculine');
  });

  it('calculates score correctly for females (A=15, B=5, C=-5)', () => {
    // 10 A's (10*15 = 150), 10 B's (10*5 = 50), 10 C's (10*-5 = -50) => 150
    const answers: Record<number, string> = {};
    for (let i = 1; i <= 10; i++) answers[i] = 'a';
    for (let i = 11; i <= 20; i++) answers[i] = 'b';
    for (let i = 21; i <= 30; i++) answers[i] = 'c';

    const result = calculateScore(answers, 'female', QUESTIONS);
    expect(result.pointsA).toBe(150);
    expect(result.pointsB).toBe(50);
    expect(result.pointsC).toBe(-50);
    expect(result.totalScore).toBe(150);
    expect(getProfile(result.totalScore).id).toBe('balanced_crossover');
  });

  it('awards 5 points for blank / unanswered questions as stated in book', () => {
    // 20 A's for female (20*15 = 300), 10 blank (10*5 = 50) => 350
    const answers: Record<number, string> = {};
    for (let i = 1; i <= 20; i++) answers[i] = 'a';

    const result = calculateScore(answers, 'female', QUESTIONS);
    expect(result.unansweredPoints).toBe(50);
    expect(result.totalScore).toBe(350);
    expect(getProfile(result.totalScore).id).toBe('strongly_feminine');
  });

  it('identifies unanswered question IDs accurately', () => {
    const answers: Record<number, string> = { 1: 'a', 2: 'b' };
    const unanswered = getUnansweredQuestionIds(answers, QUESTIONS);
    expect(unanswered.length).toBe(28);
    expect(unanswered).not.toContain(1);
    expect(unanswered).not.toContain(2);
    expect(unanswered).toContain(3);
  });

  it('correctly maps scores to all 5 book profile classifications', () => {
    expect(getProfile(-20).id).toBe('strongly_masculine');
    expect(getProfile(0).id).toBe('masculine');
    expect(getProfile(100).id).toBe('masculine');
    expect(getProfile(149).id).toBe('masculine');
    expect(getProfile(150).id).toBe('balanced_crossover');
    expect(getProfile(180).id).toBe('balanced_crossover');
    expect(getProfile(181).id).toBe('feminine');
    expect(getProfile(250).id).toBe('feminine');
    expect(getProfile(300).id).toBe('feminine');
    expect(getProfile(301).id).toBe('strongly_feminine');
    expect(getProfile(400).id).toBe('strongly_feminine');
  });
});
