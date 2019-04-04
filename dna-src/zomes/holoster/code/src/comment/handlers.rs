use hdk::{
    AGENT_ADDRESS,
    utils,
    error::ZomeApiResult,
};
use hdk::holochain_core_types::{
    cas::content::Address,
    entry::Entry,
};

use crate::comment::Comment;

pub fn handle_create_comment(content: String, timestamp: u32) -> ZomeApiResult<Address> {
    let comment_entry = Entry::App("comment".into(),
                                Comment{content ,
                                    creator_hash: AGENT_ADDRESS.to_string().into() ,
                                    timestamp ,
                                }.into());

    let comment_entry_address = hdk::commit_entry(&comment_entry)?;
    hdk::link_entries(&AGENT_ADDRESS,&comment_entry_address,"has_comment")?;
    Ok(comment_entry_address)
}

