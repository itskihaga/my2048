package com.demo.springdemo.service.function.model;

import com.demo.springdemo.model.Score;

public abstract class CellInfoWapper<T> implements Comparable<CellInfoWapper<T>>{
	
	protected T unwrap;
	private Score score;
	private boolean isMerged;
	
	public CellInfoWapper (T unwrap) {
		this.unwrap = unwrap;
		this.score = new Score(0L);
		this.isMerged = false;
	}
	
	protected CellInfoWapper (T unwrap,Score score) {
		this.unwrap = unwrap;
		this.score = score;
		this.isMerged = true;
	}
	
	public abstract Integer getPoint();
	public abstract Long getNumber();
	public abstract CellInfoWapper<T> moveAt(int at);
	public abstract CellInfoWapper<T> merge();
	
	public Score getScore() {
		return score;
	}
	public boolean isMerged() {
		return isMerged;
	}
	
	public static <R> R unwrap(CellInfoWapper<R> t) {
		return t.unwrap;
	}
	
	@Override
	public int compareTo(CellInfoWapper<T> o) {
		return this.getPoint() - o.getPoint();
	}
	
	
	
	

}
