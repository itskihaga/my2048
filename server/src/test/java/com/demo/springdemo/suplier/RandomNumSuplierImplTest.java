package com.demo.springdemo.suplier;

import org.junit.Test;

import com.demo.springdemo.supplier.RandomNumSuplierImpl;

public class RandomNumSuplierImplTest {
	
	@Test
	public void test1() {
		RandomNumSuplierImpl rnd = new RandomNumSuplierImpl();
		System.out.println(rnd.get(10));
		System.out.println(rnd.get(100));
		System.out.println(rnd.get(10));
		System.out.println(rnd.get(10));
	}

}
