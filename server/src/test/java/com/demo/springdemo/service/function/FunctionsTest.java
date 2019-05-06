package com.demo.springdemo.service.function;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.Arrays;
import java.util.List;

import org.junit.Test;

import com.demo.springdemo.service.function.model.WrapperElementInLine;

public class FunctionsTest {
	
	@Test
	public void test_moveLine() {
		
		List<? extends WrapperElementInLine<Wraped>> actual1 = Functions.moveLine(Arrays.asList(new Stub(0,1L),new Stub(2,2L)));
		List<? extends WrapperElementInLine<Wraped>> expected1 = Arrays.asList(new Stub(0,1L),new Stub(1,2L));
		assertThat(actual1.toString()).isEqualTo(expected1.toString());
		
		List<? extends WrapperElementInLine<Wraped>> actual2 = Functions.moveLine(Arrays.asList(new Stub(0,2L),new Stub(2,2L)));
		List<? extends WrapperElementInLine<Wraped>> expected2 = Arrays.asList(new Stub(0,4L));
		assertThat(actual2.toString()).isEqualTo(expected2.toString());
		
		List<? extends WrapperElementInLine<Wraped>> actual3 = Functions.moveLine(Arrays.asList(new Stub(0,2L),new Stub(1,2L),new Stub(2,2L)));
		List<? extends WrapperElementInLine<Wraped>> expected3 = Arrays.asList(new Stub(0,4L),new Stub(1,2L));
		assertThat(actual3.toString()).isEqualTo(expected3.toString());
		
		List<? extends WrapperElementInLine<Wraped>> actual4 = Functions.moveLine(Arrays.asList(new Stub(0,2L),new Stub(1,4L),new Stub(3,2L)));
		List<? extends WrapperElementInLine<Wraped>> expected4 = Arrays.asList(new Stub(0,2L),new Stub(1,4L),new Stub(2,2L));
		assertThat(actual4.toString()).isEqualTo(expected4.toString());
		
		
	}
	
	public static class Wraped {

		public Wraped(Long number, boolean inMerged) {
			this.number = number;
			this.isMerged = inMerged;
		}
		private Long number;
		private boolean isMerged;
	}
	
	public static class Stub extends WrapperElementInLine<Wraped> {
		
		public Stub(Integer point,Long number,boolean isMerged) {
			this.point = point;
			this.wraped = new Wraped(number,isMerged);
		}
		
		public Stub(Integer point, Long number) {
			this.point = point;
			this.wraped = new Wraped(number,false);
		}

		private Integer point;
		private Wraped wraped;
		
		@Override
		public boolean isMergeable(Wraped target) {
			return !target.isMerged && wraped.number.equals(target.number);
		}

		@Override
		public WrapperElementInLine<Wraped> moveAt(int at) {
			return new Stub(at,wraped.number);
		}

		@Override
		public WrapperElementInLine<Wraped> merge() {
			return new Stub(point,wraped.number * 2, true);
		}

		@Override
		public Integer getPoint() {
			return point;
		}

		@Override
		public Wraped unwrap() {
			return wraped;
		}
		
		@Override
		public String toString() {
			return wraped.number + "@" + point;
		}
		
		
		
	}

}
