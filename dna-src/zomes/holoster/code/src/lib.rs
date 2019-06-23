#![feature(try_from)]
#[macro_use]
extern crate hdk;
extern crate serde;
#[macro_use]
extern crate serde_derive;
extern crate serde_json;
#[macro_use]
extern crate holochain_core_types_derive;
use hdk::{
    error::ZomeApiResult,
};

use hdk::holochain_core_types::{
    cas::content::Address,
    entry::Entry,
    json::{JsonString},
    error::HolochainError,
};

mod member;
mod post;
mod comment;
mod anchor;
mod utils;

define_zome! {

	entries: [
        member::profile_definition(),
        post::post_definition(),
        comment::comment_definition(),
        anchor::anchor_definition()
	]

    genesis: || {
        {
    		Ok(())
        }
    }

	functions: [
		register: {
            inputs: |name: String, avatar_url: String|,
            outputs: |result: ZomeApiResult<Address>|,
            handler: member::handlers::handle_register
        }
        get_member_profile: {
            inputs: |agent_address: Address|,
            outputs: |result: ZomeApiResult<Vec<member::Profile>>|,
            handler: member::handlers::handle_get_member_profile
        }
        create_post: {
            inputs: |content: String , timestamp: u32|,
            outputs: |result: ZomeApiResult<Address>|,
            handler: post::handlers::handle_create_post
        }
        get_post: {
            inputs: |post_address: Address|,
            outputs: |result: ZomeApiResult<Option<Entry>>|,
            handler: post::handlers::handle_get_post
        }
        get_user_posts: {
            inputs: |user_address: Address|,
            outputs: |result: ZomeApiResult<Vec<post::Post>>|,
            handler: post::handlers::handle_get_user_posts
        }
        update_post: {
            inputs: |old_post_address: Address , content: String, timestamp: u32|,
            outputs: |result: ZomeApiResult<Address>|,
            handler: post::handlers::handle_update_post
        }
        delete_post: {
            inputs: |post_address: Address|,
            outputs: |result: ZomeApiResult<()>|,
            handler: post::handlers::handle_delete_post
        }
        get_post_comments: {
            inputs: |post_address: Address|,
            outputs: |result: ZomeApiResult<Vec<comment::Comment>>|,
            handler: post::handlers::handle_get_post_comments
        }
        create_comment: {
            inputs: |content: String , timestamp: u32 , post_address: Address|,
            outputs: |result: ZomeApiResult<Address>|,
            handler: comment::handlers::handle_create_comment
        }
        update_comment: {
            inputs: |old_comment_address: Address , content: String, timestamp: u32|,
            outputs: |result: ZomeApiResult<Address>|,
            handler: comment::handlers::handle_update_comment
        }
        delete_comment: {
            inputs: |post_address: Address , comment_address: Address|,
            outputs: |result: ZomeApiResult<()>|,
            handler: comment::handlers::handle_delete_comment
        }
        follow_user: {
            inputs: |agent_address: Address|,
            outputs: |result: ZomeApiResult<bool>|,
            handler: member::handlers::handle_follow_user
        }
        unfollow_user: {
            inputs: |agent_address: Address|,
            outputs: |result: ZomeApiResult<()>|,
            handler: member::handlers::handle_unfollow_user
        }
        get_following: {
            inputs: |agent_address: Address|,
            outputs: |result: ZomeApiResult<Vec<member::Profile>>|,
            handler: member::handlers::handle_get_following
        }
        get_followed_by:{
            inputs: |agent_address: Address|,
            outputs: |result: ZomeApiResult<Vec<member::Profile>>|,
            handler: member::handlers::handle_get_followed_by
        }
        generate_news_feed: {
            inputs: | |,
            outputs: |result: ZomeApiResult<Vec<post::Post>>|,
            handler: post::handlers::handle_generate_news_feed
        }
        get_my_profile:{
            inputs: | |,
            outputs: |result: ZomeApiResult<Vec<member::Profile>>|,
            handler:  member::handlers::handle_get_my_profile
        }
        get_post_address:{
            inputs: |content: String,creator_hash:Address, timestamp: u32|,
            outputs: |result: ZomeApiResult<Address>|,
            handler:  post::handlers::handle_get_post_address
        }
        get_comment_address:{
            inputs: | content: String,creator_hash:Address, timestamp: u32|,
            outputs: |result: ZomeApiResult<Address>|,
            handler:  comment::handlers::handle_get_comment_address
        }
        get_comment:{
            inputs: | comment_address: Address|,
            outputs: |result: ZomeApiResult<Option<Entry>>|,
            handler:  comment::handlers::handle_get_comment
        }
	]

    traits: {
        hc_public [
            register,
            get_member_profile,
            get_my_profile,
            create_post,
            get_post,
            get_user_posts,
            update_post,
            delete_post,
            get_post_comments,
            create_comment,
            update_comment,
            delete_comment,
            follow_user,
            unfollow_user,
            get_following,
            get_followed_by,
            generate_news_feed,
            get_post_address,
            get_comment_address,
            get_comment
        ]
	}
 }


