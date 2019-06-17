use hdk::{
    AGENT_ADDRESS,
    utils::get_links_and_load_type,
    holochain_core_types::{
        entry::Entry,
        cas::content::Address,
        json::RawString
    },
    error::{
        ZomeApiResult,
    }
};

use crate::member::Profile;


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

fn get_user_profile_entry(agent_address: Address) -> ZomeApiResult<Address>{
    let user_profile= &(handle_get_member_profile(agent_address)?)[0];
    let profile_entry = Entry::App("profile".into() , user_profile.into());
    let entry_address = hdk::entry_address(&profile_entry)?;
    Ok(entry_address)
}

pub fn handle_follow_user(agent_address: Address) -> ZomeApiResult<bool> {
    let entry_address1 = get_user_profile_entry(agent_address.clone())?;
    let entry_address2 = get_user_profile_entry(AGENT_ADDRESS.to_string().into())?;

    hdk::link_entries(&AGENT_ADDRESS, &entry_address1, "is_following")?;
    hdk::link_entries(&agent_address, &entry_address2, "is_followed_by")?;
    Ok(true)
}

pub fn handle_get_following(agent_address: Address) -> ZomeApiResult<Vec<Profile>> {
    get_links_and_load_type(&agent_address, "is_following")
}

pub fn handle_get_followed_by(agent_address: Address) -> ZomeApiResult<Vec<Profile>> {
    get_links_and_load_type(&agent_address, "is_followed_by")
}

pub fn handle_unfollow_user(agent_address: Address) -> ZomeApiResult<()> {
    let entry_address = get_user_profile_entry(agent_address.clone())?;
    hdk::remove_link(&AGENT_ADDRESS , &entry_address , "is_following")
}

