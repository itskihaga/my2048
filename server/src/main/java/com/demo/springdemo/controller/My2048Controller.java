package com.demo.springdemo.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.demo.springdemo.model.BoardStatus;
import com.demo.springdemo.model.GameStatus;
import com.demo.springdemo.model.InitStatus;
import com.demo.springdemo.model.MoveRequest;
import com.demo.springdemo.service.My2048Service;
import com.demo.springdemo.service.TokenService;

@CrossOrigin
@RestController
public class My2048Controller {
	
	private TokenService tokenService;
	private My2048Service my2048Service;
	
	public My2048Controller(TokenService tokenService,My2048Service my2048Service) {
		this.tokenService = tokenService;
		this.my2048Service = my2048Service;
	}

	@PostMapping("start")
	public InitStatus start() {
		BoardStatus bs = my2048Service.initBoard();
		String token = tokenService.createToken(bs);
		return new InitStatus(token,bs);
	}
	
	@PostMapping("move")
	public GameStatus move(@RequestBody MoveRequest request) {
		GameStatus current =  tokenService.getStatusByToken(request.getToken());
		GameStatus status = my2048Service.move(current, request.getDirection());
		tokenService.saveStatus(request.getToken(), status);
		return status;
	}

}
