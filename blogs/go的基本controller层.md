---
title: beego框架里一些常用的东西封装
date: 2019-07-17 16:30:00
categories: tips
tags:
  - golang
  - beego


---

# beego框架里controller层的一些常用封装

(其实没软用)

<!--more-->


## beego框架里controller层的一些常用封装
```
package controllers

import (
    "../models"
    "crypto/md5"
    "encoding/json"
    "fmt"
    "github.com/astaxie/beego"
    "io/ioutil"
    "log"
    "net"
    "os"
    "path/filepath"
    "strconv"
    "strings"
    "time"
)

type wycontroller struct {
    beego.Controller
}

//获得返回结果的JSON字符串
type st_json_normal_data struct {
    Status int         `json:"status"`
    Msg    string      `json:"msg"`
    Data   interface{} `json:"datalist"`
}

var (
    ImgExt = []string{"jpg", "gif", "png", "jpeg", "bmp", ""}
)

//获得当前时间
func (this *ywcontroller) GetDateTime() string {
    return time.Now().Format("2006-01-02 15:04:05")
}

// 转换时间字符串格式
// 时间格式：2006-01-02 15:04:05
// timestr: 需要转换的日期
// oldFormat： 转换前的格式
// newFormat： 转换后的格式
func (this *ywcontroller) FormateDateStr(timestr string, oldFormat string, newFormat string) (string, error) {
    formatTime, err := time.Parse(oldFormat, timestr)
    return formatTime.Format(newFormat), err
}

//获得传入的参数，转换为int
func (this *ywcontroller) GetParamAsInt(key string) int {
    num, err := strconv.Atoi(this.GetString(key))
    if err != nil {
        return 0
    }
    return num
}

//获得当前传入的string参数
func (this *ywcontroller) GetParamAsString(key string) string {
    return this.GetString(key)
}

//获得当前传入的参数，防止sql注入，替换一些字符
func (this *ywcontroller) GetParamAsSqlString(key string) string {
    val := strings.Replace(this.GetString(key), "'", "''", -1)
    return val
}

/*
返回json字符串
输入 status 返回状态, msg 返回信息, data 数据
输出 转换成json字符串 {Status: status, Msg: msg, Data: ""}
*/
func (this *ywcontroller) jsonString(status int, msg string, data interface{}) string {
    s := &st_json_normal_data{Status: status, Msg: msg}
    if data == nil {
        s.Data = ""
    } else {
        s.Data = data
    }
    bt, _ := json.Marshal(s)
    return string(bt)
}

/*
输出一个对象
*/
func (this *ywcontroller) ReturnJsonString(status int, msg string, data interface{}) {
    this.Ctx.WriteString(this.jsonString(status, msg, data))
}

//判断是不是数
func (this *ywcontroller) Is_Number(num string) bool {
    if _, err := strconv.Atoi(num); err != nil {
        return false
    }
    return true
}

//转换为数字
func (this *ywcontroller) toInt(val interface{}) int {
    num, err := strconv.Atoi(fmt.Sprint(val))
    if err != nil {
        return 0
    }
    return num
}

//获取系统路径
func (this *ywcontroller) GetExePath() string {
    exePath := filepath.Dir(os.Args[0])
    if !filepath.IsAbs(exePath) {
        exePath, _ = filepath.Abs(exePath)
    }
    return exePath
}

/*
输出一个对象
*/
func (this *ywcontroller) ReturnString(args ...interface{}) {
    //任意数据类型转成string
    this.Ctx.WriteString(fmt.Sprint(args...))
}

func (this *ywcontroller) SetUserSession(data map[string]string) {
    for k, v := range data {
        this.SetSession(k, v)
    }
}

//从session中获取某一个信息
func (this *ywcontroller) GetUserSession(key string) (string, bool) {
    data, ok := this.Ctx.Input.Session(key).(string)
    if !ok {
        return "", false
    }
    return data, true
}

//删除所有session
func (this *ywcontroller) DelUserSession() {
    this.DelSession("id")
    this.DelSession("shopid")
    this.DelSession("name")
    // 把要删的session全放在这里删掉

}

//MD5值
func (this *ywcontroller) md5Value(s string) string {
    h := md5.New()
    h.Write([]byte(s))
    return fmt.Sprintf("%x", h.Sum(nil))
}

//sws的变种MD5
func (this *ywcontroller) SWSMD5(str string) string {
    str = this.md5Value(str)
    if len(str) > 8 {
        str = str[:3] + "a" + str[3:]
        str = str[:5] + "z" + str[5:]
    }
    return str
}

//判断是不是图片后缀,是返回false,不是返回true
func (this *ywcontroller) IsImgExt(ext string) bool {

    for _, oneimg := range ImgExt {
        if strings.ToLower(ext) == oneimg {
            return false
        }
    }
    return true
}

//上传一张照片,返回照片路径
func (this *ywcontroller) UploadOneImg() {
    files := this.GetParamAsSqlString("file")
    file, fileheader, err := this.GetFile(files)
    if err != nil {
        this.ReturnString(this.jsonString(0, err.Error(), ""))
        return
    }
    defer func() {
        if file != nil {
            file.Close()
        }
    }()
    if fileheader.Size > 2000*1024 {
        this.ReturnJsonString(0, "图片大小不得超过2mb", "")
        return
    }
    filename := filepath.Base(fileheader.Filename)
    index := strings.LastIndex(filename, ".")
    ext := filename[index+1:]
    if this.IsImgExt(ext) {
        this.ReturnString(this.jsonString(0, "仅可上传jpg、gif、png文件", ""))
        return
    }
    //把文件保存到临时目录
    b, err := ioutil.ReadAll(file)
    if err != nil {
        log.Println(err)
        this.ReturnString(this.jsonString(0, "上传文件失败", ""))
        return
    }
    filepath := "./imgfile/" + fmt.Sprintf("%d.%s", time.Now().UnixNano(), ext)
    ioutil.WriteFile(filepath, b, 0x644)
    this.ReturnString(this.jsonString(1, "导入成功", strings.TrimLeft(filepath, ".")))
}

//判断文件夹是否存在
func isDirExists(path string) bool {
    fi, err := os.Stat(path)
    if err != nil {
        return os.IsExist(err)
    }
    return fi.IsDir()
}

//创建文件夹
func CreatePath(path string) {
    if isDirExists(path) {
        return
    }
    err := os.Mkdir(path, 0x644)
    if err != nil {
        log.Println(err)
    }
}

//判断是不是移动端访问 移动端访问返回true 非移动端访问返回false
func (this *ywcontroller) ismobile() bool {
    keywords := []string{"Android", "iPhone", "iPod", "iPad", "Windows Phone", "MQQBrowser"}
    for i := 0; i < len(keywords); i++ {
        if strings.Contains(this.Ctx.Request.UserAgent(), keywords[i]) {
            return true
        }
    }
    return false
}

/*
获取远程用户IP地址
输入 无
输出 IP地址
*/
func (this *ywcontroller) GetRemoteAddr() (string, string) {
    remote_addr := this.Ctx.Request.RemoteAddr
    if npos := strings.LastIndex(remote_addr, ":"); npos != -1 {
        return remote_addr[:npos], remote_addr[npos+1:]
    }
    return remote_addr, "0"
}

//判断IP是不是IPV4的IP地址
func (this *ywcontroller) IsIPV4(ip string) bool {
    return net.ParseIP(ip) != nil && net.ParseIP(ip).DefaultMask() != nil
}

```

