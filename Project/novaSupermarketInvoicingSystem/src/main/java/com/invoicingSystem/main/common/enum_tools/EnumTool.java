package com.invoicingSystem.main.common.enum_tools;

import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author LiJuncong
 * at 2018年10月8日
 * 
 */
public class EnumTool<E extends Enum<E>> {
	private Class<?> clazz;
	public EnumTool(E e) {
		clazz = e.getClass();
	}

	//枚举型的所有内容
	Object[] objG = null;
	/**
	 * 要求枚举类型有getChineseName()和getIndex()方法
	 * 
	 * new EnumTool<UserType>(UserType.KEEPER);	->以一个实例声明Class
	 * 
	 * 使用泛型和反射  使得枚举型能够返回为HashMap队列
	 * @return  List<Map<String,String>>
	 */
	public List<Map<String,String>> allToMap(){
		List<Map<String,String>> list = new ArrayList<>();
		try {
			//获取枚举的values()方法
			Method m = this.clazz.getMethod("values", null);
			//执行取得枚举型数组
			objG = (Object[]) m.getReturnType().cast(m.invoke(null, null));
			//获取枚举索引和中文字符串方法
			Method m_getMean = this.clazz.getMethod("getChineseName", null);
			Method m_getIndex = this.clazz.getMethod("getIndex", null);
			
			for(int i = 0; i < objG.length; i++) {
				Map<String, String> map = new HashMap<>();
				map.put("index", m_getIndex.invoke(objG[i], null).toString());
				map.put("name", m_getMean.invoke(objG[i], null).toString());
				list.add(map);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}
	
	/**
	 * 对有getChineseName()方法的枚举型  输入中文名字 返回Enum
	 * @param name
	 * @return
	 */
	public Enum<?> transToEnum(String name){
		try {
			//获取枚举的values()方法
			Method m = this.clazz.getMethod("values", null);
			//执行取得枚举型数组
			objG = (Object[]) m.getReturnType().cast(m.invoke(null, null));
			//获取枚举索引和中文字符串方法
			Method m_getMean = this.clazz.getMethod("getChineseName", null);
			Object obj = null;
			for(int i = 0; i < objG.length; i++) {
				obj = m_getMean.invoke(objG[i], null);
				if(obj.toString().equals(name)) {
					return (Enum<?>) objG[i];
				}
			}
		}catch(Exception e) {
			e.printStackTrace();
		}
		return null;
	}
}
