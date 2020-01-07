package com.aowin.classdemo.model;

public class Person {
	private Integer personId;
	private String personName;
	private String sex;
	private Integer age;
	private String loginName;
	private String password;
	private Integer status;
	public Integer getPersonId() {
		return personId;
	}
	public void setPersonId(Integer personId) {
		this.personId = personId;
	}
	public String getPersonName() {
		return personName;
	}
	public void setPersonName(String personName) {
		this.personName = personName;
	}
	public String getSex() {
		return sex;
	}
	public void setSex(String sex) {
		this.sex = sex;
	}
	public Integer getAge() {
		return age;
	}
	public void setAge(Integer age) {
		this.age = age;
	}
	public String getLoginName() {
		return loginName;
	}
	public void setLoginName(String loginName) {
		this.loginName = loginName;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public Integer getStatus() {
		return status;
	}
	public void setStatus(Integer status) {
		this.status = status;
	}
	@Override
	public String toString() {
		return "Person [personId=" + personId + ", personName=" + personName + ", sex=" + sex + ", age=" + age
				+ ", loginName=" + loginName + ", password=" + password + ", status=" + status + "]";
	}
	
	
}
