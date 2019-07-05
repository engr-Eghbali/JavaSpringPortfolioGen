package main;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.repository.Repository;
import org.springframework.stereotype.Service;

@Service
public class DBmodule {

    @Autowired
    UserDAO dao;

    public String saveNewUser(User user) {

        User userTmp = dao.findOneByUrl(user.url);

        if (userTmp != null) {

            return "this URL is taken";
        } else {

            if (dao.save(user) != null) {
                return "Blog created succesfuly";
            }
            return "Request failed,try again...";

        }

    }

}
