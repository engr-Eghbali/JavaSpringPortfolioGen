package hello;

import lombok.Data;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.MediaType;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
public class HelloController {

    @Autowired
    BlogService serv;

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @RequestMapping(value = "/submitBlog", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody String submitBlog(@RequestBody String user) {

        BlogModel blog = new BlogModel();

        blog.setId(212);
        blog.setStyle(user);

        serv.createBlog(blog);
        return user;
    }

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
