package com.demo.springdemo.service.function.model;

import com.demo.springdemo.model.Address;
import com.demo.springdemo.model.CellInfo;
import com.demo.springdemo.model.CellValue;
import com.demo.springdemo.model.Direction;
import com.demo.springdemo.model.Score;
import com.demo.springdemo.model.Address.XY;

public class CellInfoWapperElementInLine extends WrapperElementInLine<CellInfoWapper>{

	private final Direction direction;
	private final CellInfoWapper unwrap;

	public CellInfoWapperElementInLine(CellInfo cellInfo,Direction direction) {
		this.unwrap = new CellInfoWapper(cellInfo);
		this.direction = direction;
	}

	private CellInfoWapperElementInLine(CellInfo cellInfo, Score score,Direction direction) {
		this.unwrap = new CellInfoWapper(cellInfo,score);
		this.direction = direction;
	}

	@Override
	public CellInfoWapperElementInLine merge() {

		CellValue doubled = cellInfo().getValue().getDoubleNumber();

		return new CellInfoWapperElementInLine(
				new CellInfo(
						doubled,
						cellInfo().getAddress()
				),
				new Score(doubled.getNumber()),
				this.direction
			);
	}

	@Override
	public Integer getPoint() {
		return virtualPointToRealPoint(cellInfo().getAddress().get(getXY()));
	}

	public Integer getGroup() {
		return unwrap.getCellInfo().getAddress().get(getXY().reverse());
	}

	@Override
	public CellInfoWapperElementInLine moveAt(int at) {
		Address address = _move(at);
		return new CellInfoWapperElementInLine(new CellInfo(cellInfo().getValue(), address),this.direction);
	}

	private Address _move(int at) {
		return cellInfo().getAddress().move(getXY(), virtualPointToRealPoint(at));
	}

	private Address.XY getXY(){
		switch (direction) {
			case Left:
			case Right:
				return XY.X;
			case Up:
			case Down:
				return XY.Y;
			default:
				return null;
		}
	}

	private Integer virtualPointToRealPoint(Integer vp) {
		switch (direction) {
			case Left:
			case Up:
				return vp;
			case Right:
			case Down:
				return Address.SIZE - vp - 1;
			default:
				return null;
		}
	}

	@Override
	public boolean isMergeable(CellInfoWapper target) {
		return !target.isMerged() && cellInfo().getValue().getNumber().equals(target.getCellInfo().getValue().getNumber());
	}

	@Override
	public CellInfoWapper unwrap() {
		return unwrap;
	}

	private CellInfo cellInfo() {
		return unwrap.getCellInfo();
	}

}
