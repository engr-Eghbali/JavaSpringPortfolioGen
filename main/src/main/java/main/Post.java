package main;

import java.sql.Time;
import java.util.Random;

public class Post {

    private String Id;
    private String Content;
    private java.sql.Timestamp Date;

    public Post() {
        this.Date = new java.sql.Timestamp(System.currentTimeMillis());
        this.Id = Integer.toString(new Random().nextInt(456789));
    }

    public String getId() {
        return Id;

    }

    public String getContent() {
        return Content;
    }

    public void setContent(String md) {
        this.Content = md;
    }
}