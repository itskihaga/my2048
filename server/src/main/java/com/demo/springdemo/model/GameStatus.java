package com.demo.springdemo.model;

public class GameStatus {
	
	public Score getScore() {
		return score;
	}
	public BoardStatus getStatus() {
		return status;
	}
	public GameStatus(Score score, BoardStatus status) {
		this.score = score;
		this.status = status;
	}
	private Score score;
	private BoardStatus status;

}
