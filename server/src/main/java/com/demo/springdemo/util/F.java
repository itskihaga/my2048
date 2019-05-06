package com.demo.springdemo.util;

import java.util.function.BiFunction;
import java.util.function.Function;
import java.util.function.Supplier;

public class F {
	public static <T, R> Supplier<R> curryToSup(Function<T,R> function,T arg) {
		return ()->function.apply(arg);
	}
	public static <T1,T2, R> Function<T2,R> curryToFunc(BiFunction<T1,T2,R> function,T1 arg1) {
		return arg2->function.apply(arg1,arg2);
	}
	public static <T1,T2, R> Function<T1,R> curryToFunc2(BiFunction<T1,T2,R> function,T2 arg2) {
		return arg1->function.apply(arg1,arg2);
	}
}
