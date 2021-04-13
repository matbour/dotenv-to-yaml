import { parse } from 'dotenv';
import { dump } from 'js-yaml';

/**
 * Convert a dotenv string to a YAML string.
 * @param dotenv The dotenv raw string.
 */
export function dotenvToYAML(dotenv: string): string {
  return dump(parse(dotenv));
}

export default dotenvToYAML;