package com.demo.springdemo.model;

public class CellNumber {
	
	private Long number;
	
	public CellNumber(Long number) {
		this.number = number;
	}
	
	public Long getNumber() {
		return number;
	}
	
	public CellNumber getDoubleNumber() {
		return new CellNumber(this.number * 2);
	}
	
	public boolean mergeable(CellNumber number) {
		return this.number.equals(number.getNumber());
	}
	

}
