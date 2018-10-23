package com.invoicingSystem.main.indent.listener;

import org.activiti.engine.RuntimeService;
import org.activiti.engine.delegate.DelegateTask;
import org.activiti.engine.delegate.TaskListener;
import org.activiti.engine.runtime.ProcessInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.invoicingSystem.main.commodity.domain.Commodity;
import com.invoicingSystem.main.commodity.service.ICommodityService;
import com.invoicingSystem.main.commodity.util.CommodityStatus;
import com.invoicingSystem.main.common.beans.BeanUtils;
import com.invoicingSystem.main.indent.domain.Indent;
import com.invoicingSystem.main.indent.service.IIndentService;
import com.invoicingSystem.main.indent.util.IndentStatus;

import java.text.Format;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;

/**
 * 销假后处理器
 * <p>
 * 设置销假时间
 * </p>
 * <p>
 * 使用Spring代理，可以注入Bean，管理事物
 * </p>
 * bean id=reportBackEndProcessor
 */
@Component
@Transactional
public class GoodsCheckingEndListener implements TaskListener {
	private static final long serialVersionUID = -8360605214753688651L;

	@Autowired
	private IIndentService indentService;

	@Autowired
	private RuntimeService runtimeService;

	@Autowired
	private ICommodityService commodityService;

	public void notify(DelegateTask delegateTask) {

		String processInstanceId = delegateTask.getProcessInstanceId();
		ProcessInstance processInstance = runtimeService.createProcessInstanceQuery()
				.processInstanceId(processInstanceId).singleResult();
		Indent indent = indentService.findById(new Long(processInstance.getBusinessKey()));

		if (delegateTask.getVariable("examinationPass").toString() == "true") {
			Commodity cmd;
			List<Commodity> cmdList;
			cmdList = indent.getCommodities();// 获取调货单商品列表
			for (int i = 0; i < cmdList.size(); i++) {
				cmd = cmdList.get(i);// 循环获得商品

				Commodity newCmd = new Commodity();
				BeanUtils.copyProperties(cmd, newCmd);

				newCmd.setId(null);
				newCmd.setWarehouse(indent.getToWarehouse());
				newCmd.setIndent(null);
				
						Format f = new SimpleDateFormat("yyyy-MM-dd");
						Date today = new Date();
				        Calendar c = Calendar.getInstance();
				        c.setTime(today);
				        c.add(Calendar.YEAR, 1);
				        Date tomorrow = c.getTime();
		        
		        newCmd.setPeriod(tomorrow);
				newCmd.setCommodityStatus(CommodityStatus.SALEABLE);

				commodityService.save(newCmd);

			}

			indent.setIndentStatus(IndentStatus.FINISHED);
		} else {
			indent.setIndentStatus(IndentStatus.ERROR);
		}

		indent.setGoodsCheckingReason(delegateTask.getVariable("goodsCheckingReason").toString());
	}
}
