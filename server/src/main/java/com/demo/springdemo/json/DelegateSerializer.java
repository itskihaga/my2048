package com.demo.springdemo.json;

import java.io.IOException;
import java.util.function.Function;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

public class DelegateSerializer<T>  extends JsonSerializer<T>{
	
	private Function<T, Object> get;
	
	public DelegateSerializer(Function<T, Object> get) {
		this.get = get;
	}

	@Override
	public void serialize(T value, JsonGenerator gen, SerializerProvider serializers) throws IOException {
		gen.writeObject(get.apply(value)); 
	}

}
