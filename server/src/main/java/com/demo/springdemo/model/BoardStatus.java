package com.demo.springdemo.model;

import java.util.List;

public class BoardStatus {
	
	private List<CellInfo> status;

	public List<CellInfo> getStatus() {
		return status;
	}


	public BoardStatus(List<CellInfo> status) {
		this.status = status;
	}


}
