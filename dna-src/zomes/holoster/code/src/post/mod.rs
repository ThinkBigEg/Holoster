use hdk::{
    entry_definition::ValidatingEntryType,
};
use hdk::holochain_core_types::{
    cas::content::Address,
    error::HolochainError,
    json::JsonString,
    validation::{EntryValidationData},
};

pub mod handlers;

#[derive(Serialize, Deserialize, Debug, DefaultJson)]
pub struct Post {
    pub content: String,
    pub creator_hash: Address,
    pub timestamp: u32,
}

pub fn post_definition() -> ValidatingEntryType {
    entry!(
        name: "post",
        description: "The Member's post",
        sharing: Sharing::Public,
        //native_type: Post,
        validation_package: || {
            hdk::ValidationPackageDefinition::ChainFull
        },

        validation: |validation_data: hdk::EntryValidationData<Post>| {
            Ok(())
        },
        links:[
            from!(
                "%agent_id",
                tag: "has_post",

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