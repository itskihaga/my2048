package com.demo.springdemo.model;

public class CellValue {

	private Long number;

	public CellValue(Long number) {
		this.number = number;
	}

	public Long getNumber() {
		return number;
	}

	public CellValue getDoubleNumber() {
		return new CellValue(this.number * 2);
	}

	public boolean mergeable(CellValue number) {
		return this.number.equals(number.getNumber());
	}


}
