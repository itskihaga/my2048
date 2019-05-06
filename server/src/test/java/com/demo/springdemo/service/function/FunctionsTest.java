package com.demo.springdemo.service.function;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.junit.Test;

import com.demo.springdemo.model.Score;
import com.demo.springdemo.service.function.model.CellInfoWapper;

public class FunctionsTest {
	
	@Test
	public void test_moveLine() {
		
		List<? extends CellInfoWapper<Object>> actual1 = Functions.moveLine(Arrays.asList(new Stub(0,1L),new Stub(2,2L)));
		List<? extends CellInfoWapper<Object>> expected1 = Arrays.asList(new Stub(0,1L),new Stub(1,2L));
		assertThat(actual1.toString()).isEqualTo(expected1.toString());
		
		List<? extends CellInfoWapper<Object>> actual2 = Functions.moveLine(Arrays.asList(new Stub(0,2L),new Stub(2,2L)));
		List<? extends CellInfoWapper<Object>> expected2 = Arrays.asList(new Stub(0,4L));
		assertThat(actual2.toString()).isEqualTo(expected2.toString());
		
		List<? extends CellInfoWapper<Object>> actual3 = Functions.moveLine(Arrays.asList(new Stub(0,2L),new Stub(1,2L),new Stub(2,2L)));
		List<? extends CellInfoWapper<Object>> expected3 = Arrays.asList(new Stub(0,4L),new Stub(1,2L));
		assertThat(actual3.toString()).isEqualTo(expected3.toString());
		
		List<? extends CellInfoWapper<Object>> actual4 = Functions.moveLine(Arrays.asList(new Stub(0,2L),new Stub(1,4L),new Stub(3,2L)));
		List<? extends CellInfoWapper<Object>> expected4 = Arrays.asList(new Stub(0,2L),new Stub(1,4L),new Stub(2,2L));
		assertThat(actual4.toString()).isEqualTo(expected4.toString());
		
		
	}
	
	public static class Stub extends CellInfoWapper<Object> {
		
		public Stub(Integer point, Long number) {
			super(new Object());
			this.point = point;
			this.number = number;
		}
		
		public Stub(Integer point, Long number,Score score) {
			super(new Object(),score);
			this.point = point;
			this.number = number;
		}


		private Integer point;
		private Long number;
	

		@Override
		public Integer getPoint() {
			// TODO Auto-generated method stub
			return point;
		}

		@Override
		public Long getNumber() {
			// TODO Auto-generated method stub
			return number;
		}

		@Override
		public CellInfoWapper<Object> moveAt(int at) {
			return new Stub(at, number);
		}

		@Override
		public CellInfoWapper<Object> merge() {
			return new Stub(point,number * 2,new Score(number * 2));
		}
		
		@Override
		public String toString() {
			return this.number.toString() + "@" + this.point;
		}

		
		
	}

}
