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
            hdk::ValidationPackageDefinition::Entry
        },

        validation: |_validation_data: hdk::EntryValidationData<Post>| {
            match _validation_data {
                EntryValidationData::Create{entry:_post,validation_data:_}=>{
                    if _post.content.is_empty() {
                        return Err(String::from("Empty Post"));
                    }
                    if _post.content.len() > 512{
                        return Err(String::from("Post too long"));
                    }
                }
                EntryValidationData::Modify{new_entry:_new_post, old_entry:_old_post, old_entry_header:_, validation_data:_} => {
                        if _new_post.content == _old_post.content {
                            return Err(String::from("Message unchanged"));
                        }
                }
                EntryValidationData::Delete{old_entry:_old_post,old_entry_header:_,validation_data:_} => (),
            };
            Ok(())
        },
        links:[
            from!(
                "%agent_id",
                tag: "has_post",

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