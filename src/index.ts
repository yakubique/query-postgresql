import * as core from '@actions/core';
import { ActionInputs, getInputs } from './io-helper';
import { Client } from 'pg';

enum Outputs {
    result = 'result',
    count = 'count'
}

function setOutputs(response: any, log?: boolean) {
    let message = '';
    for (const key in Outputs) {
        const field: string = (Outputs as any)[key];
        if (log) {
            message += `\n  ${field}: ${JSON.stringify(response[field])}`;
        }
        core.setOutput(field, response[field]);
    }

    if (log) {
        core.info('Outputs:' + message);
    }
}

(async function run() {
    let client;

    try {
        const inputs: ActionInputs = getInputs();
        const query = inputs.query;

        client = new Client({
            user: inputs.username,
            password: inputs.password,
            host: inputs.host,
            database: inputs.db,
            port: inputs.port,
            ssl: inputs.ssl,
        })
        await client.connect()

        const res = await client.query(query)

        setOutputs({
            result: res.rows,
            count: res.rowCount,
        })

        core.info('Success!');
    } catch (err: any) {
        core.setFailed(err.message);
    } finally {
        await client?.end()
    }
})();
