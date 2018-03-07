
export default interface Config {
    local: {
        runLocal: boolean,
        path:     string,
    }
    output: {
        exportsPath:        string,
        definitionsPath:    string,
        indentation:        string,
    },
    input: {
        apiBaseUrl:     string,
        jsonLocation:   string,
        versions:       string[],
        namespaces:     string[],
    },
    ignore: string[],
    replacements: {
        global:     { [type: string]: string },
        warnings:    string[],
        specific:   {
            namespaceAsType:                { [namespace:   string]: string },
            methodParameterType:            { [parameter:   string]: string },
            methodReturnType:               { [method:      string]: string },
            propertyType:                   { [property:    string]: string },
            methodOverridesNotCompatible:   string[],
        }
    }
}
