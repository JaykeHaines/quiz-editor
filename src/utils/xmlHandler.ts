import { XMLParser, XMLBuilder } from 'fast-xml-parser';

export function parseXML(xml: string): any {
  const parser = new XMLParser({ ignoreAttributes: false });
  return parser.parse(xml);
}

export function buildXML(json: any): string {
  const builder = new XMLBuilder({ ignoreAttributes: false });
  return builder.build(json);
}

