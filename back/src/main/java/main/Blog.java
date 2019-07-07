package main;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Stream;

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

    public static String generate(User user) {

        Map<String, String> varMap = new HashMap();

        System.out.println(user.getName());
        varMap.put("{Name}", user.getName());
        varMap.put("{Title}", user.getBlog().getTitle());
        varMap.put("{Biography}", user.getBlog().getBio().getContent());
        varMap.put("{CVLink}", user.getBlog().getBio().getCVLink());
        varMap.put("{Linkedin}", user.getBlog().getContact().getLinkedin());
        varMap.put("{Email}", user.getBlog().getContact().getEmail());
        varMap.put("{Phone}", user.getBlog().getContact().getPhone());
        /** You can add custom user scripts and styles in here */
        varMap.put("{Style}", "");
        varMap.put("{Script}", "");

        try (Stream<Path> paths = Files.walk(Paths.get("./statics/Themes/Portfolio_1/partials/"))) {

            paths.forEach(path -> {

                try {
                    InputStream is = new FileInputStream(path.toString());
                    BufferedReader buf = new BufferedReader(new InputStreamReader(is));
                    String line = buf.readLine();
                    StringBuilder sb = new StringBuilder();
                    while (line != null) {
                        sb.append(line).append("\n");
                        line = buf.readLine();
                    }
                    String fileAsString = sb.toString();
                    System.out.println("Contents : " + fileAsString);
                } catch (Exception e) {
                    System.out.println(e);
                }

            });

            return paths.toString();
        } catch (Exception e) {

            return e.toString();
        }

    }
}