use hdk::{
    AGENT_ADDRESS,
    utils::get_links_and_load_type,
    holochain_core_types::{
        entry::Entry,
        cas::content::Address,
        json::RawString,
    },
    error::{
        ZomeApiResult,
    }
};

use crate::member::{Profile};


pub fn handle_register(name: String , avatar_url: String) -> ZomeApiResult<Address> {
    let profile_entry = Entry::App("profile".into(),
                                   Profile{
                                       name,
                                       avatar_url,
                                       agent_address: AGENT_ADDRESS.to_string().into()
                                   }.into());

    let anchor_entry = Entry::App(
        "anchor".into(),
        RawString::from("member_directory").into(),
    );

    let anchor_address = hdk::commit_entry(&anchor_entry)?;
    hdk::link_entries(&anchor_address, &AGENT_ADDRESS, "member_tag")?;

    let profile_address = hdk::commit_entry(&profile_entry)?;
    hdk::link_entries(&AGENT_ADDRESS,&profile_address,"profile")?;
    Ok(AGENT_ADDRESS.to_string().into())
}

pub fn handle_get_member_profile(agent_address: Address) -> ZomeApiResult<Vec<Profile>> {
    get_links_and_load_type(&agent_address, "profile")
}

