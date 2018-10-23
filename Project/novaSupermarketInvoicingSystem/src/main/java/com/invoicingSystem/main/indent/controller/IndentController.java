package com.invoicingSystem.main.indent.controller;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.HttpRequest;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.invoicingSystem.main.activiti.util.WorkflowVariable;
import com.invoicingSystem.main.commodity.domain.Commodity;
import com.invoicingSystem.main.commodity.service.ICommodityService;
import com.invoicingSystem.main.commodity.util.CommodityStatus;
import com.invoicingSystem.main.common.beans.BeanUtils;
import com.invoicingSystem.main.common.web.ExtAjaxResponse;
import com.invoicingSystem.main.common.web.ExtjsPageRequest;
import com.invoicingSystem.main.common.web.SessionUtil;
import com.invoicingSystem.main.indent.domain.Indent;
import com.invoicingSystem.main.indent.domain.IndentDTO;
import com.invoicingSystem.main.indent.domain.IndentDTO2;
import com.invoicingSystem.main.indent.domain.IndentQueryDTO;
import com.invoicingSystem.main.indent.service.IIndentService;
import com.invoicingSystem.main.indent.util.GenerateRandIndentNum;
import com.invoicingSystem.main.indent.util.IndentStatus;
import com.invoicingSystem.main.indent.util.IndentType;
import com.invoicingSystem.main.shop.domain.Shop;
import com.invoicingSystem.main.shop.service.IShopService;
import com.invoicingSystem.main.user.domain.User;
import com.invoicingSystem.main.user.util.*;
import com.invoicingSystem.main.util.LocationUtils;
import com.invoicingSystem.main.warehouse.domain.Warehouse;
import com.invoicingSystem.main.warehouse.service.IWarehouseService;
import com.invoicingSystem.main.warehouse.service.WarehouseService;

import jodd.util.StringUtil;

import com.invoicingSystem.main.user.service.IUserService;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;;

/**
 * @author Lzy
 * @version 创建时间：2018年9月26日 上午9:01:07 
 * 类说明 : 流程控制层
 */

/**
 * @author wuzihao 创建完善
 */
@RestController
@RequestMapping(value = "/indent")
public class IndentController {

    @Autowired
    private IIndentService indentService;
    @Autowired
    private IUserService userService;
    @Autowired
    private IShopService shopService;
    @Autowired
    private ICommodityService commodityService;
    @Autowired
    private IWarehouseService warehouseService;

    // 新建采购单
    @PostMapping
    public @ResponseBody ExtAjaxResponse save(@RequestBody IndentDTO indentDTO, HttpServletRequest request) {
        try {
            System.out.println(indentDTO);

            Indent indent = new Indent();

            String userId = request.getSession().getAttribute("userId").toString();
            User user = userService.findById(Long.parseLong(userId));
            indent.setCommoditiesJSON(indentDTO.getCommoditiesJSON());
            indent.setNote(indentDTO.getNote());
            indent.setCost(indentDTO.getCost());

            // 判断进货点是门店还是仓库
            if (indentDTO.getToWarehouseId() != null)
                indent.setToWarehouse(warehouseService.findById(Long.parseLong(indentDTO.getToWarehouseId())));
            else
                indent.setToWarehouse(null);
            JSONArray commoditiesJSONObject = JSONArray.fromObject(indentDTO.getCommoditiesJSON());

            if (commoditiesJSONObject.size() > 0) {
                for (int i = 0; i < commoditiesJSONObject.size(); i++) {
                    // 遍历 jsonarray 数组，把每一个对象转成 json 对象
                    JSONObject job = commoditiesJSONObject.getJSONObject(i);
                    // 得到 每个对象中的属性值
                    String name = job.get("name").toString();
                    int amount = Integer.parseInt(job.get("num").toString());
                    double cost = Integer.parseInt(job.get("cost").toString());
                    double price = Integer.parseInt(job.get("price").toString());
                    Commodity commodity = new Commodity();
                    commodity.setName(name);
                    commodity.setAmount(amount);
                    commodity.setCost(cost);
                    commodity.setPrice(price);
                    commodity.setIndent(indent);
                    commodityService.save(commodity);
                    indent.getCommodities().add(commodity);
                }
            }

            indent.setCreator(user);

            indent.setCreateDate(new Date());
            indent.setIndentNum(GenerateRandIndentNum.GenerateNum());
            indent.setIndentType(IndentType.PURCHASE);
            indent.setIndentStatus(IndentStatus.INIT);

            indentService.save(indent);
            return new ExtAjaxResponse(true, "操作成功!");
        } catch (Exception e) {
            e.printStackTrace();
            return new ExtAjaxResponse(false, "操作失败!");
        }
    }

