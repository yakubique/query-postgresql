import fs from 'node:fs';
import os from 'node:os';
import path from "node:path";
import { nanoid } from 'nanoid';

const tempDir = fs.realpathSync(os.tmpdir())

const getPath = (prefix = '') => path.join(tempDir, prefix + nanoid());

export function temporaryDirectory({ prefix = '' } = {}) {
    const directory = getPath(prefix);
    fs.mkdirSync(directory);
    return directory;
}

export function temporaryFile({ name, extension }: { name?: string, extension?: string } = {}) {
    if (name) {
        return path.join(temporaryDirectory(), name);
    }

    return getPath() + (extension === undefined || extension === null ? '' : '.' + extension.replace(/^\./, ''));
}
