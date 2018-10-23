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

import java.util.Date;
import java.util.List;

/**
 * @author Lzy
 * @version 创建时间：2018年10月22日 上午9:11:29 类说明
 */
@Component
@Transactional
public class TransferEnd implements TaskListener {

    private static final long serialVersionUID = 1L;

    @Autowired
    private IIndentService indentService;

    @Autowired
    private ICommodityService commodityService;

    @Autowired
    private RuntimeService runtimeService;

    public void notify(DelegateTask delegateTask) {
        String processInstanceId = delegateTask.getProcessInstanceId();
        ProcessInstance processInstance = runtimeService.createProcessInstanceQuery()
                .processInstanceId(processInstanceId).singleResult();
        Indent indent = indentService.findById(new Long(processInstance.getBusinessKey()));
        Commodity cmd, toCmd, fromCmd;
        List<Commodity> cmdList;
        int num;
        
        if (delegateTask.getVariable("examinationPass").toString() =="true") {

            cmdList = indent.getCommodities();//获取调货单商品列表
            for (int i = 0; i < cmdList.size(); i++) {
                cmd = cmdList.get(i);//循环获得商品
                if (indent.getIndentType().toString().equals("TRANSPORT")) 
                {// 仓库运输到仓库时
                    toCmd = commodityService.findByBarCodeAndExpDateFromWareHouse(indent.getToWarehouse().getId(),
                            cmd.getBarCode(), cmd.getPeriod());
                    if (null == toCmd) {// 仓库没有同批商品时
                        Commodity newCmd= new Commodity();
                        BeanUtils.copyProperties(cmd, newCmd);
                        
                        newCmd.setId(null);
                        newCmd.setIndent(null);
                        newCmd.setWarehouse(indent.getToWarehouse());
                        //newCmd.setShop(null);
                        newCmd.setCommodityStatus(CommodityStatus.SALEABLE);
                        
                        commodityService.save(newCmd);
                        
                        fromCmd = commodityService.findByBarCodeAndExpDateFromWareHouse(indent.getFromWarehouse().getId(), cmd.getBarCode(), cmd.getPeriod());
                        num = fromCmd.getAmount();
                        fromCmd.setAmount(num - cmd.getAmount());// 来源商品减少数量
                        
                    } else {// 仓库存在同批商品时
                        num = toCmd.getAmount();
                        toCmd.setAmount(num + cmd.getAmount());// 同批商品增加数量
                        fromCmd = commodityService.findByBarCodeAndExpDateFromWareHouse(indent.getFromWarehouse().getId(), cmd.getBarCode(), cmd.getPeriod());
                        num = fromCmd.getAmount();
                        fromCmd.setAmount(num - cmd.getAmount());// 来源商品减少数量
                       
                    }
                } 
                
                
                else if (indent.getIndentType().toString().equals("RETREAT")) 
                {// 超市运输到仓库时
                    toCmd = commodityService.findByBarCodeAndExpDateFromWareHouse(indent.getToWarehouse().getId(),
                            cmd.getBarCode(), cmd.getPeriod());
                    if (null == toCmd) {// 仓库没有同批商品时
                        Commodity newCmd= new Commodity();
                        BeanUtils.copyProperties(cmd, newCmd);
                        
                        newCmd.setId(null);
                        newCmd.setIndent(null);
                        newCmd.setWarehouse(indent.getToWarehouse());
                        //newCmd.setShop(null);
                        newCmd.setCommodityStatus(CommodityStatus.SALEABLE);
                        
                        commodityService.save(newCmd);
                        
                        fromCmd = commodityService.findByBarCodeAndExpDateFromShop(indent.getFromShop().getId(), cmd.getBarCode(), cmd.getPeriod());
                        num = fromCmd.getAmount();
                        fromCmd.setAmount(num - cmd.getAmount());// 来源商品减少数量

                    } else {// 仓库存在同批商品时
                        num = toCmd.getAmount();
                        toCmd.setAmount(num + cmd.getAmount());// 同批商品增加数量
                        fromCmd = commodityService.findByBarCodeAndExpDateFromShop(indent.getFromShop().getId(), cmd.getBarCode(), cmd.getPeriod());
                        num = fromCmd.getAmount();
                        fromCmd.setAmount(num - cmd.getAmount());// 来源商品减少数量
                       
                    }
                } 
                
                else 
                {// 仓库运输到超市时
                    toCmd = commodityService.findByBarCodeAndExpDateFromShop(indent.getToShop().getId(),
                            cmd.getBarCode(), cmd.getPeriod());
                    if (null == toCmd) {// 超市没有同批商品时
                        Commodity newCmd= new Commodity();
                        BeanUtils.copyProperties(cmd, newCmd);
                        
                        newCmd.setId(null);
                        newCmd.setIndent(null);
                        //newCmd.setWarehouse(indent.getToWarehouse());
                        newCmd.setShop(indent.getToShop());
                        newCmd.setCommodityStatus(CommodityStatus.SALEABLE);
                        
                        commodityService.save(newCmd);
                        
                        fromCmd = commodityService.findByBarCodeAndExpDateFromWareHouse(indent.getFromWarehouse().getId(), cmd.getBarCode(), cmd.getPeriod());
                        num = fromCmd.getAmount();
                        fromCmd.setAmount(num - cmd.getAmount());// 来源商品减少数量

                    } else {// 超市存在同批商品时
                        num = toCmd.getAmount();
                        toCmd.setAmount(num + cmd.getAmount());// 同批商品增加数量
                        fromCmd = commodityService.findByBarCodeAndExpDateFromWareHouse(indent.getFromWarehouse().getId(), cmd.getBarCode(), cmd.getPeriod());
                        num = fromCmd.getAmount();
                        fromCmd.setAmount(num - cmd.getAmount());// 来源商品减少数量
                    }
                }
            }
            indent.setIndentStatus(IndentStatus.FINISHED);
        } else {
            indent.setIndentStatus(IndentStatus.ROUND_GET);
        }
        indent.setGoodsCheckingReason(delegateTask.getVariable("goodsCheckingReason").toString());
    }
}
