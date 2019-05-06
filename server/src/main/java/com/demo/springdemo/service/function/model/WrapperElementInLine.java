package com.demo.springdemo.service.function.model;

import java.util.Comparator;

public abstract class WrapperElementInLine<T> {
	
	public abstract boolean isMergeable(T target);
	public abstract WrapperElementInLine<T> moveAt(int at);
	public abstract WrapperElementInLine<T> merge();
	public abstract Integer getPoint();
	public abstract T unwrap();
	
	public static final Comparator<WrapperElementInLine<?>> pointLess = Comparator.comparing(e -> e.getPoint());

}
