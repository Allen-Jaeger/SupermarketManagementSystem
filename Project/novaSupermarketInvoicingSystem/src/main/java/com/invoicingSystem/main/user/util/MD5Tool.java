package com.invoicingSystem.main.user.util;

import java.security.MessageDigest;

/**
 * @author LiJuncong
 * at 2018年9月26日
 */

public class MD5Tool {
	/**
	 * 返回加密后的字符串
	 * @param string
	 * @return
	 */
	public static String ToMd5String(String string) {
		if (string!=null) { 
            try { 
                //创建具有指定算法名称的信息摘要 
                MessageDigest md5 = MessageDigest.getInstance("MD5"); 
                //使用指定的字节数组对摘要进行最后更新，然后完成摘要计算 
                byte[] results = md5.digest(string.getBytes()); 
                //将得到的字节数组变成字符串返回  
                String result = new String(results,"UTF-8"); 
                return result; 
            } catch (Exception e) { 
                e.printStackTrace(); 
            } 
        } 
		return "";
	}
	public static boolean isSame(String originString, String md5String) {
		if(MD5Tool.ToMd5String(originString).equals(md5String)) {
			return true;
		}
		return false;
	}
}
