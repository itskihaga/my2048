package com.demo.springdemo.model;

public class Score {
	
	private long value;

	public long getValue() {
		return value;
	}

	public Score(long value) {
		this.value = value;
	}
	
	public  Score add(Score score) {
		return new Score(score.value + this.value);
	}

}
