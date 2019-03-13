use hdk::entry_definition::ValidatingEntryType;
use hdk::{
    holochain_core_types::{
        json::JsonString,
        error::HolochainError,
        dna::entry_types::Sharing,
        cas::content::Address,
    }
};

pub mod handlers;

#[derive(Serialize, Deserialize, Debug, DefaultJson)]
pub struct Member {
    pub address: Address,
    pub profile: Profile
}

#[derive(Serialize, Deserialize, Debug, DefaultJson)]
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
        native_type: Profile,
        validation_package: || {
            hdk::ValidationPackageDefinition::Entry
        },

        validation: |_profile: Profile, _ctx: hdk::ValidationData| {
            Ok(())
        },

        links:[
            from!(
                "%agent_id",
                tag: "profile",

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