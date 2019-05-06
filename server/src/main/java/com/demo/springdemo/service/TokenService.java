package com.demo.springdemo.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.demo.springdemo.model.BoardStatus;
import com.demo.springdemo.model.GameStatus;
import com.demo.springdemo.model.Score;
import com.demo.springdemo.util.F;
import com.demo.springdemo.util.My2048Exception;
import com.demo.springdemo.util.Require;

@Service
public class TokenService {
	
	private int cnt = 0;
	private Map<String, GameStatus> map = new HashMap<>();
	
	public String createToken(BoardStatus status) {
		
		String token = "token" + cnt;
		map.put(token, new GameStatus(new Score(0L),status));
		cnt++;
		
		return token;
	}
	
	public GameStatus getStatusByToken(String token) {
		return Require.nonNull(map.get(token), F.curryToSup(My2048Exception::new, "Invalid Access"));
	}
	
	public void saveStatus(String token,GameStatus status) {
		this.map.put(token, status);
	}

}
