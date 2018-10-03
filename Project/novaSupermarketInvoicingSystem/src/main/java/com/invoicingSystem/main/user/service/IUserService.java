package com.invoicingSystem.main.user.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import com.invoicingSystem.main.user.domain.User;

/**
 * @author LiJuncong
 * at 2018年9月18日
 */

public interface IUserService {
	public void save(User user);
	public User findById(Long id);
	public User findByWorkNum(String workNum);
	public String userLogin(User userTry, User user);
	public Page<User> findAll(Pageable pageable);
	public String writeIcon(User user, MultipartFile icon);
}