    // 采购单修改
    @PutMapping(value = "{id}")
    public @ResponseBody ExtAjaxResponse update(@PathVariable("id") Long id, @RequestBody IndentDTO indentDTO,
            HttpServletRequest request) {
        try {

            Indent indent = indentService.findById(id);

            String userId = request.getSession().getAttribute("userId").toString();
            User user = userService.findById(Long.parseLong(userId));

            // 修改前先取出
            String oldCommoditiesJSON = indent.getCommoditiesJSON();

            if (!StringUtil.isEmpty(indentDTO.getPlaceType())) {
                if (indentDTO.getPlaceType().equals("SHOP")) {
                    indent.setToWarehouse(null);
                    indent.setToShop(shopService.findById(Long.parseLong(indentDTO.getToShopId())));

                } else {
                    indent.setToShop(null);
                    indent.setToWarehouse(warehouseService.findById(Long.parseLong(indentDTO.getToWarehouseId())));
                }
            }
            if (indentDTO.getNote() != null)
                indent.setNote(indentDTO.getNote());
            if (indentDTO.getCost() != null)
                indent.setCost(indentDTO.getCost());

            // 商品表有变动
            if (indentDTO.getCommoditiesJSON() != null) {
                JSONArray commoditiesJSONObject = JSONArray.fromObject(indentDTO.getCommoditiesJSON());
                JSONArray oldCommoditiesJSONObject = JSONArray.fromObject(oldCommoditiesJSON);

                if (commoditiesJSONObject.size() > 0) {
                    for (int i = 0; i < commoditiesJSONObject.size(); i++) {
                        // 遍历 jsonarray 数组，把每一个对象转成 json 对象
                        JSONObject job = commoditiesJSONObject.getJSONObject(i);

                        // 得到修改后的商品id
                        String commodityName = job.get("name").toString();

                        // -----------------------存在-----------------------
                        if (commodityService.findByIndentIdAndCommodityName(id, commodityName) != null) {
                            // 检测数量是否需要修改
                            Commodity oldCommodity = commodityService.findByIndentIdAndCommodityName(id, commodityName);
                            int oldAmount = oldCommodity.getAmount();
                            int amount = Integer.parseInt(job.get("num").toString());
                            if (oldAmount != amount) {
                                oldCommodity.setAmount(amount);
                                oldCommodity.setPrice(amount * oldCommodity.getCost());
                                commodityService.save(oldCommodity);

                            }
                        }
                        // -----------------------添加-----------------------
                        else {
                            int amount = Integer.parseInt(job.get("num").toString());
                            double cost = Integer.parseInt(job.get("cost").toString());
                            double price = Integer.parseInt(job.get("price").toString());
                            Commodity commodity = new Commodity();
                            commodity.setName(commodityName);
                            commodity.setAmount(amount);
                            commodity.setCost(cost);
                            commodity.setPrice(price);
                            commodity.setIndent(indent);
                            commodityService.save(commodity);
                            indent.getCommodities().add(commodity);
                        }
                    }
                }

                // -----------------------移除-----------------------
                boolean flag = true;// true表示要移除
                for (int i = 0; i < oldCommoditiesJSONObject.size(); i++) {
                    JSONObject oldJob = oldCommoditiesJSONObject.getJSONObject(i);
                    String oldJobName = oldJob.get("name").toString();
                    for (int j = 0; j < commoditiesJSONObject.size(); j++) {
                        JSONObject job = commoditiesJSONObject.getJSONObject(j);
                        if (job.get("name").toString().equals(oldJobName)) {
                            flag = false;
                            break;
                        }
                    }
                    if (flag) {
                        Commodity commodity = commodityService.findByIndentIdAndCommodityName(id,
                                oldJob.getString("name").toString());
                        indent.getCommodities().remove(commodity);
                        commodity.setIndent(null);
                        // commodityService.delete();
                    }
                }
            }

            indent.setCreator(user);
            if (indentDTO.getCommoditiesJSON() != null)
                indent.setCommoditiesJSON(indentDTO.getCommoditiesJSON());
            // indent.setCreateDate(new Date());
            // indent.setIndentNum(GenerateRandIndentNum.GenerateNum());
            // indent.setIndentType(IndentType.PURCHASE);
            // indent.setIndentStatus(IndentStatus.INIT);
            indentService.save(indent);

            return new ExtAjaxResponse(true, "操作成功!");
        } catch (Exception e) {
            e.printStackTrace();
            return new ExtAjaxResponse(false, "操作失败!");
        }
    }