## 上面的controller封装好之后以此为基础,建立新的controller层
```
package controllers

import (
    "fmt"
    "log"
    "time"
)

type ShopController struct {
    ywcontroller
}


func (this *ShopController) UpdateShopInfo() {
    //根据名称接收数据转为int
    //shopid := this.GetParamAsInt("shopid")

    //根据名称接收数据类型为string,这里有防止sql注入,下面的没有
    shopid := this.GetParamAsSqlString("shopid")

    //根据名称接收数据类型为string,没有防止sql注入,上面的有
    shopid := this.GetParamAsString("shopid")

    //获取session里的信息，比如登录
    shopid, ok := this.GetUserSession("shopid")
    if !ok{//做一些事,比如返回首页}

    //删除session
    //this.DelUserSession()

    //设置session
    //this.SetUserSession(map[string]string{"shopid": "1","id":"1","tel":"123"})

    //返回页面(可携带数据,借助模版语句起到修改页面的作用)
    this.Data["height"] = "100"
    this.TplName = "shopauditingsinfo.html"

    //返回字符串(这里是返回了分页查询结果的字符串)
    data, err := models.Querylist("select * from shopauditings", pageindex, pagesize)
    if err != nil {
        log.Println(err)
        this.ReturnJsonString(0, "获取店铺信息列表失败", "")
        return
    }
    bt, _ := json.Marshal(data)
    this.ReturnString(string(bt))

    //返回json字符串(状态值、消息字符串,数据),数据是interface{}
    //this.ReturnJsonString(0, "获取店铺信息列表失败", "")

}

上面用this.Data["height"] = "100"携带到页面的数据,可以用模版语句利用

js里面
if("{{.height}}" != ""){
    //执行一些代码
}

页面里
<input type="text" style="display:none" value="{{.height}}" >

页面或者js里进行比较(这里ne是不相等,eq是相等,之前有过一次用eq没效果,换成isEqual就行了)
{{if ne .height "1"}}
一些代码
{{else}}
一些代码
{{end}}
```


