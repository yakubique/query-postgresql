import * as core from '@actions/core';
import { readFileSync } from 'node:fs';
import { ActionInputs, getInputs } from './io-helper';
import { Client } from 'pg';
import { buildOutput, outputJson } from "@yakubique/atils/dist";

enum Outputs {
    result = 'result',
    count = 'count'
}

const setOutputs = buildOutput(Outputs);

(async function run() {
    let client;

    try {
        const inputs: ActionInputs = getInputs();
        let query = inputs.query;

        if (inputs.fromFile) {
            query = readFileSync(query, { encoding: 'utf8', flag: 'r' })
        }

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
            result: outputJson(res.rows, inputs.toFile),
            count: res.rowCount,
        })

        core.info('Success!');
    } catch (err: any) {
        core.setFailed(err.message);
    } finally {
        await client?.end()
    }
})();
