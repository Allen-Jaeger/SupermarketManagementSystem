package com.invoicingSystem.main.user.service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.invoicingSystem.main.shop.domain.Shop;
import com.invoicingSystem.main.shop.repository.IShopRepository;
import com.invoicingSystem.main.user.domain.User;
import com.invoicingSystem.main.user.repository.IUserRepository;
import com.invoicingSystem.main.user.util.Gender;
import com.invoicingSystem.main.user.util.MD5Tool;
import com.invoicingSystem.main.user.util.UserStatus;
import com.invoicingSystem.main.user.util.UserType;
import com.invoicingSystem.main.warehouse.domain.Warehouse;
import com.invoicingSystem.main.warehouse.repository.IWarehouseRepository;

/**
 * @author LiJuncong
 * at 2018年9月18日
 */
@Transactional
@Service
public class UserService implements IUserService {
	@Autowired
	IUserRepository userRepository;
	@Autowired
	IWarehouseRepository warehouseRepository;
	@Autowired
	IShopRepository shopRepository;
	@Value("#{userDefaultBean.defIconUrl}")
	private String defIconUrl; // 头像
	
	@Override
	public void save(User user) {
		userRepository.save(user);
	}

	@Override
	public User findById(Long id) {
		return userRepository.findById(id).get();
	}

	@Override
	public User findByWorkNum(String workNum) {
		return userRepository.findByWorkNum(workNum);
	}


	/**
	 * User userTry	//用户输入的信息
	 * User user	//根据信息获取的数据库用户  可能为空
	 */
	@Override
	public String userLogin(User userTry, User user) {
		if(user == null) {
			return "用户不存在";
		}else if(user.getUserStatus() != UserStatus.NORMAL) {
			return "该账户被冻结或已弃用";
		}else if(MD5Tool.ToMd5String(userTry.getPassword()).equals(user.getPassword())) {
			return "登陆成功";
		}else {
			return "账户或密码错误";
		}
	}

	/**
	   *  查找所有
	 */
	@Override
	public Page<User> findAll(Pageable pageable) {
		Page<User> pageUser = userRepository.findAll(pageable);
		return pageUser;
	}

	/* (non-Javadoc)
	 * 上传头像 刷新User
	 */
	@Override
	public String writeIcon(User user, MultipartFile icon) {
		//判断文件类型是否符合要求
		String[] type = icon.getContentType().split("/");
		if(!type[0].equals("image") || null == type[1]) {
			return "文件类型不能被识别为图片";
		}
		//拼接随机数解决浏览器缓存问题
		String random = String.valueOf(Math.random()).substring(4, 8);
		//文件名字=用户名字+随机数+文件类型
		String filename = user.getName()+ random + "."+type[1];
		//使用System获取项目路径
		String path = System.getProperty("user.dir")+ "\\supermarketInvoicingSystem\\resources\\usersIcon";
		//输入输出流处理(存储+部署)
		//部署路径
		String path2 = System.getProperty("user.dir")+ "\\src\\main\\webapp\\resources\\usersIcon";
		try {
			FileOutputStream fs = new FileOutputStream(path + "/" + filename);
			FileOutputStream fs2 = new FileOutputStream(path2 + "/" + filename);
			byte[] buffer = new byte[1024 * 1024];
			int byteread = 0;
			InputStream is = icon.getInputStream();
			while ((byteread= is.read(buffer))!=-1) {
				fs.write(buffer,0,byteread);
		        fs.flush();
		        fs2.write(buffer,0,byteread);
		        fs2.flush();
			}
	        fs.close();
	        fs2.close();
	        is.close();
		} catch (Exception e) {
			
		}
		//头像不为默认时，删除旧头像
		if(!user.getIconUrl().equals(defIconUrl)) {
			File oldIcon = new File(path + "/" + user.getIconUrl());
			File oldIcon2 = new File(path2 + "/" + user.getIconUrl());
			if(oldIcon.exists()) {
				oldIcon.delete();
			}
			if(oldIcon2.exists()) {
				oldIcon2.delete();
			}
		}
		//更新用户信息
		user.setIconUrl(filename);
		userRepository.save(user);
		return "修改成功";
	}

	/* 
	 * 条件查询
	 */
	@Override
	public Page<User> findAll(Specification<User> spec, Pageable pageable) {
		return userRepository.findAll(spec, pageable);
	}

	/**
	 *   证件号查询
	 */
	@Override
	public User findByIdentity(String identity) {
		return userRepository.findByIdentity(identity);
	}

	/* (non-Javadoc)
	 * 1.UserDto 返回的是部门ID	\\n
	 * 2.根据用户类型=建立warhouse或shop 的关系
	 */
	@Override
	public void buildDepartment(User user, Long depId) {
		if(user.getUserType().equals(UserType.STORE_MANAGER)
				|| user.getUserType().equals(UserType.SALESMAN)) {
			//超市
			user.setShop(shopRepository.findById(depId).get());
		}else if(user.getUserType().equals(UserType.KEEPER)){
			//仓库
			user.setWarehouse(warehouseRepository.findById(depId).get());
		}
	}
	
	/* (non-Javadoc)
	 * 返回(index,type),name
	 */
	@Override
	public List<Map<String, String>> getAllDep() {
		List<Map<String, String>> list= new ArrayList<Map<String, String>>();
		for(Warehouse wh : warehouseRepository.findAll()) {
			Map<String,String> map = new HashMap<>();
			map.put("index","warehouse,"+String.valueOf(wh.getId()));
			map.put("name", "仓库:"+wh.getName());
			list.add(map);
		}
		for(Shop shop : shopRepository.findAll()) {
			Map<String,String> map = new HashMap<>();
			map.put("index","shop,"+String.valueOf(shop.getId()));
			map.put("name", "门店:"+shop.getName());
			list.add(map);
		}
		return list;
	}
	
	/* 
	 * 根据每种用户类型统计男女个数
	 */
	@Override
	public List<Map<String, String>> getGroupGenderCount() {
		List<Map<String, String>> list= new ArrayList<Map<String, String>>();
		List<Object> resultList = userRepository.findAllGenderCount();
		boolean isExist = false;
		for (int i = 0; i < resultList.size(); i++) {
			Object[] obj = (Object[]) resultList.get(i);
			UserType userType = (UserType)obj[0];
			Gender gender = (Gender)obj[1];
			Map<String,String> map = new HashMap<>();
			isExist = false;
			map.put("userType",userType.getChineseName());
			//判断是否userType在list中已经存在
			for (int j = 0; j < list.size(); j++) {
				Map<String,String> map2 = list.get(j);
//				String existUserTypeValue = map2.get("userType");
				if (map.get("userType").equals(map2.get("userType"))) {
					if (gender.equals(Gender.MALE)) {
						map2.put("男",String.valueOf(Long.parseLong(map2.get("男"))+(long)obj[2]));
					} 
					if (gender.equals(Gender.FEMALE)) {
						map2.put("女",String.valueOf(Long.parseLong(map2.get("女"))+(long)obj[2]));
					} 
					list.set(j, map2);
					isExist=true;
					break;
				}
			}
			if(!isExist) {
				if (gender.equals(Gender.MALE)) {
					map.put("男",String.valueOf(obj[2]));
					map.put("女",String.valueOf(0));
				} else {
					map.put("男",String.valueOf(0));
					map.put("女",String.valueOf(obj[2]));
				}
				list.add(map);
			}
		}
		
		return list;
	}
	
}
