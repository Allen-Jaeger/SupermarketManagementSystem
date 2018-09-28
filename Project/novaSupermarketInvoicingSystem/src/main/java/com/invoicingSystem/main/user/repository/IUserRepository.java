package com.invoicingSystem.main.user.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.invoicingSystem.main.user.domain.User;

/**
 * @author LiJuncong
 * at 2018年9月18日
 */
@Repository
public interface IUserRepository extends PagingAndSortingRepository<User, Long>{
	@Query(value="from User user where user.workNum like ?1")
	public User findByWorkNum(String workNum);
	
//	@Query(value="from User user where user.workNum like ?1")
//	public User findPage(String workNum);
}
