package com.invoicingSystem.main.indent.util;

import java.text.SimpleDateFormat;
import java.util.Date;

public class GenerateRandIndentNum {

	public static String GenerateNum() {
		String dataTime = new SimpleDateFormat("yyyyMMddhhmmss").format(new Date());
		String prefix = "Nova";
		System.out.println(prefix + dataTime);
		return prefix + dataTime;
	}
}
