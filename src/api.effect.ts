import { mapTo } from "rxjs/operators";
import { r } from "@marblejs/core";

export const api$ = r.pipe(
  r.matchPath("/"),
  r.matchType("GET"),
  r.useEffect(req$ => req$.pipe(
    mapTo({ body: "Hello, world!" }),
  )));
