package com.demo.springdemo.model;

public class CellInfo {
	
	public CellInfo(CellNumber value, Address address) {
		this.value = value;
		this.address = address;
	}

	private CellNumber value;
	private Address address;
	
	public CellNumber getValue() {
		return value;
	}
	public Address getAddress() {
		return address;
	}


}
