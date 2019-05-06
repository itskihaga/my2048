package com.demo.springdemo.service.function;

import java.util.Iterator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.demo.springdemo.service.function.model.WrapperElementInLine;

public class Functions {
	
	public static <U> List<? extends WrapperElementInLine<U>> moveLine(List<? extends WrapperElementInLine<U>> line){
		return recurStep(line.stream().sorted(WrapperElementInLine.pointLess).iterator(),line);
	}
	
	static <U> List<WrapperElementInLine<U>> step(List<? extends WrapperElementInLine<U>> list,WrapperElementInLine<U> target){
		Optional<? extends WrapperElementInLine<U>> shoutotu = list.stream()
				.filter(e -> e.getPoint() < target.getPoint())
				.max(WrapperElementInLine.pointLess);
				
		boolean gattai = shoutotu.isPresent() && target.isMergeable(shoutotu.get().unwrap());

		if(gattai) {
			return list.stream()
				.filter(e -> !isSame(target,e))
				.map(e -> isSame(shoutotu.get(),e) ? e.merge() : e)
				.collect(Collectors.toList());
		} else {
			int moveTo = shoutotu.isPresent() ? shoutotu.get().getPoint() + 1 : 0;
			return list.stream()
					.map(e -> isSame(target,e) ? e.moveAt(moveTo) : e)
					.collect(Collectors.toList());
		}
	}

	private static <U> List<? extends WrapperElementInLine<U>> recurStep(Iterator<? extends WrapperElementInLine<U>> iterator,List<? extends WrapperElementInLine<U>> list) {
		return iterator.hasNext() ? recurStep(iterator,step(list,iterator.next())) : list;
	}
	
	private static <T extends WrapperElementInLine<U>, U> boolean isSame(T a,T b) {
		return a.getPoint().equals(b.getPoint());
	}
	

}
