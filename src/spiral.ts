export function createSpiral(n: number): number[][] {
    if (n < 1) return [];
  
    const result = Array.from({ length: n }, () => Array(n).fill(0));
    let num = 1, top = 0, bottom = n - 1, left = 0, right = n - 1;
  
    while (top <= bottom && left <= right) {
      for (let i = left; i <= right; i++) result[top][i] = num++;
      top++;
      for (let i = top; i <= bottom; i++) result[i][right] = num++;
      right--;
      for (let i = right; i >= left; i--) result[bottom][i] = num++;
      bottom--;
      for (let i = bottom; i >= top; i--) result[i][left] = num++;
      left++;
    }
  
    return result;
  }
  