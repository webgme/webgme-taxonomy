import crypto from "crypto"

// /**
//  * Generator to create random project name for each iteration
//  */
// function* project_name_generator(prefix: string = "Project_"): Generator<string> {

//     // Global hyphen search
//     const HYPEN_RE: RegExp = /\-/gi;
//     const REPLACEMENT_TOKEN: string = "_";

//     let guid: string = crypto.randomUUID().toString()
//     guid = guid.replace(HYPEN_RE, REPLACEMENT_TOKEN);
//     const project_name: string = `${prefix}${guid}`;
//     return project_name;
// }

// const PROJECT_NAMER = project_name_generator();

export default class TestMethods {
    static * project_name_generator(prefix: string = "Project_"): Generator<string> {

        // Global hyphen search
        const HYPEN_RE: RegExp = /\-/gi;
        const REPLACEMENT_TOKEN: string = "_";

        let guid: string = crypto.randomUUID().toString()
        guid = guid.replace(HYPEN_RE, REPLACEMENT_TOKEN);
        const project_name: string = `${prefix}${guid}`;
        return project_name;
    }
}