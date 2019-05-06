package com.demo.springdemo.service.function.model;

import com.demo.springdemo.model.Address;
import com.demo.springdemo.model.CellInfo;
import com.demo.springdemo.model.CellNumber;
import com.demo.springdemo.model.Direction;
import com.demo.springdemo.model.Score;
import com.demo.springdemo.model.Address.XY;

public class CellInfoWapperImpl extends CellInfoWapper<CellInfo>{
	
	private final Direction direction;

	public CellInfoWapperImpl(CellInfo cellInfo,Direction direction) {
		super(cellInfo);
		this.direction = direction;
	}
	
	private CellInfoWapperImpl(CellInfo cellInfo, Score score,Direction direction) {
		super(cellInfo,score);
		this.direction = direction;
	}
	
	@Override
	public CellInfoWapperImpl merge() {
		
		CellNumber doubled = this.unwrap.getValue().getDoubleNumber();
		
		return new CellInfoWapperImpl(
				new CellInfo(
						doubled, 
						this.unwrap.getAddress()
				),
				new Score(doubled.getNumber()),
				this.direction
			);
	}

	@Override
	public Integer getPoint() {
		return virtualPointToRealPoint(unwrap.getAddress().get(getXY()));
	}
	
	public Integer getGroup() {
		return unwrap.getAddress().get(getXY().reverse());
	}

	@Override
	public Long getNumber() {
		return this.unwrap.getValue().getNumber();
	}

	@Override
	public CellInfoWapperImpl moveAt(int at) {
		Address address = _move(at);
		return new CellInfoWapperImpl(new CellInfo(this.unwrap.getValue(), address),this.direction);
	}
	
	private Address _move(int at) {
		return this.unwrap.getAddress().move(getXY(), virtualPointToRealPoint(at));
	}
	
	public Address.XY getXY(){
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
	
	public Integer virtualPointToRealPoint(Integer vp) {
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



}
