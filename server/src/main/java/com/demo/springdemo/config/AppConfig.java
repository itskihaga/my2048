package com.demo.springdemo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.demo.springdemo.json.DelegateSerializer;
import com.demo.springdemo.model.BoardStatus;
import com.demo.springdemo.model.CellValue;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;

@Configuration
public class AppConfig {

	@Bean
	public ObjectMapper objectMapper() {
		ObjectMapper mapper = new ObjectMapper();
		SimpleModule module = new SimpleModule();
		module.addSerializer(BoardStatus.class, new DelegateSerializer<BoardStatus>(b -> b.getStatus()));
		module.addSerializer(CellValue.class, new DelegateSerializer<CellValue>(b -> b.getNumber()));
		mapper.registerModule(module);
		return mapper;
	}

}
