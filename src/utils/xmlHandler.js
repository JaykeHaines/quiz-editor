import { XMLParser, XMLBuilder } from 'fast-xml-parser';
export function parseXML(xml) {
    const parser = new XMLParser({ ignoreAttributes: false });
    return parser.parse(xml);
}
export function buildXML(json) {
    const builder = new XMLBuilder({ ignoreAttributes: false });
    return builder.build(json);
}
