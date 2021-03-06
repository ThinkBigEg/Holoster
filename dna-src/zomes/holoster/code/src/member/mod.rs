use hdk::entry_definition::ValidatingEntryType;
use hdk::{
    holochain_core_types::{
        json::JsonString,
        error::HolochainError,
        cas::content::Address,
        dna::entry_types::Sharing
    }
};

pub mod handlers;

#[derive(Serialize, Deserialize, Debug, DefaultJson)]
pub struct Member {
    pub address: Address,
    pub profile: Profile
}

#[derive(Serialize, Deserialize, Debug, DefaultJson, Clone)]
pub struct Profile {
    pub name: String,
    pub avatar_url: String,
    pub agent_address: Address
}

pub fn profile_definition() -> ValidatingEntryType {
    entry!(
        name: "profile",
        description: "profile of particular user in the network",
        sharing: Sharing::Public,

        validation_package: || {
            hdk::ValidationPackageDefinition::ChainFull
        },
        validation: |_validation_data: hdk::EntryValidationData<Profile>|{
            Ok(())
        },

        links:[
            from!(
                "%agent_id",
                tag: "profile",

                validation_package: || {
                    hdk::ValidationPackageDefinition::ChainFull
                },

                validation: | _validation_data: hdk::LinkValidationData | {
                    Ok(())
                }
            ),
            from!(
                "%agent_id",
                tag: "is_following",

                validation_package: || {
                    hdk::ValidationPackageDefinition::Entry
                },

                validation: | _validation_data: hdk::LinkValidationData | {
                    Ok(())
                }
            ),
            from!(
                "%agent_id",
                tag: "is_followed_by",

                validation_package: || {
                    hdk::ValidationPackageDefinition::Entry
                },

                validation: | _validation_data: hdk::LinkValidationData | {
                    Ok(())
                }
            )
        ]
    )
}