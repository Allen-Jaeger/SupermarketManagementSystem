package com.invoicingSystem.main.user.service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.invoicingSystem.main.user.domain.User;
import com.invoicingSystem.main.user.repository.IUserRepository;
import com.invoicingSystem.main.user.util.MD5Tool;
import com.invoicingSystem.main.user.util.UserStatus;

/**
 * @author LiJuncong
 * at 2018年9月18日
 */
@Transactional
@Service
public class UserService implements IUserService {
	@Autowired
	IUserRepository userRepository;
	
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
		if(!user.getIconUrl().equals("defaultUser.jpg")) {
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

}