    // 删除单条Indent
    @DeleteMapping(value = "{id}")
    public @ResponseBody ExtAjaxResponse delete(@PathVariable("id") Long id) {
        try {
            Indent entity = indentService.findById(id);
            if (entity != null) {

                // 先删商品
                commodityService.deleteAll(entity.getCommodities());

                entity.setCommodities(null);
                indentService.delete(id);
            }
            return new ExtAjaxResponse(true, "操作成功!");
        } catch (Exception e) {
            e.printStackTrace();
            return new ExtAjaxResponse(false, "操作失败!");
        }
    }

    @GetMapping
    public Page<Indent> findIndentByCreatorId(IndentQueryDTO indentQueryDTO, HttpServletRequest request,
            ExtjsPageRequest pageable) {
        Page<Indent> page;
        String userId = request.getSession().getAttribute("userId").toString();
        User user = userService.findById(Long.parseLong(userId));
        if (user != null) {
            indentQueryDTO.setCreator(user);
            // indentQueryDTO.setIndentType(IndentType.PURCHASE);//SessionUtil.getUserName(session)

            page = indentService.findAll(IndentQueryDTO.getWhereClause(indentQueryDTO), pageable.getPageable());

        } else {
            page = new PageImpl<Indent>(new ArrayList<Indent>(), pageable.getPageable(), 0);
        }
        return page;
    }

    @PostMapping("/deletes")
    public ExtAjaxResponse deleteRows(@RequestParam(name = "ids") Long[] ids) {
        try {
            if (ids != null) {
                indentService.deleteAll(ids);
            }
            return new ExtAjaxResponse(true, "批量删除成功！");
        } catch (Exception e) {
            return new ExtAjaxResponse(true, "批量删除失败！");
        }
    }

    // 新建调货单
    @PostMapping(value = "/save")
    public @ResponseBody ExtAjaxResponse transferSave(@RequestParam(name = "cost") double cost,
            @RequestParam(name = "note") String note, @RequestParam(name = "commoditiesJSON") String json,
            @RequestParam(name = "indentType") String indentType, @RequestParam(name = "fromPlace") Long fromId,
            @RequestParam(name = "toPlace") Long toId, HttpServletRequest request) {
        try {

            Indent indent = new Indent();
            String userId = request.getSession().getAttribute("userId").toString();
            User user = userService.findById(Long.parseLong(userId));

            indent.setCreator(user);
            indent.setCreateDate(new Date());
            indent.setIndentNum(GenerateRandIndentNum.GenerateNum());
            indent.setIndentStatus(IndentStatus.INIT);

            indent.setCommoditiesJSON(json);
            indent.setNote(note);
            indent.setCost(cost);
            indent.setKeeper(warehouseService.findById(fromId).getKeeper());

            if (IndentType.TRANSPORT.toString().equals(indentType)) {
                indent.setIndentType(IndentType.TRANSPORT);// 为内部调货货单
                indent.setFromWarehouse(warehouseService.findById(fromId));
                indent.setToWarehouse(warehouseService.findById(toId));
            } else if (IndentType.TO_SHOP.toString().equals(indentType)) {
                indent.setIndentType(IndentType.TO_SHOP);// 为超市进货货单
                indent.setFromWarehouse(warehouseService.findById(fromId));
                indent.setToShop(shopService.findById(toId));
            } else {
                indent.setIndentType(IndentType.RETREAT);// 为残缺品处理货单
                indent.setToWarehouse(warehouseService.findById(fromId));
                indent.setFromShop(shopService.findById(toId));
            }

            Commodity getCmd;
            JSONObject job;
            JSONArray commoditiesJSONObject = JSONArray.fromObject(json);
            if (commoditiesJSONObject.size() > 0) {
                for (int i = 0; i < commoditiesJSONObject.size(); i++) {
                    // 遍历 jsonArray 数组，把每一个对象转成 json 对象
                    job = commoditiesJSONObject.getJSONObject(i);
                    // 得到 每个对象中的属性值
                    Long cmdId = Long.parseLong(job.get("id").toString());
                    int amount = Integer.parseInt(job.get("amount").toString());
                    getCmd = commodityService.findById(cmdId);
                    Commodity cmd = new Commodity();
                    BeanUtils.copyProperties(getCmd, cmd);

                    cmd.setAmount(amount);
                    cmd.setId(null);
                    cmd.setWarehouse(null);
                    cmd.setShop(null);
                    cmd.setCommodityStatus(CommodityStatus.UNSALEABLE);
                    cmd.setIndent(indent);
                    commodityService.save(cmd);
                    indent.getCommodities().add(cmd);
                }
            }
            indentService.save(indent);

            return new ExtAjaxResponse(true, "操作成功!");
        } catch (Exception e) {
            e.printStackTrace();
            return new ExtAjaxResponse(false, "操作失败!");
        }
    }

