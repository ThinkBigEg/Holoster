use hdk::{
    AGENT_ADDRESS,
    utils::get_links_and_load_type,
    holochain_core_types::{
        entry::Entry,
        cas::content::Address
    },
    error::{
        ZomeApiResult,
    }
};

use crate::vote::Vote;


pub fn handle_vote(target_address: Address, _state: bool, target: String , _type:String) -> ZomeApiResult<()> {
    let vote_entry = Entry::App("vote".into(),
                                Vote{
                                    creator_hash: AGENT_ADDRESS.to_string().into(),
                                    target_hash: target_address.clone(),
                                }.into());

    let mut tag = _type;
    tag.push_str("vote_");
    tag.push_str(&target);

    if _state == true {
        let entry_address = hdk::commit_entry(&vote_entry)?;
        hdk::link_entries(&target_address, &entry_address, tag)
    }
    else{
        let entry_address = hdk::entry_address(&vote_entry)?;
        hdk::remove_link(&target_address , &entry_address , tag)
    }
}

pub fn handle_get_votes(target_address: Address, target: String, _type: String) -> ZomeApiResult<Vec<Vote>>{
    let mut tag = _type;
    tag.push_str("vote_");
    tag.push_str(&target);

    get_links_and_load_type(&target_address, tag)
}