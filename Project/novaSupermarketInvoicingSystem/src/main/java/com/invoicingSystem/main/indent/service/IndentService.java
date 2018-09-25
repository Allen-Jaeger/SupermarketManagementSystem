package com.invoicingSystem.main.indent.service;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.invoicingSystem.main.indent.domain.Indent;
import com.invoicingSystem.main.indent.domain.IndentDTO;
import com.invoicingSystem.main.indent.repository.IIndentRepository;

/**
 * @author LiJuncong
 * at 2018年9月19日
 */
@Transactional
@Service
public class IndentService implements IIndentService {
	@Autowired
	IIndentRepository indentRepository;
	
	@Override
	public void save(Indent indent) {
		indentRepository.save(indent);
	}

    @Override
    public Indent findOne(Long id) {
      
        return indentRepository.findById(id).get();
    }

    @Override
    public void delete(Long id) {
        // TODO Auto-generated method stub
        
    }

    @Override
    public Page<Indent> findIndent(String userId, Pageable pageable) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public void startWorkflow(String userId, Long indentId, Map<String, Object> variables) {
        // TODO Auto-generated method stub
        
    }

    @Override
    public Page<IndentDTO> findTodoTasks(String userId, Pageable pageable) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public void claim(String taskId, String userId) {
        // TODO Auto-generated method stub
        
    }

    @Override
    public void complete(String taskId, Map<String, Object> variables) {
        // TODO Auto-generated method stub
        
    }


}