    // 订单表填充
    @RequestMapping(value = "/fillUser")
    public @ResponseBody ExtAjaxResponse fillUserMsg(HttpServletRequest request) {
        try {
            Map<String, String> map = new HashMap<String, String>();
            String userId = request.getSession().getAttribute("userId").toString();
            User user = userService.findById(Long.parseLong(userId));
            String userName = user.getName();
            String userPlace, placeId, placeType;
            if (user.getUserType() == UserType.STORE_MANAGER) {
                userPlace = user.getShop().getName();
                placeId = user.getShop().getId().toString();
                placeType = "SHOP";
            } else if (user.getUserType() == UserType.KEEPER) {
                userPlace = user.getWarehouse().getName();
                placeId = user.getWarehouse().getId().toString();
                placeType = "WARE";
            } else {
                userPlace = "bucunzai";
                placeId = "23333";
                placeType = "NONE";
            }
            map.put("userName", userName);
            map.put("userPlace", userPlace);
            map.put("placeId", placeId);
            map.put("placeType", placeType);
            System.out.println(userName + "," + userPlace + "," + placeId + "," + placeType);
            return new ExtAjaxResponse(true, map);
        } catch (Exception e) {
            return new ExtAjaxResponse(false, "填充用户信息失败!");
        }
    }

    // 计算运输成本.
    @RequestMapping(value = "/calculateCost")
    public @ResponseBody ExtAjaxResponse calculateCost(@RequestParam(name = "cCost") double cCost,
            @RequestParam(name = "fromPlace") Long fp, @RequestParam(name = "toPlace") Long tp,
            @RequestParam(name = "toPlaceType") String tpt) {
        try {
            Map<String, String> map = new HashMap<String, String>();
            double transferCost = cCost;
            Shop shop = null;
            Warehouse warehouse1 = null;
            Warehouse warehouse2 = null;
            // System.out.println(cCost+","+fp+","+tp+","+tpt);
            if (tpt.equals("WARE")) {
                warehouse1 = warehouseService.findById(fp);
                warehouse2 = warehouseService.findById(tp);
                transferCost += LocationUtils.getDistance(warehouse1.getLocation().getLatitude(),
                        warehouse1.getLocation().getLongitude(), warehouse2.getLocation().getLatitude(),
                        warehouse2.getLocation().getLongitude()) * 3;
            } else {
                shop = shopService.findById(tp);
                warehouse1 = warehouseService.findById(fp);
                transferCost += LocationUtils.getDistance(warehouse1.getLocation().getLatitude(),
                        warehouse1.getLocation().getLongitude(), shop.getLocation().getLatitude(),
                        shop.getLocation().getLongitude()) * 3;
            }
            // 四舍五入 小数点保留后两位
            double value = new BigDecimal(transferCost).setScale(2, BigDecimal.ROUND_HALF_UP).doubleValue();
            String tfc = "" + value;
            // System.out.println(tfc);
            map.put("TransferCost", tfc);
            return new ExtAjaxResponse(true, map);
        } catch (Exception e) {
            return new ExtAjaxResponse(false, "计算失败!原因:" + e);
        }
    }

    @RequestMapping(value = "/findCommoditiesJSON")
    public @ResponseBody Page<Commodity> findAddedCommodities(HttpServletRequest request, ExtjsPageRequest pageable) {
        Page<Commodity> page;

        // Map<String,String> map=new HashMap<String, String>();
        if (!StringUtil.isEmpty(request.getParameter("indentId"))) {
            Long indentId = Long.parseLong(request.getParameter("indentId"));
            page = commodityService.findCommoditiesByIndentId(indentId, pageable.getPageable());
        } else {
            page = null;
        }
        return page;
    }

