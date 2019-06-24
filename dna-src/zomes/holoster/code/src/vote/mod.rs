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
pub struct Vote {
    pub target_hash: Address,
    pub creator_hash: Address
}

pub fn vote_definition() -> ValidatingEntryType {
    entry!(
        name: "vote",
        description: "The Member's vote on Post/Comment",
        sharing: Sharing::Public,

        validation_package: || {
            hdk::ValidationPackageDefinition::Entry
        },

        validation: |_validation_data: hdk::EntryValidationData<Vote>| {
            Ok(())
        },
        links:[
            from!(
                "post",
                tag: "upvote_post",

                validation_package: || {
                    hdk::ValidationPackageDefinition::Entry
                },

                validation: |_validation_data: hdk::LinkValidationData | {
                    Ok(())
                }
            ),
            from!(
                "post",
                tag: "downvote_post",

                validation_package: || {
                    hdk::ValidationPackageDefinition::Entry
                },

                validation: |_validation_data: hdk::LinkValidationData | {
                    Ok(())
                }
            ),
            from!(
                "comment",
                tag: "upvote_comment",

                validation_package: || {
                    hdk::ValidationPackageDefinition::Entry
                },

                validation: |_validation_data: hdk::LinkValidationData | {
                    Ok(())
                }
            ),
            from!(
                "comment",
                tag: "downvote_comment",

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