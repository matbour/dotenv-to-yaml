import { readFileSync } from 'fs';

/**
 * Read process STDIN. Returns undefined if there was nothing piped.
 */
export function readStdin(): string | undefined {
  try {
    // Reference: https://stackoverflow.com/a/56012724
    return readFileSync(0, 'utf-8');
  } catch (e) {
    if (e?.code !== 'EAGAIN') { // If stdin is not passed by the user, EAGAIN code is raised
      throw e;
    }

    return undefined;
  }
}
