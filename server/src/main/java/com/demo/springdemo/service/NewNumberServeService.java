package com.demo.springdemo.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import java.util.stream.Stream;

import org.springframework.stereotype.Service;

import com.demo.springdemo.model.Address;
import com.demo.springdemo.model.BoardStatus;
import com.demo.springdemo.model.CellInfo;
import com.demo.springdemo.model.CellNumber;

@Service
public class NewNumberServeService {
	
	public BoardStatus serveNewNumber(BoardStatus old) {
		
		int[] nums = IntStream.range(0, Address.SIZE).toArray();
		List<Address> addresses = new ArrayList<>();
		
		for(int x : nums) {
			for(int y : nums) {
				Address address = new Address(x,y);
				if(!old.getStatus().stream().anyMatch(e -> e.getAddress().equals(address))){
					addresses.add(address);
				}
			}
		}
		
		Address address = addresses.get(getRnd(addresses.size() - 1));
		
		return new BoardStatus(
				Stream.concat(
					old.getStatus().stream(), 
					Stream.of(new CellInfo(new CellNumber((long) ((getRnd(2) + 1) * 2)), address))
				)
				.collect(Collectors.toList())
			) ; 
		
	}
	
	private int getRnd(int range) {
		return (int)(Math.random() * range);
	}

}