    /*-------------------------------------流程引擎web层------------------------------------------*/

    /**
     * 启动流程
     * 
     * @param indentId 货单信息Id
     * @param session  通过会话获取登录用户(申请人)
     * @return
     */
    @RequestMapping(value = "/start")
    public @ResponseBody ExtAjaxResponse start(@RequestParam(name = "id") Long indentId,  HttpServletRequest request) {
        try {
        	User user = userService.findById((Long)request.getSession().getAttribute("userId"));
            Indent indent = indentService.findById(indentId);
            String userName = user.getName();
            
           
            Map<String, Object> variables = new HashMap<String, Object>();
            // 此处编写流程图需要的variables
            
            variables.put("applicantId", userName); // 请求申请方
            
            if (indent.getIndentType() == IndentType.PURCHASE) {// 判断货单为采购订单
                
                Warehouse toWarehouse = indent.getToWarehouse();
                User keeper = toWarehouse.getKeeper();
                String keeperName = keeper.getName();

            	variables.put("manager", "SUPER_MANAGER");
                variables.put("applyId", userName);
                variables.put("purchaser", userName);
                variables.put("KEEPER", keeperName);
                indentService.startWorkflow(userName,"purchase",indentId, variables);

            } else {// 判断货单为调货流程
                variables.put("receiverId", indent.getKeeper().getName()); // 请求接受方
                if (indent.getIndentType() == IndentType.RETREAT) {// 判断调货单是否为处理残旧品
                    variables.put("applyId", indent.getKeeper().getName());// 处理残旧品为接受端接收.
                    variables.put("goodFromId", userName);// 处理残旧品为申请端提供.
                } else {
                    variables.put("applyId", userName);// 处理其余调货为申请端接收.
                    variables.put("goodFromId", indent.getKeeper().getName());// 处理其余调货为接受端发送.
                }
                indentService.startWorkflow(userName, "transfer", indentId, variables);
            }
            return new ExtAjaxResponse(true, "操作成功!");
        } catch (Exception e) {
            e.printStackTrace();
            return new ExtAjaxResponse(false, "操作失败!");
        }
    }

    /**
     * 查询待处理流程任务
     * 
     * @param pageable 分页对象
     * @param session  通过会话获取登录用户(申请人)
     * @return
     */
    @RequestMapping(value = "/tasks")
    public @ResponseBody Page<IndentDTO2> findTodoTasks(HttpServletRequest request, ExtjsPageRequest pageable) {
        Page<IndentDTO2> page = new PageImpl<IndentDTO2>(new ArrayList<IndentDTO2>(), pageable.getPageable(), 0);
        try {
        	User user = userService.findById((Long)request.getSession().getAttribute("userId"));
            page = indentService.findTodoTasks(user.getName(), pageable.getPageable());
        } catch (Exception e) {
            e.printStackTrace();
        }

        return page;
    }

    /**
     * 签收任务
     */
    @RequestMapping(value = "claim/{id}")
    public @ResponseBody ExtAjaxResponse claim(@PathVariable("id") String taskId,@RequestParam(name = "indentId") Long indentId, HttpServletRequest request) {
        try {
        	User user = userService.findById((Long)request.getSession().getAttribute("userId"));
        	Indent indent = indentService.findById(indentId);
        	indent.setManager(user);
            indentService.claim(taskId,user.getName());
            return new ExtAjaxResponse(true, "任务签收成功!");
        } catch (Exception e) {
            e.printStackTrace();
            return new ExtAjaxResponse(false, "任务签收失败!");
        }
    }

    /**
     * 完成任务
     * 
     * @param id
     * @return
     */
    @RequestMapping(value = "complete/{id}")
    public @ResponseBody ExtAjaxResponse complete(@PathVariable("id") String taskId, WorkflowVariable var) {
        try {
            Map<String, Object> variables = var.getVariableMap();
            indentService.complete(taskId, variables);
            return new ExtAjaxResponse(true, "任务签收成功!");
        } catch (Exception e) {
            e.printStackTrace();
            return new ExtAjaxResponse(false, "任务签收失败!");
        }
    }

}
