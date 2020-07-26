import { Observable } from "rxjs";
import { delay } from "rxjs/operators";

const hello = Observable.create(function(observer) {
  observer.next({ email: "mail@streltsov.dev", password: "4815162342" });
});

export const findByCredentials = () => hello.pipe(delay(1000))
