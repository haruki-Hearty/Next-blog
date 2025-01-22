/**
   * range関数 - startからendまでの数値の配列を返す
   * @param start
   * @param end
   * @returns
   * range(1, 5) // [1, 2, 3, 4, 5]
   */
export const range = (start: number, end: number) => {
  if (start > end) {
    return [];
  }
  return [...Array(end - start + 1)].map((_, i) => start + i);
};
