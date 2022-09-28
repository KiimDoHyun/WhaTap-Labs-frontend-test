TOKEN=XGJHUSQZTI2AVIENWA27HI5V
PCODE=5490
ADDRESS=https://api.whatap.io

echo "1. act_agent"
curl -w "\n" -H "x-whatap-pcode: $PCODE" -H "x-whatap-token: $TOKEN" "$ADDRESS/open/api/act_agent"

echo "2. inact_agent"
curl -w "\n" -H "x-whatap-pcode: $PCODE" -H "x-whatap-token: $TOKEN" "$ADDRESS/open/api/inact_agent"

echo "3. host"
curl -w "\n" -H "x-whatap-pcode: $PCODE" -H "x-whatap-token: $TOKEN" "$ADDRESS/open/api/host"

echo "4. cpucore"
curl -w "\n" -H "x-whatap-pcode: $PCODE" -H "x-whatap-token: $TOKEN" "$ADDRESS/open/api/cpucore"

echo "5. txcount"
curl -w "\n" -H "x-whatap-pcode: $PCODE" -H "x-whatap-token: $TOKEN" "$ADDRESS/open/api/txcount"

echo "6. tps"
curl -w "\n" -H "x-whatap-pcode: $PCODE" -H "x-whatap-token: $TOKEN" "$ADDRESS/open/api/tps"

echo "7. user"
curl -w "\n" -H "x-whatap-pcode: $PCODE" -H "x-whatap-token: $TOKEN" "$ADDRESS/open/api/user"

echo "8. actx"
curl -w "\n" -H "x-whatap-pcode: $PCODE" -H "x-whatap-token: $TOKEN" "$ADDRESS/open/api/actx"

echo "9. rtime"
curl -w "\n" -H "x-whatap-pcode: $PCODE" -H "x-whatap-token: $TOKEN" "$ADDRESS/open/api/rtime"

echo "10. cpu"
curl -w "\n" -H "x-whatap-pcode: $PCODE" -H "x-whatap-token: $TOKEN" "$ADDRESS/open/api/cpu"

echo "11. threadpool_active"
curl -w "\n" -H "x-whatap-pcode: $PCODE" -H "x-whatap-token: $TOKEN" "$ADDRESS/open/api/threadpool_active"

echo "12. threadpool_queue"
curl -w "\n" -H "x-whatap-pcode: $PCODE" -H "x-whatap-token: $TOKEN" "$ADDRESS/open/api/threadpool_queue"

echo "13. dbc_count"
curl -w "\n" -H "x-whatap-pcode: $PCODE" -H "x-whatap-token: $TOKEN" "$ADDRESS/open/api/dbc_count"

echo "14. dbc_active"
curl -w "\n" -H "x-whatap-pcode: $PCODE" -H "x-whatap-token: $TOKEN" "$ADDRESS/open/api/dbc_active"

echo "15. dbc_idle"
curl -w "\n" -H "x-whatap-pcode: $PCODE" -H "x-whatap-token: $TOKEN" "$ADDRESS/open/api/dbc_idle"

echo "16. exception"
curl -w "\n" -H "x-whatap-pcode: $PCODE" -H "x-whatap-token: $TOKEN" "$ADDRESS/open/api/json/exception/1539302400000/1539385200000"

echo "17-1. httpc"
curl -w "\n" -H "x-whatap-pcode: $PCODE" -H "x-whatap-token: $TOKEN" "$ADDRESS/open/api/json/httpc/1539302400000/1539385200000"

echo "17-2. httpc"
curl -w "\n" -H "x-whatap-pcode: $PCODE" -H "x-whatap-token: $TOKEN" "$ADDRESS/open/api/json/httpc/1543219200000/1543478400000/filter/host/127.0.0.1/port/10007"

echo "18. remote"
curl -w "\n" -H "x-whatap-pcode: $PCODE" -H "x-whatap-token: $TOKEN" "$ADDRESS/open/api/json/remote/1539302400000/1539385200000"

echo "19. sql"
curl -w "\n" -H "x-whatap-pcode: $PCODE" -H "x-whatap-token: $TOKEN" "$ADDRESS/open/api/json/sql/1539302400000/1539385200000"

echo "20. transaction"
curl -w "\n" -H "x-whatap-pcode: $PCODE" -H "x-whatap-token: $TOKEN" "$ADDRESS/open/api/json/transaction/1539302400000/1539385200000"

echo "21. thread_count"
curl -w "\n" -H "x-whatap-pcode: $PCODE" -H "x-whatap-token: $TOKEN" "$ADDRESS/open/api/json/thread_count/1539302400000/1539385200000"

echo "22. thread_daemon"
curl -w "\n" -H "x-whatap-pcode: $PCODE" -H "x-whatap-token: $TOKEN" "$ADDRESS/open/api/json/thread_daemon/1539302400000/1539385200000"

echo "23. thread_peak_count"
curl -w "\n" -H "x-whatap-pcode: $PCODE" -H "x-whatap-token: $TOKEN" "$ADDRESS/open/api/json/thread_peak_count/1539302400000/1539385200000"

echo "24. threadpool_active"
curl -w "\n" -H "x-whatap-pcode: $PCODE" -H "x-whatap-token: $TOKEN" "$ADDRESS/open/api/json/threadpool_active/1539302400000/1539385200000"

echo "25. threadpool_queue"
curl -w "\n" -H "x-whatap-pcode: $PCODE" -H "x-whatap-token: $TOKEN" "$ADDRESS/open/api/json/threadpool_queue/1539302400000/1539385200000"

