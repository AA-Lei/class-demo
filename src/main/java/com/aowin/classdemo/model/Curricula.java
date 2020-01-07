package com.aowin.classdemo.model;

public class Curricula {
	private Integer studentId;
	private String studentName;
	private String className;
	private Double score;
	public Integer getStudentId() {
		return studentId;
	}
	public void setStudentId(Integer studentId) {
		this.studentId = studentId;
	}
	public String getStudentName() {
		return studentName;
	}
	public void setStudentName(String studentName) {
		this.studentName = studentName;
	}
	public String getClassName() {
		return className;
	}
	public void setClassName(String className) {
		this.className = className;
	}
	public Double getScore() {
		return score;
	}
	public void setScore(Double score) {
		this.score = score;
	}
	@Override
	public String toString() {
		return "Curricula [studentId=" + studentId + ", studentName=" + studentName + ", className=" + className
				+ ", score=" + score + "]";
	}
	
	

}
