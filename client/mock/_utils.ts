export function ResultSuccess<T>(result) {
    return {
        result,
        code: 0,
        success: true
    }
}