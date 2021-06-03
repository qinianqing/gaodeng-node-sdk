/*
 * @Descripttion: 
 * @version: v1.0.0
 * @Author: nianqing
 * @Date: 2021-06-02 14:58:12
 */
const sdk = require("./index");
const goldenService = new sdk({ appKey: "7dc55c6fce2b5f2e6a24", appSecret: 'fa181c90d8b28d570fed71093f929e36' });


const params = {
    "seller_name": "开发平台外部专测", //销方名称
    "seller_taxpayer_num": "140301195503104110", //销方纳税人识别号,91410105MA3X5ANA56
    "seller_address": "郑州市金水区金水路288号曼哈顿商业广场F区二层F201-2号", // 销方地址
    "seller_tel": "0371-86175777", // 销方电话
    "seller_bank_name": "中信银行郑州花园路支行", //销方银行名称
    "seller_bank_account": "8111101013700153348", // 销方银行账号
    "title_type": 2, //抬头类型：1：个人、政府事业单位；2：企业
    "buyer_title": "巴奴毛肚火锅有限公司", // 购方名称
    "buyer_taxpayer_num": "91410105MA3X5ANA56",// 购方纳税人识别号,140301195503104110
    "buyer_address": "海南省老城高新技术产业示范区海南生态软件园", // 购方地址
    "buyer_bank_name": "中国工商银行",// 购方银行名称
    "buyer_bank_account": "62128124020000333990", //购方银行账号
    "buyer_phone": "0755-86888888", // 购方电话
    "buyer_email": "siasplus@163.com", // 收票人邮箱,
    "taker_phone": "15538066165", // 收票人手机号,
    "drawer": "齐总", //开票人姓名（票面信息）：如果填入则根据填入信息填入票面，如果不填入，则默认读取商户平台销方企业默认开票人填入
    "payee": "天总",//  收款人姓名（票面信息）：如果填入则根据填入信息填入票面，如果不填入，则默认读取商户平台销方企业默认收款人填入
    "checker": "殷总", // 复核人姓名（票面信息）：如果填入则根据填入信息填入票面，如果不填入，则默认读取商户平台销方企业默认复核人填入
    "order_id": "banu_904242006002627690", // 商户订单号：开发者接入方业务订单唯一标识
    "invoice_type_code": "026", //开具发票类型：默认为026
    "callback_url": "https://ideas-beta.banu.cn/test",//发票结果回传地址：接收平台推送的开票结果消息地址，可参见【开票结果异步通知】
    "amount_has_tax": "11.00", // 含税总金额【单位：元（精确到小数点后2位）】
    "tax_amount": "2.00",//总税额【单位：元（精确到小数点后2位）】
    "amount_without_tax": "9.00", //不含税总金额【单位：元（精确到小数点后2位）】
    "terminal_code": "499000138477", //盘号,
    "items": [
        {
            "name": "精品毛肚", //商品名称
            "tax_rate": "0.10", // 商品税率， 参考链接：https://download-1251506165.cos.ap-shanghai.myqcloud.com/gaodengyunwenjian/%E7%A8%8E%E6%94%B6%E5%88%86%E7%B1%BB%E7%BC%96%E7%A0%81V35.0.xlsx
            "models": "XYZ", // 商品规格
            "unit": "盘", // 商品单位
            "total_price": "86.44", //商品不含税金额 = 商品含税金额 / (1+税率)【单位：元（精确到小数点后2位）】
            "price": "17.288", //商品不含税单价 = 商品不含税金额 / 数量【单位：元，精确到8位小数；传items.total时必填】
            "tax_amount": "8.64", // 商品税额 = 商品不含税金额 * 税率【单位：元（精确到小数点后2位）】
            "total": "5", //20	商品数量：精确到8位，传items.price时必填)
            "tax_code": "1020401040000000000", //税收商品分类编码，参考链接: https://download-1251506165.cos.ap-shanghai.myqcloud.com/gaodengyunwenjian/%E7%A8%8E%E6%94%B6%E5%88%86%E7%B1%BB%E7%BC%96%E7%A0%81V35.0.xlsx
            "discount": "0", // 含税折扣总金额：金额必须是负数【单位：元（精确到小数点后2位）】
            "tax_type": "1" // 税收商品类别：指商品在商品编码中的分类名称
        }
    ]
}

//  开票
// goldenService.request("/tax-api/invoice/blue/v1", { post: params }).then(res =>{
//    console.log(res)
// })

const getInvoiceParams = {
    "seller_taxpayer_num": "140301195503104110",
    "order_sn": "6806056667839510672"
}

//查询开票结果
goldenService.request("/tax-api/invoice/query/v1", { post: getInvoiceParams }).then(res => {
    console.log(res)
})