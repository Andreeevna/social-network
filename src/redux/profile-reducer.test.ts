import { PostType } from './../types/types';
import React from "react";
import profileReducer, {actions} from "./profile-reducer";

describe("test for reducer", () => {
  
  let state = {
    posts: [
      { id: 1, message: "Hi, how are you?", likesCount: 12 },
      { id: 2, message: "It is my first post", likesCount: 11 },
      { id: 3, message: "It is my first post", likesCount: 11 },
      { id: 4, message: "It is my first post", likesCount: 11 },
    ] as Array<PostType>,
    profile: null,
    status: "",
  };

  it ("message of new post should be 'newnew' ", () => {
      let action = actions.addPostActionCreator("newnew");


      let newState = profileReducer(state, action);

      expect(newState.posts.length).toBe(5);

    });

    it ("new posts should be incremented", () => {
      let action = actions.addPostActionCreator("newnew");

      let newState = profileReducer(state, action);

      expect(newState.posts[4].message).toBe("newnew");

    });

    it ("after deleting, the length of the array should decrease", () => {
      let action = actions.deletePost(1);

      let newState = profileReducer(state, action);

      expect(newState.posts.length).toBe(3);

    });
  
});
