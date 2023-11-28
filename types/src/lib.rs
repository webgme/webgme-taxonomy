use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use ts_rs::TS;

#[derive(TS, Deserialize, Serialize)]
#[ts(export)]
struct VocabularyId(String);
#[derive(TS, Deserialize, Serialize)]
#[ts(export)]
struct TermId(String);
#[derive(TS, Deserialize, Serialize)]
#[ts(export)]
struct FieldId(String);

#[derive(TS, Deserialize, Serialize, PartialEq, Eq, Hash)]
#[ts(export)]
struct VocabularyName(String);
#[derive(TS, Deserialize, Serialize, PartialEq, Eq, Hash)]
#[ts(export)]
struct FieldName(String);
#[derive(TS, Deserialize, Serialize)]
#[ts(export)]
struct Version(String); // TODO: make this semver

#[derive(TS, Deserialize, Serialize)]
#[ts(export)]
struct Taxonomy {
    version: Version,
    vocabularies: HashMap<VocabularyName, VocabularyData>,
}

#[derive(TS, Deserialize, Serialize)]
#[ts(export)]
#[serde(rename_all = "camelCase")]
struct VocabularyData {
    id: VocabularyId,
    description: Option<String>,
    release_state: ReleaseState,
    terms: Vec<Term>,
}

#[derive(TS, Deserialize, Serialize)]
#[ts(export)]
enum SelectionConstraint {
    Optional,
    Recommended,
    Required,
}

#[derive(TS, Deserialize, Serialize)]
#[ts(export)]
enum ReleaseState {
    PreRelease,
    Released,
    Deprecated,
}

#[derive(TS, Deserialize, Serialize)]
#[ts(export)]
#[serde(rename_all = "camelCase")]
struct Term {
    id: TermId,
    selection: SelectionConstraint,
    description: Option<String>,
    release_state: Option<ReleaseState>,
    read_only: bool,
    fields: HashMap<FieldName, Field>,
}

#[derive(TS, Deserialize, Serialize)]
#[ts(export)]
struct Field {
    id: FieldId,
    description: String,
    required: bool,
    content: FieldContent,
}

#[derive(TS, Deserialize, Serialize)]
#[ts(export)]
enum FieldContent {
    Text(TextContent),
    Integer(IntegerContent),
    Float(FloatContent),
    Boolean(BooleanContent),
    Uri(UriContent),
    // Enum(EnumContent),
    // Set(SetContent),
    //Compound(FieldContent),
    //TagSet(TagSetContent),
}

#[derive(TS, Deserialize, Serialize)]
#[ts(export)]
struct TextContent {
    value: String,
}

#[derive(TS, Deserialize, Serialize)]
#[ts(export)]
struct IntegerContent {
    value: usize,
}

#[derive(TS, Deserialize, Serialize)]
#[ts(export)]
struct FloatContent {
    value: f64,
}

#[derive(TS, Deserialize, Serialize)]
#[ts(export)]
struct BooleanContent {
    value: bool,
}

#[derive(TS, Deserialize, Serialize)]
#[ts(export)]
struct UriContent {
    value: String,
}

// struct EnumContent {
//     variants: Vec<_>,
// }

// struct SetContent {
//     variants: Vec<_>,
// }

// struct TagSetContent {
//     value: String,
// }

// #[cfg(test)]
// mod tests {
//     use super::*;

//     #[test]
//     fn it_works() {
//         todo!();
//     }
// }
