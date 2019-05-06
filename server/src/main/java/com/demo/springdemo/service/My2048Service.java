package com.demo.springdemo.service;

import java.util.Collections;

import org.springframework.stereotype.Service;

import com.demo.springdemo.model.BoardStatus;
import com.demo.springdemo.model.Direction;
import com.demo.springdemo.model.GameStatus;
import com.demo.springdemo.model.MoveResult;

@Service
public class My2048Service { 
	
	private MoveService moveService;
	private NewNumberServeService newNumberServeService;
	
	public My2048Service(MoveService moveService,NewNumberServeService newNumberServeService) {
		this.moveService = moveService;
		this.newNumberServeService = newNumberServeService;
	}

	public BoardStatus initBoard() {
		BoardStatus empty = new BoardStatus(Collections.emptyList());
		BoardStatus served1 = newNumberServeService.serveNewNumber(empty);
		return newNumberServeService.serveNewNumber(served1); 
	}
	
	public GameStatus move(GameStatus status,Direction direction) {
		MoveResult result = moveService.move(status.getStatus(), direction);
		return new GameStatus(
				result.getScore().add(status.getScore()), 
				newNumberServeService.serveNewNumber(result.getStatus())
		);
	}

}
