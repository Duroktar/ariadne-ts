import { createDiagnostic } from "../src"

createDiagnostic({
  filename: "simple.tao",
  message: "Incompatible types",
  type: "Error",
  labels: [
    {
      range: { start: 19, end: 24 },
      fstring: {
        template: "This is of type {}",
        args: [
          {
            text: 'Str',
            color: 'blue'
          }
        ]
      },
      color: "blue"
    },
    {
      range: { start: 27, end: 30 },
      fstring: {
        template: "This is of type {}",
        args: [
          {
            text: 'Int',
            color: 'yellow'
          },
        ]
      },
      color: "yellow"
    },
  ],
  note: {
    template: "Cannot add a {} with a {}",
    args: [
      {
        text: 'Str',
        color: 'blue'
      },
      {
        text: 'Int',
        color: 'yellow'
      },
    ]
  },
  source: {
    type: "file",
    path: "examples/simple.tao"
  }
})
