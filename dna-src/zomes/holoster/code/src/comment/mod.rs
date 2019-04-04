use hdk::{
    entry_definition::ValidatingEntryType,
};
use hdk::holochain_core_types::{
    cas::content::Address,
    dna::entry_types::Sharing,
    error::HolochainError,
    json::JsonString,
};

pub mod handlers;

#[derive(Serialize, Deserialize, Debug, DefaultJson)]
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
        native_type: Comment,
        validation_package: || {
            hdk::ValidationPackageDefinition::Entry
        },

        validation: |_comment: Comment, _validation_data: hdk::ValidationData| {
            Ok(())
        },
        links:[
            from!(
                "%agent_id",
                tag: "has_comment",

                validation_package: || {
                    hdk::ValidationPackageDefinition::Entry
                },

                validation: |_base: Address, _target: Address, _ctx: hdk::ValidationData| {
                    Ok(())
                }
            )
        ]
    )
}