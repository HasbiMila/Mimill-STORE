const express = require("express");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const app = express();
const PORT = process.env.PORT || 3000;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

const DATA = path.join(__dirname, "data");
const UPLOADS = path.join(__dirname, "uploads");
fs.mkdirSync(DATA,{recursive:true}); fs.mkdirSync(UPLOADS,{recursive:true});

app.use(express.json({limit:"2mb"}));
app.use(express.urlencoded({extended:true}));
app.use("/uploads", express.static(UPLOADS));
app.use("/", express.static(path.join(__dirname,"customer")));
app.use("/admin", express.static(path.join(__dirname,"admin")));

function read(name){return JSON.parse(fs.readFileSync(path.join(DATA,name),"utf8"))}
function write(name,data){fs.writeFileSync(path.join(DATA,name),JSON.stringify(data,null,2))}
function auth(req,res,next){if(req.headers["x-admin-password"]!==ADMIN_PASSWORD)return res.status(401).json({error:"Password admin salah"});next()}

const storage=multer({storage:multer.diskStorage({
 destination:(req,file,cb)=>cb(null,UPLOADS),
 filename:(req,file,cb)=>cb(null,Date.now()+"-"+file.originalname.replace(/[^a-zA-Z0-9._-]/g,"_"))
})});
app.get("/api/catalog",(req,res)=>res.json({products:read("products.json"),settings:read("settings.json")}));
app.post("/api/products",auth,(req,res)=>{
 const products=read("products.json"); const p={...req.body,id:Date.now(),price:Number(req.body.price||0),image:req.body.image||""};
 products.unshift(p); write("products.json",products); res.json(p);
});
app.put("/api/products/:id",auth,(req,res)=>{
 const products=read("products.json"); const i=products.findIndex(p=>p.id==req.params.id);
 if(i<0)return res.status(404).json({error:"Produk tidak ditemukan"});
 products[i]={...products[i],...req.body,price:Number(req.body.price||products[i].price)}; write("products.json",products); res.json(products[i]);
});
app.delete("/api/products/:id",auth,(req,res)=>{
 write("products.json",read("products.json").filter(p=>p.id!=req.params.id)); res.json({ok:true});
});
app.post("/api/settings",auth,(req,res)=>{write("settings.json",{...read("settings.json"),...req.body});res.json(read("settings.json"))});
app.post("/api/upload",auth,storage.single("image"),(req,res)=>res.json({url:"/uploads/"+req.file.filename}));
app.listen(PORT,()=>console.log(`HPKU running at http://localhost:${PORT} | admin: /admin`));
