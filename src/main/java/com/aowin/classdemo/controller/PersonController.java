package com.aowin.classdemo.controller;

import javax.servlet.http.HttpSession;

import com.aowin.classdemo.model.Person;
import com.aowin.classdemo.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PersonController {
	
	@Autowired
	private PersonService personServiceImpl;
	
	@RequestMapping("/login")
	public Person login(@Validated Person person, BindingResult br, HttpSession session){
		if(br.hasErrors()){
			return null;
		}
		Person newperson = personServiceImpl.login(person);
		if(newperson!=null){
			session.setAttribute("user", newperson);
		}
		return newperson;
	}

}
