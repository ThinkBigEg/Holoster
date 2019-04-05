use hdk::{
    entry_definition::ValidatingEntryType,
};
use hdk::holochain_core_types::{
    cas::content::Address,
    error::HolochainError,
    json::JsonString,
    dna::entry_types::Sharing
};

pub mod handlers;

#[derive(Serialize, Deserialize, Debug, DefaultJson, Clone)]
pub struct Comment {
    pub content: String,
    pub creator_hash: Address,
    pub timestamp: u32,
}

pub fn comment_definition() -> ValidatingEntryType {
    entry!(
        name: "comment",
        description: "The Member's comment",
        sharing: Sharing::Public,
        //native_type: Comment,
        validation_package: || {
            hdk::ValidationPackageDefinition::Entry
        },

        validation: |_validation_data: hdk::EntryValidationData<Comment>|{
            Ok(())
        },
        links:[
            from!(
                "%agent_id",
                tag: "has_comment",

                validation_package: || {
                    hdk::ValidationPackageDefinition::ChainFull
                },

                validation: | _validation_data: hdk::LinkValidationData | {
                    Ok(())
                }
            )
        ]
    )
}