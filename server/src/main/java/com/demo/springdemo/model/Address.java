package com.demo.springdemo.model;

public class Address {
	
	public final static Integer SIZE = 4;
	
	public Address(Integer x, Integer y) {
		this.x = x;
		this.y = y;
	}
	
	private Integer x;
	private Integer y;
	public Integer getX() {
		return x;
	}

	public Integer getY() {
		return y;
	}
	
	public Integer get(XY xy) {
		switch (xy) {
			case X:
				return getX();
			case Y:
				return getY();
			default:
				return null;
		}
	}
	
	public Address move(XY xy,Integer at) {
		switch (xy) {
			case X:
				return new Address(at,this.y);
			case Y:
				return new Address(this.x,at);
			default:
				return null;
		}
	}
	
	public static enum XY {
		X,Y;
		public XY reverse() {
			switch (this) {
			case X:
				return Y;
			case Y:
				return X;
			default:
				return null;
			}
		}
	}
	
	public boolean equals(Address other) {
		return other.x.equals((this.x)) && other.y.equals((this.y));
	}

}
