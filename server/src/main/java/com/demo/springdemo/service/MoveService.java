package com.demo.springdemo.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.demo.springdemo.model.BoardStatus;
import com.demo.springdemo.model.CellInfo;
import com.demo.springdemo.model.Direction;
import com.demo.springdemo.model.MoveResult;
import com.demo.springdemo.model.Score;
import com.demo.springdemo.service.function.Functions;
import com.demo.springdemo.service.function.model.CellInfoWapper;
import com.demo.springdemo.service.function.model.CellInfoWapperElementInLine;
import com.demo.springdemo.service.function.model.WrapperElementInLine;

@Service
public class MoveService {
	
	public MoveResult move(BoardStatus status,Direction direction) {
		
		Map<Integer, List<CellInfoWapperElementInLine>> linesMap = status.getStatus().stream()
				.map(e -> new CellInfoWapperElementInLine(e,direction))
				.collect(Collectors.groupingBy(e -> e.getGroup()));

		List<Score> scores = new ArrayList<>();
		List<CellInfo> cells = new ArrayList<>();
		
		linesMap.entrySet().stream()
			.forEach(e -> {
				List<? extends WrapperElementInLine<CellInfoWapper>> moved = Functions.moveLine(e.getValue());
				for(WrapperElementInLine<CellInfoWapper> wapper : moved) {
					scores.add(wapper.unwrap().getScore());
					cells.add(wapper.unwrap().getCellInfo());
				}
			});
		
		return new MoveResult(new BoardStatus(cells), scores.stream().reduce(new Score(0), (a,b)-> a.add(b)));
	}
	

}
