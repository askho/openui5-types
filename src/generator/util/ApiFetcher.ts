
import * as request from 'request';
import * as fs from 'fs';
import * as fse from 'fs-extra';
import * as JSON5 from 'json5';
import * as Path from 'path';
import * as ui5 from '../ui5api';
import Config from '../GeneratorConfig';

const versionMarker = "{{VERSION}}";

export async function getApiJson(config: Config, namespace: string, version: string): Promise<ui5.API>
{
    if (config.local.runLocal) {
        let path = `${config.local.path}/${namespace}/${config.input.jsonLocation}`
            .replace(/\//g, Path.sep)
            .replace(versionMarker, version);

        if (!(fs.existsSync(path))) {

            console.log(`Making local file '${path}'`);

            let api = await getServerApiJson(config, namespace, version);

            fse.ensureFileSync(path);

            fse.writeJson(path, api, {
                spaces: config.output.indentation
            });
            
            return api;
        }
        
        console.log(`Reading local file '${path}'`);

        return new Promise((resolve: (api: ui5.API) => void, reject: (error: any) => void) => {
            fs.readFile(path, { encoding: "utf-8" }, (err, data) => {
                if (!err) {
                    console.log(`Got content from '${path}'`);
                    resolve(JSON5.parse(data))
                }
                else {
                    console.log(`Got error from '${path}'`);
                    reject(`${err}`);
                }
            });
        });
    }
    else {
        return getServerApiJson(config, namespace, version);
    }
}

export async function getServerApiJson(config: Config, namespace: string, version: string): Promise<ui5.API> {
    let url = `${config.input.apiBaseUrl}/${namespace}/${config.input.jsonLocation}`
        .replace(versionMarker, version);
    
    console.log(`Making request to '${url}'`);

    return new Promise((resolve: (api: ui5.API) => void, reject: (error: any) => void) => {
        request({ url: url, json: true }, (error, response, body) => {
            if (!error && response && response.statusCode === 200) {
                console.log(`Got response from '${url}'`);
                resolve(response.body);
            }
            else {
                console.log(`Got error from '${url}'`);
                reject(`${response.statusCode} - ${response.statusMessage}`);
            }
        });
    });
}
