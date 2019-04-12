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
        validation_package: || {
            hdk::ValidationPackageDefinition::Entry
        },

        validation: |_validation_data: hdk::EntryValidationData<Comment>|{
            match _validation_data {
                EntryValidationData::Create{entry:_comment,validation_data:_}=>{
                    if _comment.content.is_empty() {
                        return Err(String::from("Empty comment"));
                    }
                    if _comment.content.len() > 512{
                        return Err(String::from("Comment too long"));
                    }
                }
                EntryValidationData::Modify{new_entry:_new_comment, old_entry:_old_comment, old_entry_header:_, validation_data:_} => {
                        if _new_comment.content == _old_comment.content {
                            return Err(String::from("Message unchanged"));
                        }
                }
                EntryValidationData::Delete{old_entry:_old_comment,old_entry_header:_,validation_data:_} => (),
            };
            Ok(())
        },
        links:[
            from!(
                "post",
                tag: "has_comment",

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