package com.aowin.classdemo.service.Impl;

import com.aowin.classdemo.dao.PersonMapper;
import com.aowin.classdemo.model.Person;
import com.aowin.classdemo.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class PersonServiceImpl implements PersonService {

	@Autowired
	private PersonMapper personMapper;

	
	@Override
	public Person login(Person person) {
		System.out.println(person);
		Person newperson = personMapper.login(person);
		return newperson;
	}

}
