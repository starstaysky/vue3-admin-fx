export function ResultSuccess<T>(result: T) {
  return {
    result,
    code: 0,
    success: true
  }
}
