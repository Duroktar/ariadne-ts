import { readFileSync } from 'node:fs';
import { join } from 'node:path';


export function include_str(path: string): string {
  return readFileSync(join(process.cwd(), path)).toString();
}
