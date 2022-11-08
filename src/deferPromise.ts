export default function deferPromise<T>() {
  let resolve: (value: (PromiseLike<T>)) => void;
  let reject: (reason?: any) => void;
  const promise = new Promise<T>((_resolve, _reject) => {
    resolve = _resolve;
    reject = _reject;
  });

  return {
    then: (f: ((value: T) => unknown)) => promise.then(f),
    callback: (err: any, ...data: any) => (err ? reject(err) : resolve(data)),
    promise,
  };
}
