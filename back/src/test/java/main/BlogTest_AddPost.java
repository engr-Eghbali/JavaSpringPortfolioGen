package main;

import static org.junit.Assert.assertArrayEquals;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import org.junit.Before;
import org.junit.Test;

public class BlogTest_AddPost {

    public static User user = new User("U5serId");
    public static Blog blog = new Blog();
    public static Contacts contact = new Contacts();
    public static Post post = new Post();
    public static Bio bio = new Bio();

    @Before
    public void setNewRecord() {

        bio.setCVLink("http://url.com");
        bio.setContent("here is user's biography");
        contact.setEmail("email@protonmail.com");
        contact.setLinkedin("http://linkedin.com");
        contact.setPhone(123456);

        blog.setTitle("blogTitle");
        blog.setBio(bio);
        blog.setContact(contact);
        blog.setStyle("{body:100% 100%}");

        post.setContent("__some markdown content__");

        /*
         * if (post.getId() == "P05tID") { blog.addPost(post); }
         */
        user.setName("user Name");
        user.setURL("/url");
        user.setBlog(blog);

    }

    @Test
    public void testAddPost() {

        blog.addPost(this.post);
        assertEquals(user.getBlog(), blog);
    }

    @Test
    public void testRemovePost() {
        blog.addPost(this.post);
        assertFalse(blog.rmPost("PostID"));
    }

}