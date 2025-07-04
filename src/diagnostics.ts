
import { Display } from "./data/Display.js"
import { Range } from './data/Range.js'
import { mkStringWriter } from './data/Write.js'
import { ColorFn, Color, Fixed } from './lib/Color.js'
import { ColorGenerator } from "./lib/ColorGenerator.js"
import { Config } from "./lib/Config.js"
import { Label } from './lib/Label.js'
import { Report } from './lib/Report.js'
import { ReportKind } from './lib/ReportKind.js'
import { Source, sources } from './lib/Source.js'
import { include_str } from "./utils/include_str.js"
import { format } from "./write.js"

type ColorName = "red" | "green" | "yellow" | "blue"

type ColorArg = ColorName | number

type FstringArg = {
	text: string;
	color?: ColorArg;
}

type Fstring = {
	template: string;
	args: FstringArg[]
}

type LabelRange = {
	start: number;
	end: number;
}

type LabelDef = {
	range: LabelRange;
	fstring: string | Fstring;
	color?: ColorArg;
}

let colorGen = ColorGenerator.new();

const getColorFn = (color: ColorArg): ColorFn => {
	switch (color) {
	case "blue":
	case "green":
	case "red":
	case "yellow": {
		return Color.Named[color]
		break;
	}
	default:
		return Fixed(color)
		break;
	}
}

const mapFstringArg = (arg: FstringArg) => {
	const rv = new Display(arg.text);
	return (arg.color) ? rv.fg(getColorFn(arg.color)) : rv;
}

const makeFstring = (fstring: Fstring) => {
	return format(fstring.template, ...fstring.args.map(mapFstringArg))
}

type DiagnosticType = "Error" | "Advice" | "Custom" | "Warning"

const mkReportKind = (kind: DiagnosticType) => {
	switch (kind) {
	case 'Error':
		return ReportKind.Error
	case 'Advice':
		return ReportKind.Advice
	case 'Custom':
		return ReportKind.Custom
	case 'Warning':
		return ReportKind.Warning
	default:
		throw new Error(`Unknown DiagnosticType "${kind}"`)
	}
}

const isString = (s: unknown) => typeof s === 'string';
	const mkText = (s: string | Fstring) => isString(s) ? s : makeFstring(s);
	const mkRange = (range: LabelRange) => new Range(range.start, range.end);
	
export function createDiagnostic(options: {
	filename: string;
	message: string | Fstring;
	type: DiagnosticType;
	code?: number;
	offset?: number;
	labels: LabelDef[];
	note?: string | Fstring;
	tabWidth?: number;
	source: {
		type: 'file';
		path: string;
	} | {
		type: 'string';
		data: string;
	}
}) {

	const { filename, message, code, type, labels, offset, note, source, tabWidth } = options;

	let report = Report.build(mkReportKind(type), filename, offset ?? 0)
	    .with_code(code ?? -1)
	    .with_message(mkText(message))

	labels.forEach(label => {
		const { fstring, color, range } = label;

		const _label = Label
			.from([filename, mkRange(range)])
	        .with_message(mkText(fstring))

	    if (color) 
	    	report.add_label(_label.with_color(getColorFn(color)))
	    else
	    	report.add_label(_label)
	});

	if (note) report = report.with_note(mkText(note))

    let config = Config.default()

    if (tabWidth) config = config.with_tab_width(tabWidth)
    // .with_cross_gap(false)
    // .with_compact(true)
    // .with_underlines(false)
    // .with_multiline_arrows(false)
    // .with_tab_width(tabWidth))

    const targetSource = source.type === 'file'
		? include_str(source.path)
		: source.data

    report.with_config(config)
	    .finish()
	    .print([filename, Source.from(targetSource)])

}