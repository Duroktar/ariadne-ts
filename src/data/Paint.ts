
export class Paint {
  constructor(private data: number) { }
  fg(color: number) {
    // TODO
  }
  bg(color: number) {
    // TODO
  }
  static new(data: number): Paint {
    return new Paint(data);
  }
}
