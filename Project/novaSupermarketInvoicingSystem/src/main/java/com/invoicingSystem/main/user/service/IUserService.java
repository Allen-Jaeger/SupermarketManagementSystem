package com.invoicingSystem.main.user.service;

import com.invoicingSystem.main.user.domain.User;

/**
 * @author LiJuncong
 * at 2018年9月18日
 */

public interface IUserService {
	public void updateUser(User user);
	public User findById(Long id);
}
