import fs from "fs";
import { SomeZodObject } from "zod";

export class Storage {
    protected filePath: string;
    protected schema: SomeZodObject;

    constructor(filePath: string, schema: SomeZodObject) {
        this.filePath = filePath
        this.schema = schema;
    };

    async init() {
        return await this.verifySchema();
    };

    async writeFile(body: JSON) {
        await fs.writeFileSync(this.filePath, JSON.stringify(body))
    };

    async readFile() {
        try {
            let data = await fs.readFileSync(this.filePath, "utf8");
            data = JSON.parse(data);

            return data;
        } catch (err) {
            let defaultSettings = await this.defaultSettings() as any;
            await this.writeFile(defaultSettings);
        }  
    };

    async verifySchema() {
        let data = await this.readFile();
        let { success: validated } = await this.schema.safeParse(data);

        if (!validated) {
            let defaultSettings = await this.defaultSettings() as any;
            await this.writeFile(defaultSettings);
        }
    };

    defaultSettings() {}
}