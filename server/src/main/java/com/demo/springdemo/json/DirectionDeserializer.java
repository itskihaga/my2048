package com.demo.springdemo.json;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

import com.demo.springdemo.model.Direction;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;

public class DirectionDeserializer  extends JsonDeserializer<Direction>{
	
	
	private final Map<String, Direction> str2dir;
	

	public DirectionDeserializer() {
		this.str2dir = new HashMap<String, Direction>();
		this.str2dir.put("U", Direction.Up);
		this.str2dir.put("D", Direction.Down);
		this.str2dir.put("L", Direction.Left);
		this.str2dir.put("R", Direction.Right);
	}


	@Override
	public Direction deserialize(JsonParser p, DeserializationContext ctxt) throws IOException, JsonProcessingException {
		return Objects.requireNonNull(str2dir.get(p.getValueAsString())) ;
	}

}
