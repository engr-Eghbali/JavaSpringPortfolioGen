package main;

import java.util.ArrayList;

import javax.jws.soap.SOAPBinding.Style;

import com.mongodb.util.JSON;

import org.json.JSONObject;

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

    public static Blog blogInit(JSONObject parsedData) {

        Blog newBlog = new Blog();
        Bio newBio = new Bio();
        Contacts newContact = new Contacts();

        newBio.setContent(parsedData.getJSONObject("Blog").getJSONObject("Bio").getString("Content"));
        newBio.setCVLink(parsedData.getJSONObject("Blog").getJSONObject("Bio").getString("CVLink"));

        newContact.setEmail(parsedData.getJSONObject("Blog").getJSONObject("Contact").getString("Email"));
        newContact.setLinkedin(parsedData.getJSONObject("Blog").getJSONObject("Contact").getString("Linkedin"));
        newContact.setPhone(parsedData.getJSONObject("Blog").getJSONObject("Contact").getString("Phone"));

        newBlog.setTitle(parsedData.getJSONObject("Blog").getString("Title"));
        newBlog.setBio(newBio);
        newBlog.setContact(newContact);
        newBlog.setStyle(parsedData.getJSONObject("Style").toString());

        return newBlog;
    }
}