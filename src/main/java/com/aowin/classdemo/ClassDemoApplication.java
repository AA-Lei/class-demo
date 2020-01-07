package com.aowin.classdemo;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.aowin.classdemo.dao")
public class ClassDemoApplication {
    public static void main(String[] args) {
        SpringApplication.run(ClassDemoApplication.class, args);
    }
}
