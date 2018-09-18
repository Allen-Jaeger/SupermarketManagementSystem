package com.invoicingSystem.main.user.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.invoicingSystem.main.user.domain.User;

/**
 * @author LiJuncong
 * at 2018年9月18日
 */
@Repository
public interface IUserRepository extends PagingAndSortingRepository<User, Long>{

}
