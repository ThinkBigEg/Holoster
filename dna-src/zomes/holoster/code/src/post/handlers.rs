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

pub fn handle_get_post(post_address: Address) -> ZomeApiResult<Option<Entry>> {
    hdk::get_entry(&post_address)
}

pub fn handle_get_user_posts(user_address: Address) -> ZomeApiResult<Vec<Post>> {
    utils::get_links_and_load_type(&user_address, "has_post")
}

pub fn handle_get_post_comments(post_address: Address) -> ZomeApiResult<Vec<Comment>> {
    utils::get_links_and_load_type(&post_address, "has_comment")
}

pub fn handle_update_post(old_post_address: Address , content: String, timestamp: u32) -> ZomeApiResult<Address>{
    let new_post = Entry::App("post".into(),
                              Post{content ,
                                  creator_hash: AGENT_ADDRESS.to_string().into() ,
                                  timestamp ,
                              }.into());
    api::update_entry(new_post , &old_post_address)
}

pub fn handle_delete_post(post_address: Address) -> ZomeApiResult<()>{
    hdk::remove_link(&AGENT_ADDRESS , &post_address , "has_post")?;
    api::remove_entry(&post_address)
}

pub fn handle_generate_news_feed() -> ZomeApiResult<Vec<Post>>{
    let following = handle_get_following(AGENT_ADDRESS.to_string().into())?;
    let mut newsfeed:Vec<Post> = Vec::new();;

    let mut my_posts = handle_get_user_posts(AGENT_ADDRESS.to_string().into())?;
    newsfeed.append(&mut my_posts);

    for user in &following {
        let mut user_posts = handle_get_user_posts(user.agent_address.to_string().into())?;
        newsfeed.append(&mut user_posts);
    }
    newsfeed.sort_by(|a, b| b.timestamp.cmp(&a.timestamp));
    Ok(newsfeed)
}

pub fn handle_get_post_address(content: String, creator_hash:Address, timestamp: u32) -> ZomeApiResult<Address> {
    let post_entry = Entry::App("post".into(),
                                Post{content,
                                     creator_hash,
                                    timestamp ,
                                }.into());
    let entry_address = hdk::entry_address(&post_entry)?;
    Ok(entry_address)
}
