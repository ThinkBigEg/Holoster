use hdk::{
    api,
    AGENT_ADDRESS,
    error::ZomeApiResult,
};
use hdk::holochain_core_types::{
    cas::content::Address,
    entry::Entry,
};

use crate::comment::Comment;

pub fn handle_create_comment(content: String, timestamp: u32 , post_address: Address) -> ZomeApiResult<Address> {
    let comment_entry = Entry::App("comment".into(),
                                Comment{content ,
                                    creator_hash: AGENT_ADDRESS.to_string().into() ,
                                    timestamp ,
                                }.into());

    let comment_entry_address = hdk::commit_entry(&comment_entry)?;
    hdk::link_entries(&post_address,&comment_entry_address,"has_comment")?;
    Ok(comment_entry_address)
}

pub fn handle_update_comment(old_comment_address: Address , content: String, timestamp: u32) -> ZomeApiResult<Address>{
    let new_comment = Entry::App("comment".into(),
                              Comment{content ,
                                  creator_hash: AGENT_ADDRESS.to_string().into() ,
                                  timestamp ,
                              }.into());
    api::update_entry(new_comment , &old_comment_address)
}


pub fn handle_delete_comment(post_address: Address , comment_address: Address) -> ZomeApiResult<()>{
    hdk::remove_link(&post_address , &comment_address , "has_comment")?;
    api::remove_entry(&comment_address)
}

pub fn handle_get_comment_address(comment_entry: Comment) -> ZomeApiResult<Address> {
    let comment_entry = Entry::App("Comment".into() , comment_entry.into());
    let entry_address = hdk::entry_address(&comment_entry)?;
    Ok(entry_address)
}