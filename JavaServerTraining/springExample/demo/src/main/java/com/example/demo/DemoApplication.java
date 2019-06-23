package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

}


@Controller
public class HelloWorldController{
	@RequestMapping(value="/",method=RequestMethod.GET)
	@ResponseBody
	public String helloWorld(){
		return "Hello!"
	}
}