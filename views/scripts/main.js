$(document).ready(function(){
    $('.tag').on('click', (tag)=>{
        $(tag.target).toggleClass("enabled");
        $(tag.target).toggleClass("disabled");
    });
});

function search(){
    var data = {};
    data.term = $("#search")[0].textContent;
    data.sections = [];
    for(var i=0;i<$(".disabled").length;i++){
        data.sections.push($(".disabled")[i].textContent)
    }
    
    $.ajax({ 
        url: `/api/dir/${JSON.stringify(data)}`,
        type: 'GET', 
        success: function(items){
            console.log(items);
            Object.keys(items).forEach(function(name){
                $("#list").append(`<div>${name}</div>`)
            })
        }
        , error: function(jqXHR, textStatus, err){
            alert('text status '+textStatus+', err '+err)
        }
    })
}