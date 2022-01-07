
export function toPromise<T>(api) {
  return function (...args): Promise<T> {
    return new Promise<T>((resolve) => api(...args, resolve))
  }
}

export function callbackToPromise<T>(method, ...args) {
  return new Promise<T>((resolve) => method(...args, resolve))
}
