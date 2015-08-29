var Test=require('./verbal.model');
var fs=require('fs');


module.exports=function(){
  fs.readFile('./question.json',function(err,data){
    if(err){
      return console.log(err);
    }
    var models=JSON.parse(data.toString());
    //console.log(JSON.stringify(models,null,4));
    for(var i=0;i<models.length;i++){
      var model=new Test(models[i]);
      //console.log(model);
      model.save(function(err,model){
        console.log(err);
        if(err)console.log(err);
        console.log("Saved : ",JSON.stringify(model,null,4));
      });
    }
  });
};
