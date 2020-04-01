var check = function(list_no, name) {


    
    location.href = '/check?list_no='+list_no+'&name='+name;
    alert("맛점! "+name+" 가자~~");
}
   
var refresh = function() {
    location.href = '/';
}

var clean = function() {
    location.href = '/clean';
}


var add = function() {
    alert('준비중');
}

