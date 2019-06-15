use hdk::entry_definition::ValidatingEntryType;

use hdk::holochain_core_types::{
    dna::entry_types::Sharing,
    cas::content::Address,
    json::RawString,
};


pub fn anchor_definition() -> ValidatingEntryType {
    entry!(
        name: "anchor",
        description: "An Anchor Type",
        sharing: Sharing::Public,

        validation_package: || {
            hdk::ValidationPackageDefinition::Entry
        },

        validation: |_validation_data: hdk::EntryValidationData<RawString>| {
            Ok(())
        },

        links: [
            to!(
                "%agent_id",
                tag: "member_tag",

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