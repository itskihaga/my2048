package com.demo.springdemo.model;

public class MoveResult {
	
	private BoardStatus status;
	private Score score;
	
	public BoardStatus getStatus() {
		return status;
	}

	public Score getScore() {
		return score;
	}

	public MoveResult(BoardStatus status, Score score) {
		this.status = status;
		this.score = score;
	}

}
