import create from 'zustand'
import { devtools } from 'zustand/middleware'
import { defaultEditorSourceDevelopmentContent } from './fixtures'

export interface Selection {
  start: Position
  end: Position
  isBackwards: boolean
}

export interface Position {
  row: number
  column: number
}

export type AppState = {
  sourceString: string
  outputString: string
  selection?: Selection
  setSourceString: (txt: string) => void
  setOutputString: (txt: string) => void
  setSelection: (val: Selection) => void
}

export const useStore = create<AppState>()(devtools(set => ({
  sourceString: defaultEditorSourceDevelopmentContent,
  setSourceString: (txt: string) => set(_ => ({ sourceString: txt })),
  outputString: '',
  setOutputString: (txt: string) => set(_ => ({ outputString: txt })),
  selection: undefined,
  setSelection: (val: Selection) => set(_ => ({ selection: val })),
})))
