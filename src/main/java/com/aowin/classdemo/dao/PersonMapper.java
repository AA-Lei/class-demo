package com.aowin.classdemo.dao;


import com.aowin.classdemo.model.Person;
import org.springframework.stereotype.Repository;

@Repository
public interface PersonMapper {
	
	public Person login(Person person);

}

