use hdk::{
    entry_definition::ValidatingEntryType,
};
use hdk::holochain_core_types::{
    cas::content::Address,
    error::HolochainError,
    json::JsonString,
    dna::entry_types::Sharing,
    validation::{EntryValidationData}
};

pub mod handlers;

#[derive(Serialize, Deserialize, Debug, DefaultJson, Clone)]
pub struct Vote {
    pub creator_hash: Address,
}

pub fn vote_definition() -> ValidatingEntryType {
    entry!(
        name: "vote",
        description: "The Member's vote on a post or a comment",
        sharing: Sharing::Public,

        validation_package: || {
            hdk::ValidationPackageDefinition::Entry
        },

        validation: |_validation_data: hdk::EntryValidationData<Vote>| {
            Ok(())
        },
        links:[
            from!(
                "%agent_id",
                tag: "up_post",

                validation_package: || {
                    hdk::ValidationPackageDefinition::Entry
                },

                validation: |_validation_data: hdk::LinkValidationData | {
                    Ok(())
                }
            )
        ]
    )
}