package main;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DBmodule {

    @Autowired
    UserDAO dao;

    public void saveNewUser(User user) {
        dao.save(user);
    }

}
