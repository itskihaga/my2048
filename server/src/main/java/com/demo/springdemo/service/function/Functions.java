package com.demo.springdemo.service.function;

import java.util.Iterator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.demo.springdemo.service.function.model.CellInfoWapper;

public class Functions {
	
	public static <U> List<? extends CellInfoWapper<U>> moveLine(List<? extends CellInfoWapper<U>> line){
		return recurStep(line.stream().iterator(),line);
	}
	
	static <U> List<CellInfoWapper<U>> step(List<? extends CellInfoWapper<U>> list,CellInfoWapper<U> cellInfoWapper){
		Optional<? extends CellInfoWapper<U>> shoutotu = list.stream()
				.filter(e -> e.getPoint() < cellInfoWapper.getPoint())
				.max((a,b) -> a.compareTo(b));
				
		boolean gattai = 
				shoutotu.isPresent() 
				&& !shoutotu.get().isMerged() 
				&& shoutotu.get().getNumber().equals(cellInfoWapper.getNumber());

		if(gattai) {
			return list.stream()
				.filter(e -> !isSame(cellInfoWapper,e))
				.map(e -> isSame(shoutotu.get(),e) ? e.merge() : e)
				.collect(Collectors.toList());
		} else {
			int moveTo = shoutotu.isPresent() ? shoutotu.get().getPoint() + 1 : 0;
			return list.stream()
					.map(e -> isSame(cellInfoWapper,e) ? e.moveAt(moveTo) : e)
					.collect(Collectors.toList());
		}	
	}

	private static <U> List<? extends CellInfoWapper<U>> recurStep(Iterator<? extends CellInfoWapper<U>> iterator,List<? extends CellInfoWapper<U>> list) {
		return iterator.hasNext() ? recurStep(iterator,step(list,iterator.next())) : list;
	}
	
	private static <T extends CellInfoWapper<U>, U> boolean isSame(T a,T b) {
		return a.getPoint().equals(b.getPoint());
	}
	

}
