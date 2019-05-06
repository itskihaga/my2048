package com.demo.springdemo.model;

public class InitStatus {
	
	private String token;
	private BoardStatus status;
	public InitStatus(String token, BoardStatus status) {
		this.token = token;
		this.status = status;
	}
	public String getToken() {
		return token;
	}
	public BoardStatus getStatus() {
		return status;
	}


}
