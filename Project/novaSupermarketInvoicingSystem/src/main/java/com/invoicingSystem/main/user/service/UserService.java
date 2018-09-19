package com.invoicingSystem.main.user.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.invoicingSystem.main.user.domain.User;
import com.invoicingSystem.main.user.repository.IUserRepository;

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

}
