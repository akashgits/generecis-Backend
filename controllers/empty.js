exports.postUser=(req,res,next)=>{
    const email=req.body.email;
    const pn=req.body.pn;
    const name=req.body.name;
    const id=Math.random();


    res.json({id,email,pn,name})

}