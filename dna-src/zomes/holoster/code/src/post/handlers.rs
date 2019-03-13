use hdk::{
    AGENT_ADDRESS,
    error::ZomeApiResult,
};
use hdk::holochain_core_types::{
    cas::content::Address,
    entry::Entry,
};

use crate::post::Post;

pub fn handle_create_post(content: String) -> ZomeApiResult<Address> {
    let post_entry = Entry::App("post".into(),
                                Post{content ,
                                    creator_hash: AGENT_ADDRESS.to_string().into() ,
                                }.into());

    let post_entry_address = hdk::commit_entry(&post_entry)?;
    hdk::link_entries(&AGENT_ADDRESS,&post_entry_address,"has_post")?;
    Ok(post_entry_address)
}

// get the post in jsonstring
pub fn handle_get_post(post_address: Address) -> ZomeApiResult<Option<Entry>> {
    hdk::get_entry(&post_address)
}

