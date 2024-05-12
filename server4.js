var express=require("express");
var fileupload=require("express-fileupload");
var path=require("path");
var mysql2=require("mysql2");
var app=express();
app.use(express.static("public"));
app.use(express.urlencoded(true));
app.use(fileupload());
const config={
    host:"127.0.0.1",
    user:"root",
    password:"13131313",
    database:"second",
    dateStrings:true,
   // timezone: 'ist'
    
}
var mysqldb=mysql2.createConnection(config);
mysqldb.connect(function(err){
    if(err==null)
    console.log("connected to database successfully");
else
console.log(err.message);
})
app.listen(2024,function(){
    console.log("server start");
})
app.get("/hello",function(request,response){
    response.send("Hi bhai");
    
})

app.get("/h",function(request,response){
    var filepath=__dirname+"/public/dashh_citizen.html";
    response.sendFile(filepath);
})
app.get("/ho",function(request,response){
    var filepath=__dirname+"/public/indexx.html";
    response.sendFile(filepath);
})
app.get("/hoe",function(request,response){
    var filepath=__dirname+"/public/dash_caretaker.html";
    response.sendFile(filepath);
})
app.post("/do-save",function(request,response){
    console.log(request.body);
   // response.send(request.body);
    var filename="nopic.jpg";
    if(request.files!=null)
    {
        var filename=request.body.email+"-"+request.files.ppic.name;
        var filepath=path.join(__dirname,"public","uploads",filename);
        request.files.ppic.mv(filepath);


    }
    var email=request.body.email;
    var name=request.body.name;
    var address=request.body.address;
    var state=request.body.state;
    var city=request.body.city;
    var mobile=request.body.mobile;

    mysqldb.query("insert into ccprofile values(?,?,?,?,?,?,?)",[email,name,address,state,city,mobile,filename],function(err){
if(err==null)
response.send("data saved");
else
response.send(err.message);
    })

})
app.get("/do-signup",function(request,response){
console.log("sign-in");
var eamil=request.query.email;
var pwd=request.query.pwd;
var cb=request.query.t;
mysqldb.query("insert into si values(?,?,?)",[eamil,pwd,cb],function(err){
    if(err==null)
    response.send("data save");
else 
response.send(err.message);
})
})
app.post("/do-update",function(request,response){
    console.log(request.body);
    // response.send(request.body);
     var filename="nopic.jpg";
     if(request.files!=null)
     {
         var filename=request.body.email+"-"+request.files.ppic.name;
         var filepath=path.join(__dirname,"public","uploads",filename);
         request.files.ppic.mv(filepath);
 
 
     }
     var emai=request.body.email;
     var nam=request.body.name;
     var addres=request.body.address;
     var stat=request.body.state;
     var cit=request.body.city;
     var mobil=request.body.mobile;
 
     mysqldb.query("update ccprofile set namee=?,address=?,state=?,city=?,mobile=?,picpath=? where emailid=?",[nam,addres,stat,cit,mobil,filename,emai],function(err,result){
 if(err==null)
 {
 if(result.affectedRows==1)
 response.send("data update");
    }
 else
 response.send(err.message);
     })
})
app.post("/savee",function(request,response){
    console.log(request.body);
   // response.send(request.body);
    
    var email=request.body.email;
    var combo=request.body.combo;
    var date=request.body.date;
    var other=request.body.other;
    

    mysqldb.query("insert into postreq values(?,?,?,curdate(),?)",[email,combo,date,other],function(err){
if(err==null)
response.send("data saved");
else
response.send(err.message);
    })

})
app.get("/do-login",function(request,resp){
    console.log(request.query);
    var email=request.query.email;
    var pwd=request.query.pwd;
    mysqldb.query("select combo from si where emailid=? and pssword=?",[email,pwd],function(err){
        //console.log(err.message);
    

        if(err==null)
       response.send("login succeesss");
        
         
    else
    resp.send(err.message);
    })
   })
   app.post("/do-change",function(request,response){
    var emailid=request.body.txtemail;
   var opwd=request.body.txtpwd;
    var npwd=request.body.txtpwd1;
    var cpwd=request.body.txtpwd2;
    if(npwd==cpwd)
    {
        mysqldb.query("update si set pssword=? where emailid=? and pssword=?",[npwd,emailid,opwd],function(err,result){
            if(err==null)
            {
                if(result.affectedRows==1)
                response.send("password changed..");
            else
            response.send("invalid id");
            }
            else
            response.send(err.message);
        })
    }
   })
app.all("/get-user-json1",function(request,response)
{
 var email=request.query.email;
 mysqldb.query("select * from ccprofile where emailid=?",[email],function(err,result)
 {
 //     if(result.length==1)
 //     {
 //     response.send("already exists");
     
 // }else 
 //     {
 //    response.send("its available");
 //     }

     if(err==null)
     {
   
       
          response.send(result);
     }
     else
     response.send(err.message);
 });
})
app.post("/do-send",function(request,response){
    console.log(request.body);
   // response.send(request.body);
    var filename="nopic.jpg";
    if(request.files!=null)
    {
        var filename=request.body.email+"-"+request.files.ppic.name;
        var filepath=path.join(__dirname,"public","uploads",filename);
        request.files.ppic.mv(filepath);


    }
    var email=request.body.email;
    var name=request.body.name;
    var contact=request.body.contact;
    var address=request.body.address;
    
    var city=request.body.city;
    var firm=request.body.firm;
    var since=request.body.since;
    var pets=request.body.pets;
   

    mysqldb.query("insert into takerprofile values(?,?,?,?,?,?,?,?,?)",[email,name,contact,address,city,firm,since,pets,filename],function(err){
if(err==null)
response.send("data saved");
else
response.send(err.message);
    })

})
app.post("/do-modify",function(request,response){
    console.log(request.body);
   // response.send(request.body);
    var filename="nopic.jpg";
    if(request.files!=null)
    {
        var filename=request.body.email+"-"+request.files.ppic.name;
        var filepath=path.join(__dirname,"public","uploads",filename);
        request.files.ppic.mv(filepath);


    }
    var email=request.body.email;
    var name=request.body.name;
    var contact=request.body.contact;
    var address=request.body.address;
    
    var city=request.body.city;
    var firm=request.body.firm;
    var since=request.body.since;
    var pets=request.body.pets;
   

    mysqldb.query("update takerprofile set name=?,contact=?,address=?,city=?,firm=?,since=?,pets=?,proofpic=? where emailid=?",[name,contact,address,city,firm,since,pets,filename,email],function(err){
if(err==null)
 //   if(result.affectedRows==1)
response.send("pass change");

else
response.send(err.message);
    })

})
app.all("/fetch-sf",function(request,response){
    var n=request.body.nw;
    var f=request.body.fc;
    mysqldb.query("select * from takerprofile where emailid=? and pets=? ",[n,f],function(err,result){
        if(err==null)
        response.send(result);
        else
        response.send(err.message);

    })

})
app.post("/dosubmit",function(request,response){
    console.log(request.body);
   // response.send(request.body);
   
    var review=request.body.review;
    

    mysqldb.query("insert into review values(?)",[review],function(err){
if(err==null)
response.send("data saved");
else
response.send(err.message);
    })

})