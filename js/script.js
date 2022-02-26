$(function(){
    $(":submit").click(function(){
        var elmt=document.getElementById('form');
        domtoimage.toPng(elmt)
        .then(function(dataUrl){
            var img=new Image();
            img.src=dataUrl;
            document.body.appendChild(img);
        })
        .catch(function(error){
            console.error('error function', error);
        })
    });
});