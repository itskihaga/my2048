package com.demo.springdemo.model;

public class CellInfo {
	
	public CellInfo(CellValue value, Address address) {
		this.value = value;
		this.address = address;
	}

	private CellValue value;
	private Address address;
	
	public CellValue getValue() {
		return value;
	}
	public Address getAddress() {
		return address;
	}


}
