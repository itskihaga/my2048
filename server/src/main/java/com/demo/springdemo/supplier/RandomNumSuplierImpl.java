package com.demo.springdemo.supplier;

import org.springframework.stereotype.Component;

@Component
public class RandomNumSuplierImpl implements RandomNumSuplier{

	@Override
	public int get(int range) {
		return (int) (Math.random() * range);
	}

}
