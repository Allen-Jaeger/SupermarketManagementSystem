package com.invoicingSystem.main.user.util;

import java.security.MessageDigest;

/**
 * @author LiJuncong at 2018年9月26日
 */

public class MD5Tool {

	/**
	 * @param s
	 * @return
	 */
	public static String ToMd5String(String s) {
		try {
			MessageDigest md = MessageDigest.getInstance("MD5");
			byte[] bytes = md.digest(s.getBytes("utf-8"));
			return toHex(bytes);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	/**
	 * 转16进制输出
	 * @param bytes
	 * @return
	 */
	private static String toHex(byte[] bytes) {
		final char[] HEX_DIGITS = "0123456789ABCDEF".toCharArray();
		StringBuilder ret = new StringBuilder(bytes.length * 2);
		for (int i = 0; i < bytes.length; i++) {
			ret.append(HEX_DIGITS[(bytes[i] >> 4) & 0x0f]);
			ret.append(HEX_DIGITS[bytes[i] & 0x0f]);
		}
		return ret.toString();
	}

	/**
	 * @param two
	 * @param md5One
	 * @return
	 */
	public static boolean isSame(String originString, String md5String) {
		if(MD5Tool.ToMd5String(originString).equals(md5String)) {
			return true;
		}else {
			return false;
		}
	}
}
