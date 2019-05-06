package com.demo.springdemo.service.function.model;

import com.demo.springdemo.model.CellInfo;
import com.demo.springdemo.model.Score;

public class CellInfoWapper {
	
	protected CellInfo unwrap;
	private Score score;
	private boolean isMerged;
	
	public CellInfoWapper (CellInfo unwrap) {
		this.unwrap = unwrap;
		this.score = new Score(0L);
		this.isMerged = false;
	}
	
	protected CellInfoWapper (CellInfo unwrap,Score score) {
		this.unwrap = unwrap;
		this.score = score;
		this.isMerged = true;
	}
	
	public Score getScore() {
		return score;
	}
	public boolean isMerged() {
		return isMerged;
	}	
	public CellInfo getCellInfo() {
		return unwrap;
	}
	

}
