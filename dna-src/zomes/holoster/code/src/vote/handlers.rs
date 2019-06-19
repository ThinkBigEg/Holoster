use hdk::{
    api,
    AGENT_ADDRESS,
    utils,
    error::ZomeApiResult,
};
use hdk::holochain_core_types::{
    cas::content::Address,
    entry::Entry,
};

use crate::post::Post;
use crate::comment::Comment;
use crate::member::handlers::handle_get_following;

pub fn handle_upvote(content_address: Address) -> ZomeApiResult<Address> {
    let post_entry = Entry::App("post".into(),
                                Post{content ,
                                    creator_hash: AGENT_ADDRESS.to_string().into() ,
                                    timestamp ,
                                }.into());

    let post_entry_address = hdk::commit_entry(&post_entry)?;
    hdk::link_entries(&AGENT_ADDRESS,&post_entry_address,"has_post")?;
    Ok(post_entry_address)
}

pub fn handle_delete_post(post_address: Address) -> ZomeApiResult<()>{
    hdk::remove_link(&AGENT_ADDRESS , &post_address , "has_post")?;
    api::remove_entry(&post_address)
}
