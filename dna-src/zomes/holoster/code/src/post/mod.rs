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
pub struct Post {
    pub content: String,
    pub creator_hash: String,
    pub timestamp: String,
}

pub fn post_definition() -> ValidatingEntryType {
    entry!(
        name: "Post",
        description: "The Member's post",
        sharing: Sharing::Public,
        native_type: Post,
        validation_package: || {
            hdk::ValidationPackageDefinition::Entry
        },

        validation: |_post: Post, _validation_data: hdk::ValidationData| {
        Ok(())
        /*let x = _post.content.len();
            match x < 513 {
                1 => println!("Post created !"),
                0 => println!("Content too long."),
            }*/
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