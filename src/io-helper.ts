import * as core from '@actions/core';
import { InputOptions } from '@actions/core';

enum Inputs {
    Query = 'query',
    Host = 'host',
    Port = 'port',
    Database = 'db',
    Username = 'username',
    Password = 'password',
    ToFile = 'to_file',
    FromFile = 'from_file',
    SSL = 'ssl',
}

function isBlank(value: any): boolean {
    return value === null || value === undefined || (value.length !== undefined && value.length === 0);
}

export function isNotBlank(value: any): boolean {
    return value !== null && value !== undefined && (value.length === undefined || value.length > 0);
}

export function getBooleanInput(name: string, options?: InputOptions): boolean {
    const value = core.getInput(name, options);
    return isNotBlank(value) &&
        ['y', 'yes', 't', 'true', 'e', 'enable', 'enabled', 'on', 'ok', '1']
            .includes(value.trim().toLowerCase());
}

export interface ActionInputs {
    query: string;
    host: string;
    db: string;
    port: number;
    username: string;
    password: string;
    toFile: boolean;
    fromFile: boolean;
    ssl: boolean;
}

export function getInputs(): ActionInputs {
    const result: ActionInputs | any = {};

    result.query = `${core.getInput(Inputs.Query, { required: true })}`
    result.host = `${core.getInput(Inputs.Host, { required: true })}`
    result.db = `${core.getInput(Inputs.Database, { required: true })}`
    result.username = `${core.getInput(Inputs.Username, { required: true })}`
    result.password = `${core.getInput(Inputs.Password, { required: true })}`

    const port = `${core.getInput(Inputs.Port, { required: false })}`
    if (isBlank(port)) {
        result.port = 5432
    } else {
        result.prot = parseInt(port, 10)
    }

    result.toFile = getBooleanInput(Inputs.ToFile, { required: false })
    result.fromFile = getBooleanInput(Inputs.FromFile, { required: false })
    result.ssl = getBooleanInput(Inputs.SSL, { required: false })

    return result;
}
