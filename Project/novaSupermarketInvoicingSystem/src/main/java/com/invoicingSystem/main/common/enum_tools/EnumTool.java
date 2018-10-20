package com.invoicingSystem.main.common.enum_tools;

import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author LiJuncong
 * at 2018年10月8日
 * new EnumTool(UserType.class);以传递类
 */
public class EnumTool {
	private Class<?> clazz;
	List<Enum<?>> listEnum = new ArrayList<>();
	//要求枚举类型有getChineseName()和getIndex()方法
	Method m_getMean;
	Method m_getIndex;
	public EnumTool(Class<?> ce) {
		clazz = ce;
		try {
			this.m_getMean = this.clazz.getMethod("getChineseName");
			this.m_getIndex = this.clazz.getMethod("getIndex");
			//获取枚举的values()方法
			Method m = this.clazz.getMethod("values");
			//执行取得枚举型数组
			Object[] objG = (Object[]) m.getReturnType().cast(m.invoke(null));
			for(Object obj:objG) {
				listEnum.add((Enum<?>)obj);
			}
		}catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * 	获取所有枚举
	 * @return
	 */
	public List<Enum<?>> getAllEnum(){
		return listEnum;
	}
	/**
	 * An_enum TO Map
	 * @param e
	 * @return
	 */
	public Map<String,String> getMap(Enum<?> e) {
		Map<String, String> map = new HashMap<>();
		try {
			map.put("index", m_getIndex.invoke(e).toString());
			map.put("name", m_getMean.invoke(e).toString());
		} catch (Exception e1) {
			e1.printStackTrace();
		}
		return map;
	}
	
	/**
	 * 
	 * 	使用泛型和反射  使得枚举型能够返回为HashMap队列
	 * @return  List<Map<String,String>>
	 */
	public List<Map<String,String>> allToMap(){
		List<Map<String,String>> list = new ArrayList<>();
		for(Enum<?> e: this.listEnum) {
			list.add(getMap(e));
		}
		return list;
	}
	
	/**
	 * 对有getChineseName()方法的枚举型  输入中文名字 返回An_enum
	 * @param name
	 * @return
	 */
	public Enum<?> transToEnum(String name){
		try {
			List<Enum<?>> list = this.getAllEnum();
			for(Enum<?> e:list) {
				if(name.equals(m_getMean.invoke(e))) {
					return e;
				}
			}
		}catch(Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	//输入index返回An_enum
	public Enum<?> getEnumFromInt(int index){
		try {
			//执行取得枚举型数组
			List<Enum<?>> list = this.getAllEnum();
			for(Enum<?> e:list) {
				if(m_getIndex.invoke(e).equals(index)) {
					return e;
				}
			}
		}catch(Exception e) { 
			e.printStackTrace();
		}
		return null;
	}
}
