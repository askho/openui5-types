
import * as ui5 from "../ui5api";
import Config from "../GeneratorConfig";
import TreeNode from "./base/TreeNode";
import EnumProperty from "./EnumProperty";

export default class Typedef extends TreeNode {

    private description: string;
    // private properties: EnumProperty[];

    constructor(config: Config, apiSymbol: ui5.SymbolTypedef, children: TreeNode[], indentationLevel: number) {
        super(config, indentationLevel, apiSymbol);

        if (children.length) {
            throw new Error("Enum cannot have children.");
        }

        this.description = apiSymbol.description || "";
        // this.properties = (apiSymbol.properties || []).map(p => new EnumProperty(this.config, p, this.fullName, indentationLevel + 1));
    }

    public generateTypeScriptCode(output: string[]): void {
        // let declareOrExport = this.isJQueryNamespace ? "declare " : "export "
        // let name = this.isJQueryNamespace ? this.getJQueryFullName() : this.name;

        // this.printTsDoc(output, this.description);
        // output.push(`${this.indentation}${declareOrExport}enum ${name} {\r\n`);
        // // this.properties.forEach(p => p.generateTypeScriptCode(output));
        // output.push(`${this.indentation}}\r\n`);
    }
}
