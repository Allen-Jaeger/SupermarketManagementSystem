package com.invoicingSystem.main.user.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.invoicingSystem.main.user.domain.User;
import com.invoicingSystem.main.user.repository.IUserRepository;
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
		// TODO Auto-generated method stub
		userRepository.save(user);
	}

	@Override
	public User findById(Long id) {
		return userRepository.findById(id).get();
	}

	@Override
	public User findByWorkNum(String workNum) {
		// TODO Auto-generated method stub
		return userRepository.findByWorkNum(workNum);
	}


	/**
	 * User userTry	//用户输入的信息
	 * User user	//根据信息获取的数据库用户  可能为空
	 */
	@Override
	public String userLogin(User userTry, User user) {
		// TODO Auto-generated method stub
		if(user == null) {
			return "用户不存在";
		}else if(user.getUserStatus() != UserStatus.NORMAL) {
			return "该账户被冻结或已弃用";
		}else if(userTry.getPassword().equals(user.getPassword())) {
			return "登陆成功";
		}else {
			return "账户或密码错误";
		}
	}


}
