import { Pool } from "pg";
import { from } from "rxjs";
import { map } from "rxjs/operators";

const pool = new Pool();

export const query = text => params =>
  from(pool.query(text, params)).pipe(map(res => res["rows"]))
