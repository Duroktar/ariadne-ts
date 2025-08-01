import { format } from "../write.js";
import { ok, Result } from "./Result.js";

export interface Write {
  write_str(s: string): Result<null, Error>;
  write_char(c: string): Result<null, Error>
  write_fmt(...args: any[]): Result<null, Error>
}

class StdoutWriter implements Write {
  write_str(s: string): Result<null, Error> {
    throw new Error("Function not implemented")
  }
  write_char(c: string): Result<null, Error> {
    throw new Error("Function not implemented")
  }
  write_fmt(...args: any[]): Result<null, Error> {
    process.stdout.write(format(...args))
    return ok(null)
  }
}

class StderrWriter implements Write {
  write_str(s: string): Result<null, Error> {
    throw new Error("Function not implemented")
  }
  write_char(c: string): Result<null, Error> {
    throw new Error("Function not implemented")
  }
  write_fmt(...args: any[]): Result<null, Error> {
    process.stderr.write(format(...args))
    return ok(null)
  }
}

class StringWriter implements Write {
  public value: string[] = []
  write_str(s: string): Result<null, Error> {
    this.value.push(s)
    return ok(null)
  }
  write_char(c: string): Result<null, Error> {
    this.value.push(c)
    return ok(null)
  }
  write_fmt(...args: any[]): Result<null, Error> {
    this.value.push(format(...args))
    return ok(null)
  }
  map(fn: (value: string) => any) {
    return fn(this.unwrap())
  }
  unwrap() { return this.value.join('') }
}

export const stdoutWriter = new StdoutWriter()
export const stderrWriter = new StderrWriter()
export const mkStringWriter = () => new StringWriter()
