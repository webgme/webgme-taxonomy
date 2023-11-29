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
#[derive(TS, Deserialize, Serialize)]
#[ts(export)]
struct VariantId(String);

#[derive(TS, Deserialize, Serialize, PartialEq, Eq, Hash)]
#[ts(export)]
struct VocabularyName(String);
#[derive(TS, Deserialize, Serialize, PartialEq, Eq, Hash)]
#[ts(export)]
struct TermName(String);
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
    #[ts(optional)]
    description: Option<String>,
    #[ts(optional)]
    release_state: Option<ReleaseState>,
    terms: HashMap<TermName, Term>,
}

#[derive(TS, Deserialize, Serialize)]
#[ts(export)]
#[serde(rename_all = "camelCase")]
enum SelectionConstraint {
    Optional,
    Recommended,
    Required,
}

#[derive(TS, Deserialize, Serialize)]
#[ts(export)]
#[serde(rename_all = "lowercase")]
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
    #[ts(optional)]
    description: Option<String>,
    #[ts(optional)]
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
    Enum(EnumContent),
    Set(SetContent),
    Compound(CompoundContent),
    //TagSet(TagSetContent),
}

#[derive(TS, Deserialize, Serialize)]
#[ts(export)]
struct TextContent {
    #[ts(optional)]
    value: Option<String>,
}

#[derive(TS, Deserialize, Serialize)]
#[ts(export)]
struct IntegerContent {
    #[ts(optional)]
    value: Option<usize>,
}

#[derive(TS, Deserialize, Serialize)]
#[ts(export)]
struct FloatContent {
    #[ts(optional)]
    value: Option<f64>,
}

#[derive(TS, Deserialize, Serialize)]
#[ts(export)]
struct BooleanContent {
    #[ts(optional)]
    value: Option<bool>,
}

#[derive(TS, Deserialize, Serialize)]
#[ts(export)]
struct UriContent {
    #[ts(optional)]
    value: Option<String>,
}

#[derive(TS, Deserialize, Serialize)]
#[ts(export)]
struct EnumContent {
    #[ts(optional)]
    value: Option<VariantId>,
    variants: Vec<Variant>,
}

#[derive(TS, Deserialize, Serialize)]
#[ts(export)]
struct Variant {
    id: VariantId,
    name: String,
    fields: HashMap<FieldName, Field>,
}

#[derive(TS, Deserialize, Serialize)]
#[ts(export)]
struct SetContent {
    variants: Vec<Variant>,
}

#[derive(TS, Deserialize, Serialize)]
#[ts(export)]
struct CompoundContent {
    fields: HashMap<FieldName, Field>,
}

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
