
export interface UI5API {
    library: string;
    symbols: UI5Symbol[];
    version: string;
}

export type UI5Symbol = SymbolNamespace|SymbolClass|SymbolEnum|SymbolInterface|SymbolTypedef;

export enum Kind {
    Namespace = "namespace",
    Class     = "class",
    Enum      = "enum",
    Interface = "interface",
    Typedef   = "typedef",
}

export enum Visibility {
    Public     = "public",
    Protected  = "protected",
    Restricted = "restricted",
}

export interface DeprecatedInfo {
    since?: string;
    text?: string;
}

export interface ExperimentalInfo {
    since?: string;
    text?: string;
}

export interface ExampleInfo {
    caption: string;
    text: string;
}

export interface ReturnValueInfo {
    type?: string;
    description?: string;
}

export interface SymbolNamespace {
    kind: Kind.Namespace;

    visibility: Visibility;

    name: string;
    basename: string;
    module: string;
    resource: string;
    description?: string;

    methods?: Method[];
    properties?: Property[];
    events?: Event[];

    extends?: string;
    export?: string;
    since?: string;
    static?: boolean; // all true
    final?: boolean; // all true
    deprecated?: DeprecatedInfo;
    experimental?: ExperimentalInfo;
}

export interface SymbolClass {
    kind: Kind.Class;

    visibility: Visibility;

    name: string;
    basename: string;
    module: string;
    resource: string;
    description?: string;

    events?: Event[];
    methods?: Method[];
    properties?: Property[];

    constructor: ClassConstructor;
    abstract?: boolean; // all true
    extends?: string;
    implements?: string[];
    export?: string;
    since?: string;
    static: boolean; // all true
    final?: boolean;
    deprecated?: DeprecatedInfo;
    experimental?: ExperimentalInfo;

    ["ui5-metadata"]?: any;
}

export interface SymbolEnum {
    kind: Kind.Enum;

    visibility: Visibility;

    name: string;
    basename: string;
    module: string;
    resource: string;
    description?: string;

    properties?: Property[];

    export?: string;
    since?: string;
    static: boolean; // all true
    deprecated?: DeprecatedInfo;
    experimental?: ExperimentalInfo;
}

export interface SymbolInterface {
    kind: Kind.Interface;

    visibility: Visibility;

    name: string;
    basename: string;
    module: string;
    resource: string;
    description?: string;

    events?: Event[];
    methods?: Method[];
    properties?: Property[];

    extends?: string;
    export?: string;
    since?: string;
    static: boolean; // all true
    deprecated?: DeprecatedInfo;
    experimental?: ExperimentalInfo;
}

export interface SymbolTypedef {
    kind: Kind.Typedef;

    name: string;
    basename: string;

    resource: string;
    module: string;
    export?: string;
    static?: boolean;
    visibility: Visibility;
    description: string;
}

export interface ClassConstructor {
    visibility: Visibility;

    description?: string;
    parameters?: Parameter[];
    examples?: ExampleInfo[];
}

export interface Method {
    visibility: Visibility;

    name: string;
    module?: string;
    resource?: string;
    description?: string;
    returnValue?: ReturnValueInfo;
    parameters?: Parameter[];

    export?: string;
    since?: string;
    static?: boolean; // all true
    deprecated?: DeprecatedInfo;
    experimental?: ExperimentalInfo;
    examples?: ExampleInfo[];
}

export interface Parameter {
    name: string;
    type: string;
    optional?: boolean;
    description?: string;
    defaultValue?: any;
    parameterProperties?: ParameterPropertyObject;
    spread?: boolean;
}

export interface ParameterPropertyObject {
    [name: string]: ParameterProperty;
}

export interface ParameterProperty {
    name: string;
    type: string;
    optional: boolean;
    description?: string;
    defaultValue?: any;
    parameterProperties?: ParameterPropertyObject;
}

export interface Property {
    visibility: Visibility;

    name: string;
    type: string;
    description?: string;
    module?: string;
    resource?: string;

    export?: string;
    since?: string;
    static?: boolean; // all true
    deprecated?: DeprecatedInfo;
    experimental?: ExperimentalInfo;
}

export interface Event {
    visibility: Visibility;

    name: string;
    description?: string;
    parameters?: Parameter[];

    since?: string;
    deprecated?: DeprecatedInfo;
    experimental?: ExperimentalInfo;
}
