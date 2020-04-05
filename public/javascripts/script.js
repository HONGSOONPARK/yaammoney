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
    var name = document.getElementById('name').value;
    if(name != ''){
        if(confirm('식당 : '+name+' 추가하시겠습니까?'))
            location.href = '/add?name='+name;
    }else{
        alert('이름 추가하세요');
    }
       
    
}

var drop = function(list_no) {
    location.href = '/drop?list_no='+list_no;
}