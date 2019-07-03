package main;

import java.util.ArrayList;

import javax.jws.soap.SOAPBinding.Style;

import com.mongodb.util.JSON;

public class Blog {

    private String Title;
    private Bio Bio;
    private Contacts Contact;
    private String Style;
    /* Note: I will change it to collection(ArrayList) Later */
    private Post[] Posts = new Post[100];

    public Blog() {

    }

    public String getTitle() {
        return Title;
    }

    public void setTitle(String title) {
        this.Title = title;
    }

    public Bio getBio() {
        return Bio;
    }

    public void setBio(Bio bio) {
        this.Bio = bio;
    }

    public Contacts getContact() {
        return Contact;
    }

    public void setContact(Contacts contact) {
        this.Contact = contact;
    }

    public String getStyle() {
        return Style;
    }

    public void setStyle(String style) {
        this.Style = style;
    }

    /* Note: I will change it to collection(ArrayList) Later */
    public Post[] getPosts() {
        return Posts;
    }

    public void addPost(Post post) {

        /* Note: I will change it to collection(ArrayList) Later */
        for (int i = 0; i < this.Posts.length; i++) {
            if (this.Posts[i] == null) {
                this.Posts[i] = post;
                return;
            }

        }
        /* this.Posts.add(post); */

    }

    public boolean rmPost(String Id) {

        for (int i = 0; i < Posts.length; i++) {
            if (this.Posts[i] != null) {
                String postId = this.Posts[i].getId();
                if (postId == Id) {
                    this.Posts[i] = null;
                    return true;
                }
            }
        }
        return false;
    }

}