## beego框架里model层的连接数据库和一些查询方法封装
```
package models

import (
    "database/sql"
    "fmt"
    // 下面这个连接mysql的时候用
    _ "github.com/go-sql-driver/mysql"
    //下面这个连接oracle的时候用
    //_ "github.com/jzaikovs/ora"
    "io/ioutil"
    "log"
    "os"
    "path/filepath"
    "strconv"
    "strings"
    "time"
)

var (
    dbconn *sql.DB = nil
)

// 返回数据库可以直接查询
func GetConn() *sql.DB {
    return dbconn
}

//返回事务
func GetTx() (*sql.Tx, error) {
    return dbconn.Begin()
}

//打开数据库(顺便建表、初始化数据或者加入存储过程等)
//在main.go里面执行下面语句以执行
//err := models.Init()
//  if err != nil {
//      log.Panic(err.Error())
//  }
//  err = models.DBInit()
//  if err != nil {
//      log.Panic(err.Error())
//  }
func DBInit() error {
    // 这个是链接mysql
    //sql.Open(mysql,root:root@tcp(192.168.15.51:3306)/ecommerce)
    sqldb, err := sql.Open(GetConfig().DBType, GetConfig().DBSour)
    if err != nil {
        return fmt.Errorf("打开数据库失败：%s", err.Error())
    }
    // 这个是链接oracle (用户名/密码@//ip:端口/数据库名)
    // sqldb2, err := sql.Open("ora", "system/oracle@//172.16.18.96:1522/wlsi")
    // if err != nil {
    //  return fmt.Errorf("打开数据库失败：%s", err.Error())
    // }
    Dbconn2 = sqldb2
    dbconn = sqldb
    CreateTable()
    initData()
    return nil
}

//建表(在相应文件里放入文件,里面写对应的sql的语句,程序启动时候自动执行，可以建表或者自动增加存储过程)
func CreateTable() {
    dir := []string{"./table/table", "./table/drop", "./table/create"}
    for _, one := range dir {
        filepath.Walk(one, func(path string, fs os.FileInfo, err error) error {
            if !fs.IsDir() {
                b, err := ioutil.ReadFile(path)
                if err != nil {
                    log.Panic(err.Error())
                }
                _, err = dbconn.Exec(string(b))
                if err != nil {
                    log.Panic(err.Error())
                }
            }
            return nil
        })
    }
}

//初始化数据
func initData() {
    NotFindDoExec("select count(*) as num from config where `key`='password'",
        "insert into config(`key`,`value`) values('password','123456')")

    filepath.Walk("./datainit", func(path string, fs os.FileInfo, err error) error {
        if !fs.IsDir() {
            tableName := strings.Replace(fs.Name(), filepath.Ext(fs.Name()), "", 1)
            bSql, err := ioutil.ReadFile(path)
            if err != nil {
                log.Panic(err.Error())
            }
            num, err := Count("select count(*) as num from " + tableName)
            if err != nil {
                log.Panic(err.Error())
            }
            if num == 0 {
                sql := string(bSql)
                arrsql := strings.Split(sql, ";\r\n")
                for _, v := range arrsql {
                    err := Exec(v)
                    if err != nil {
                        log.Panic(err)
                    }
                }
            }
        }
        return nil
    })
}

//方便查询，目前返回[]map[string]string内容
func Query(sql string) ([]map[string]string, error) {
    rows, err := dbconn.Query(sql)
    if err != nil {
        log.Println(sql, err.Error())
        return nil, err
    }
    return RowsToMapList(rows)
}

func Exec(sql string) error {
    _, err := dbconn.Exec(sql)
    if err != nil {
        log.Println(sql, err.Error())
    }
    return err
}

func QueryTableList(query string, pageindex int, pagesize int) (map[string]interface{}, error) {
    if pagesize <= 0 {
        pagesize = 10
    }
    if pageindex <= 0 {
        pageindex = 1
    }
    totalCount := 0

    table_map := make(map[string]interface{})
    table_data := make([]map[string]interface{}, 0)
    rows, err := dbconn.Query(query)
    if err != nil {
        return table_map, err
    }
    fields, err := rows.Columns()
    if err != nil {
        return table_map, err
    }
    fields_size := len(fields)
    //移到开始位置
    n := time.Now()
    for totalCount < (pageindex-1)*pagesize && rows.Next() {
        totalCount++
    }
    log.Println(time.Now().Sub(n))
    hxindex := (pageindex - 1) * pagesize
    //取值
    n = time.Now()
    for rows.Next() {
        addmap := make(map[string]interface{})
        hxindex++
        totalCount++
        if len(table_data) >= pagesize {
            break
        }
        values := make([]sql.NullString, fields_size)
        scanArgs := make([]interface{}, fields_size)
        for i := 0; i < fields_size; i++ {
            scanArgs[i] = &values[i]
        }
        err = rows.Scan(scanArgs...)
        dataMap, err := rowToMap(values, fields)
        if err != nil {
            return table_map, err
        }
        dataMap["xhid"] = fmt.Sprint(hxindex)
        addmap["id"] = fmt.Sprint(hxindex)
        addmap["cell"] = dataMap
        table_data = append(table_data, addmap)
    }
    log.Println(time.Now().Sub(n))
    n = time.Now()
    for rows.Next() {
        totalCount++
    }

    log.Println(time.Now().Sub(n))
    totalPage := 0
    if totalCount%pagesize == 0 {
        totalPage = totalCount / pagesize
    } else {
        totalPage = totalCount/pagesize + 1
    }
    table_map["pageIndex"] = pageindex
    table_map["totalCount"] = totalCount
    table_map["pageSize"] = pagesize
    table_map["totalPage"] = totalPage
    table_map["data"] = table_data
    return table_map, nil
}

//查询结果集row 的[]string转成map
func rowToMap(rows []sql.NullString, fields []string) (map[string]string, error) {
    rstMap := make(map[string]string)
    if len(rows) != len(fields) {
        return rstMap, fmt.Errorf("数据库查询结果集：rows与fields的数量不相等")
    }
    for k, v := range rows {
        rstMap[fields[k]] = v.String
    }
    return rstMap, nil
}

//数据库查询rows转换成maplist类型
func RowsToMapList(rows *sql.Rows) ([]map[string]string, error) {
    var maplist []map[string]string = make([]map[string]string, 0)
    cols, err := rows.Columns()
    if err != nil {
        return nil, err
    }
    colsize := len(cols)
    for rows.Next() {
        values := make([]sql.NullString, colsize)
        scanArgs := make([]interface{}, colsize)
        for i := 0; i < colsize; i++ {
            scanArgs[i] = &values[i]
        }
        err = rows.Scan(scanArgs...)
        oneMap := make(map[string]string)
        for k, v := range values {
            oneMap[cols[k]] = v.String
        }
        maplist = append(maplist, oneMap)
    }
    return maplist, nil
}

func Find(sql string) (map[string]string, error) {
    maplist, err := Query(sql)
    if err != nil {
        log.Println("error:", err.Error(), sql)
        return nil, fmt.Errorf("请稍后")
    }
    if len(maplist) == 0 {
        return nil, nil
    }
    return maplist[0], nil
}

// 用sql语句查数据,自己count(1)起个别名num,返回num
//比如NotFindDoExec("select count(*) as num from config where `key`='password'","insert into config(`key`,`value`) values('password','123456')")
func Count(sql string) (int, error) {
    map_data, err := Find(sql)
    if err != nil {
        return 0, err
    }
    num, err := strconv.Atoi(map_data["num"])
    if err != nil {
        return 0, err
    }
    return num, nil
}

// count里面查出来的num如果为0,再去执行
func NotFindDoExec(query, exec string) {
    num, err := Count(query)
    if err != nil {
        log.Panic(err.Error())
    }
    if num == 0 {
        _, err = GetConn().Exec(exec)
        if err != nil {
            log.Panic(err.Error())
        }
    }
}

```

## beego框架里model层的读取config.xml里的一些配置项
```
package models

import (
    "encoding/xml"
    "io/ioutil"
)

var (
    config *Config = nil
)

type Config struct {
    DBType        string `xml:"dbtype"`
    DBSour        string `xml:"dbsour"`
    Product       string `xml:"product"`
    Lv            int    `xml:"lv"`
    EmailAddr     string `xml:"emailaddr"`
    Authorization string `xml:"authorization"`
    NiceName      string `xml:"nicename"`
}

func GetConfig() *Config {
    return config
    // 可以在其他models里用GetConfig()这个方法获取读取结果，再从结果里拿具体的配置
    //GetConfig().DBType
    //GetConfig().DBSour
}

//在main.go里面执行下面语句以执行各个models层里的Init()
//err := models.Init()
//  if err != nil {
//      log.Panic(err.Error())
//  }
//  err = models.DBInit()
//  if err != nil {
//      log.Panic(err.Error())
//  }
func Init() error {
    b_config, err := ioutil.ReadFile("./conf/config.xml")
    if err != nil {
        return err
    }
    return xml.Unmarshal(b_config, &config)
}

```