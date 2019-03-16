use hdk::{
    AGENT_ADDRESS,
    utils,
    error::ZomeApiResult,
};
use hdk::holochain_core_types::{
    cas::content::Address,
    entry::Entry,
};

use crate::post::Post;

pub fn handle_create_post(content: String, timestamp: u32) -> ZomeApiResult<Address> {
    let post_entry = Entry::App("post".into(),
                                Post{content ,
                                    creator_hash: AGENT_ADDRESS.to_string().into() ,
                                    timestamp ,
                                }.into());

    let post_entry_address = hdk::commit_entry(&post_entry)?;
    hdk::link_entries(&AGENT_ADDRESS,&post_entry_address,"has_post")?;
    Ok(post_entry_address)
}

// get the post in JSONstring
pub fn handle_get_post(post_address: Address) -> ZomeApiResult<Option<Entry>> {
    hdk::get_entry(&post_address)
}

pub fn handle_get_user_posts(user_address: Address) -> ZomeApiResult<Vec<Post>> {
    utils::get_links_and_load_type(&user_address, "has_post")
}
