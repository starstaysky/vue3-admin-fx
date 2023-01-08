export interface ReturnType<T> {
    success: boolean;
    code: number,
    data: T
}