package main;

import org.bson.types.ObjectId;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
public class EngineController {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    DBmodule db;

    @RequestMapping(value = "/submitBlog", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody String submitBlog(@RequestBody String data) {

        try {

            JSONObject parsedData = new JSONObject(data);
            User newUser = new User(new ObjectId());
            Blog newBlog = new Blog();
            Bio newBio = new Bio();
            Contacts newContact = new Contacts();

            newUser.setName(parsedData.getString("Name"));
            newUser.setURL(parsedData.getString("URL"));

            newBio.setContent(parsedData.getJSONObject("Blog").getJSONObject("Bio").getString("Content"));
            newBio.setCVLink(parsedData.getJSONObject("Blog").getJSONObject("Bio").getString("CVLink"));

            newContact.setEmail(parsedData.getJSONObject("Blog").getJSONObject("Contact").getString("Email"));
            newContact.setLinkedin(parsedData.getJSONObject("Blog").getJSONObject("Contact").getString("Linkedin"));
            newContact.setPhone(parsedData.getJSONObject("Blog").getJSONObject("Contact").getString("Phone"));

            newBlog.setTitle(parsedData.getJSONObject("Blog").getString("Title"));
            newBlog.setBio(newBio);
            newBlog.setContact(newContact);
            newBlog.setStyle(parsedData.getJSONObject("Style").toString());

            newUser.setBlog(newBlog);

            String result = db.saveNewUser(newUser);
            return result;

        } catch (Exception e) {
            return "bad request: invalid data=>" + e;

        }

    }

    /*
     * @RequestMapping(value = "/{url}", method = RequestMethod.GET, produces =
     * MediaType.APPLICATION_JSON_VALUE, consumes =
     * MediaType.APPLICATION_JSON_VALUE) public @ResponseBody String
     * serveBlog(@PathVariable("url") String url) {
     * 
     * return ""; }
     */
    // @Data
    // static class Result {
    // private final int left;
    // private final int right;
    // private final long answer;
    // }

    // SQL sample
    // @RequestMapping("calc")
    // Result calc(@RequestParam int left, @RequestParam int right) {
    // MapSqlParameterSource source = new MapSqlParameterSource()
    // .addValue("left", left)
    // .addValue("right", right);
    // return jdbcTemplate.queryForObject("SELECT :left + :right AS answer", source,
    // (rs, rowNum) -> new Result(left, right, rs.getLong("answer")));
    // }
}
