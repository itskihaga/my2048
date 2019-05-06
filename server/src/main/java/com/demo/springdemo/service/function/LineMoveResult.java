package com.demo.springdemo.service.function;

import java.util.List;

import com.demo.springdemo.service.function.model.CellInfoWapper;

class LineMoveResult<T> {
	
	private List<CellInfoWapper<T>> cells;
	private Long score;
	public List<CellInfoWapper<T>> getCells() {
		return cells;
	}
	public Long getScore() {
		return score;
	}
	public LineMoveResult(List<CellInfoWapper<T>> cells, Long score) {
		this.cells = cells;
		this.score = score;
	}

}
