
// type OfKind<Name extends string> = { __kind: Name }
// type OfType<Type extends string, Props = {}> = { __type: Type } & Props
// type DataType<Kind extends string, Types extends OfType<any, any>> = OfKind<Kind> & Types
// type TypeOf<Type extends string, Kind extends string> = Partial<OfKind<Kind> & OfType<Type>>

// type ReportKindType = DataType<'ReportKind',
//   | OfType<'Error'>
//   | OfType<'Warning'>
//   | OfType<'Advice'>
//   | OfType<'Custom', { s: any; color: any }>
// >

// type DataTypeFactory<Kind extends string, DT extends object> = {
//   [K in keyof DT]: K extends string
//     ? DT[K] extends undefined
//       ? OfKind<Kind> & OfType<K, {}>
//       : OfKind<Kind> & OfType<K, DT[K]>
//     : never
// };

// type DataTypeFactoryFn<Kind extends string, DT extends any> = {
//   [K in keyof DT]: K extends string
//     ? DT[K] extends undefined
//       ? () => OfKind<Kind> & OfType<K, {}>
//       : (args: DT[K]) => OfKind<Kind> & OfType<K, DT[K]>
//     : never
// };

// type ValuesOf<DT extends object> = DT[keyof DT]

// type OfFn = <T = undefined>() => T

// type Factory = any

// function datatype<K extends string, F extends object, R = DataTypeFactoryFn<K, F>>(
//   kind: K,
//   fn: ({of}: { of: OfFn }) => F
// ): [DataTypeFactoryFn<K, F>, ValuesOf<DataTypeFactory<K, F>>, {[K in keyof R]: R[K]}]
// {
//   const dt = {
//     __kind: kind
//   };

//   const obj = {}
//   return [new Proxy(obj, ({
//     get(target, p, receiver) {
//       function fn(obj: any) {
//         const result = {
//           __kind: kind,
//           __type: p,
//           ...obj,
//         };
//         return result;
//       };
//       fn['__kind'] = kind
//       fn['__type'] = p
//       return fn
//     },
//   })) as any, dt as any, dt as any]
// }

// type InferType<K extends string, T> = OfKind<K> & T

// const [factory, t] = datatype(
//   'ReportKind',
//   ({ of }) => ({
//     Error: of(),
//     Warning: of(),
//     Advice: of(),
//     Custom: of<{s: string; color: string}>(),
//   }))

// type ReportKinds = typeof t
// type ReportKind = InferType<'ReportKind', typeof t>

// const [factory2, t2] = datatype('OtherReportKind', ({ of }) => ({
//   Error: of(),
//   Warning: of(),
//   Advice: of(),
//   Custom: of<{s: any; color: any}>(),
// }))

// type ReportKinds2 = typeof t2
// type ReportKind2 = InferType<'OtherReportKind', typeof t2>

// const advice: ReportKind = factory.Advice() as any
// const warning: ReportKind = factory.Warning()
// const error: ReportKind = factory.Error()
// const custom = factory.Custom({s: 'yay', color: 'yellow'})

// advice
// custom

// let test = (a: ReportKind) => a

// // @ts-expect-error
// const advice2: ReportKind2 = factory.Advice()

// function equal<Kind extends string>(a: TypeOf<any, Kind>, b: TypeOf<any, Kind>) {
//   return a?.__kind === b?.__kind && a?.__type === b?.__type
// }


// function match<T extends OfType<any>, R>(
//   a: T,
//   matchers: {[K in T['__type']]: (arg: Omit<Extract<T, {__type: K}>, '__type' | '__kind'>) => R},
// ): R {
//   for (let [name, fn] of Object.entries(matchers)) {
//     if (a['__type'] === name)
//       return (<any>fn)(a)
//   }
//   return null as any
// }

// const { Advice, Custom, Error: ErrorT, Warning } = factory

// type GetDual<T> = T extends (...args: any[]) => infer K ? K : T

// type Dualie<T> = {[K in keyof T]: [T[K], (arg: T[K]) => any]}[keyof T]
// type Dual<T, R = any> = [T, (arg: GetDual<T>) => R]

// const m = match(advice, {
//   Warning: (w) => 'Warning',
//   Advice: () => 'Advice',
//   Error: (e) => 'Error',
//   Custom: (c) => `Custom {s: ${c.s}, color: ${c.color}}`,
// })

// m
