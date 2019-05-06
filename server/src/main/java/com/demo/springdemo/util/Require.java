package com.demo.springdemo.util;

import java.util.function.Supplier;

public class Require {
	public static <T> T nonNull(T obj,Supplier<? extends RuntimeException> nullThen) {
		if(obj == null) {
			throw nullThen.get();
		}
		return obj;
	}

}
