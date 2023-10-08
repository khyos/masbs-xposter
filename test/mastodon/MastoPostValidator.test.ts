import { test, expect } from "@jest/globals";

import { MastoPostCapabilities } from '../../src/mastodon/MastoPostCapabilities';
import { MastoPostValidator } from '../../src/mastodon/MastoPostValidator';
import { Post } from "../../src/common/Post";
import { Media } from "../../src/common/Media";

test("Post Validation OK because has text", () => {
    const postCapabilities = new MastoPostCapabilities();
    const postValidator = new MastoPostValidator(postCapabilities);
    const post = new Post();
    post.text = 'coucou';
    const aErrors = postValidator.validate(post);
    expect(aErrors.length).toBe(0);
});

test("Post Validation OK because has media", () => {
    const postCapabilities = new MastoPostCapabilities();
    const postValidator = new MastoPostValidator(postCapabilities);
    const post = new Post();
    post.medias.push(new Media());
    const aErrors = postValidator.validate(post);
    expect(aErrors.length).toBe(0);
});

test("Post Validation KO because has no text or media", () => {
    const postCapabilities = new MastoPostCapabilities();
    const postValidator = new MastoPostValidator(postCapabilities);
    const post = new Post();
    const aErrors = postValidator.validate(post);
    expect(aErrors.length).toBe(1);
});