echo "26. tx_caller"
curl -w "\n" -H "x-whatap-pcode: $PCODE" -H "x-whatap-token: $TOKEN" "$ADDRESS/open/api/json/tx_caller/1539302400000/1539385200000"

echo "27. tx_domain"
curl -w "\n" -H "x-whatap-pcode: $PCODE" -H "x-whatap-token: $TOKEN" "$ADDRESS/open/api/json/tx_domain/1539302400000/1539385200000"

echo "28. fullgclog"
curl -w "\n" -H "x-whatap-pcode: $PCODE" -H "x-whatap-token: $TOKEN" "$ADDRESS/open/api/json/fullgclog/1539302400000/1539385200000"

echo "29. project"
curl -w "\n" -H "x-whatap-pcode: $PCODE" -H "x-whatap-token: $TOKEN" "$ADDRESS/open/api/json/project"
# {"platform":"JAVA","createTime":"Tue Sep 18 08:34:27 GMT 2018","gatewayName":"Office-OTE","projectCode":3000000003,"status":"Subscribe","lastUpdatedTime":"Tue Sep 18 08:34:34 GMT 2018","name":"SEO_APM","productType":"APM"}

echo "30. visitor(5m)"
curl -w "\n" -H "x-whatap-pcode: $PCODE" -H "x-whatap-token: $TOKEN" "$ADDRESS/open/api/json/visitor_5m/1541635200000/1541721600000"

echo "31. visitor(hourly)"
curl -w "\n" -H "x-whatap-pcode: $PCODE" -H "x-whatap-token: $TOKEN" "$ADDRESS/open/api/json/visitor_h/1541635200000/1541721600000"

echo "32. visitor(daily)"
curl -w "\n" -H "x-whatap-pcode: $PCODE" -H "x-whatap-token: $TOKEN" "$ADDRESS/open/api/json/visitor_d/1541635200000/1541721600000"

#echo "$PCODE. projects"
#curl -w "\n" -H "x-whatap-token: $TOKEN" "$ADDRESS/open/api/json/projects"
#{"data":[{"groupName":"","projectCode":35,"projectName":"APM_TEST2","createTime":"2018-10-19 07:17:03.774","lastUpdatedTime":"2018-10-19 07:46:05.167","status":"subscribe","productType":"APM","platform":"JAVA","gatewayName":"LOCAL"},{"groupName":"","projectCode":1,"projectName":"APM_TEST","createTime":"2018-07-09 09:47:20.222","lastUpdatedTime":"2018-07-09 09:47:25.948","status":"subscribe","productType":"APM","platform":"JAVA","gatewayName":"LOCAL"},{"groupName":"","projectCode":2,"projectName":"INFRA_TEST","createTime":"2018-09-13 13:05:11.783","lastUpdatedTime":"2018-09-13 13:05:24.678","status":"subscribe","productType":"SMS","platform":"INFRA","gatewayName":"LOCAL"},{"groupName":"","projectCode":3,"projectName":"DB_TEST","createTime":"2018-10-17 06:45:30.352","lastUpdatedTime":"2018-10-17 06:45:37.255","status":"subscribe","productType":"DB","platform":"MYSQL","gatewayName":"LOCAL"},{"groupName":"","projectCode":36,"projectName":"INFRA_TEST2","createTime":"2018-10-19 07:17:15.056","lastUpdatedTime":"2018-10-19 08:10:58.863","status":"subscribe","productType":"SMS","platform":"INFRA","gatewayName":"LOCAL"}],"accountEmail":"admin@whatap.io","total":5}

echo "34. mau"
curl -w "\n" -H "x-whatap-token: $TOKEN" -H "x-whatap-pcode: $PCODE" "$ADDRESS/open/api/json/visitor_m/153881960000/154099799000"
#
#curl -w "\n" -H "x-whatap-pcode: $PCODE" -H "x-whatap-token: $TOKEN" "http://localhost:8080/open/json/host"
#curl -w "\n" -H "x-whatap-pcode: $PCODE" -H "x-whatap-token: $TOKEN" "http://localhost:8080/open/json/act_agent"
#curl -w "\n" -H "x-whatap-pcode: $PCODE" -H "x-whatap-token: $TOKEN" "http://localhost:8080/open/json/inact_agent"
#curl -w "\n" -H "x-whatap-pcode: $PCODE" -H "x-whatap-token: $TOKEN" "http://localhost:8080/open/json/cpucore"
#curl -w "\n" -H "x-whatap-pcode: $PCODE" -H "x-whatap-token: $TOKEN" "http://localhost:8080/open/json/infra_cpu"
#curl -w "\n" -H "x-whatap-pcode: $PCODE" -H "x-whatap-token: $TOKEN" "http://localhost:8080/open/json/infra_disk_iops"
#curl -w "\n" -H "x-whatap-pcode: $PCODE" -H "x-whatap-token: $TOKEN" "http://localhost:8080/open/json/infra_net_traffic"
#curl -w "\n" -H "x-whatap-pcode: $PCODE" -H "x-whatap-token: $TOKEN" "http://localhost:8080/open/json/infra_proc"
#curl -w "\n" -H "x-whatap-pcode: $PCODE" -H "x-whatap-token: $TOKEN" "http://localhost:8080/open/json/sm_servers"
#curl -w "\n" -H "x-whatap-pcode: $PCODE" -H "x-whatap-token: $TOKEN" "http://localhost:8080/open/json/sm"
#curl -w "\n" -H "x-whatap-pcode: $PCODE" -H "x-whatap-token: $TOKEN" "http://localhost:8080/open/json/noti_sm/1539302400000/1539385200000"

