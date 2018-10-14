package com.invoicingSystem.main.user.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.invoicingSystem.main.user.domain.User;

/**
 * @author LiJuncong
 * at 2018年9月18日
 */
@Repository
public interface IUserRepository extends PagingAndSortingRepository<User, Long>, JpaSpecificationExecutor<User>{
	@Query(value="from User user where user.workNum like ?1")
	public User findByWorkNum(String workNum);
	
	@Query(value="from User user where user.identity like ?1")
	public User findByIdentity(String identity);

	/*
	 * 根据每种用户类型统计男女个数
	 */
	@Query(value="select userType,gender,count(*) from User user group by userType,gender")
	public List<Object> findAllGenderCount();
}
