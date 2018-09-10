(function ($) {
    // Let's start writing AJAX calls!
// data=require("./data");
   
   /*$(".restaurant_list li").sort(sort_li) // sort elements
   .appendTo('.restaurant_list'); // append again to the list
// sort function callback
function sort_li(a, b){
return ($(b).data('rating')) < ($(a).data('rating')) ? 1 : -1;    
}*/

    ///11111111111///
    var myNewTaskForm = $("#sort-by-rating")
      
    myNewTaskForm.submit(function (event) {
        event.preventDefault();

      //  var newName = newNameInput.val();
        var newDescription = "Hardik";
        var newContent = $("#restaurants");

       
            var requestConfig = {
                method: "POST",
                url: "/restaurants/rating",
                contentType: 'application/json',
                data: JSON.stringify({
                    
                    description: newDescription,
                    testField: 12,
                    testBool: true
                })
            };

            $.ajax(requestConfig).then(function (responseMessage) {
                let str=""
                console.log( responseMessage.message[0].name);
             
                for(let i=0;i<responseMessage.message.length;i++)
                    {
                  str=str+"<div data-role=\"page\" id=\"pageone\">"
                  str=str+ "<div  data-role=\"main\" class=\"ui-content\">"
                  str=str+"<ul data-role=\"listview\" data-inset=\"true\">"
                  str=str+" <li>"
                  str=str+"<a href=\"/restaurants/"+responseMessage.message[i].id+"\">"
                  str=str+"<img src="+responseMessage.message[i].image_url+ " style=\"height: 250px; width : 33%\">"
                  str=str+ "<h2>"+responseMessage.message[i].name+"</h2></a><br></li></ul></div></div>"
                    }
                  //console.log(responseMessage.message[i])  
                newContent.html(str);
                //                alert("Data Saved: " + msg);
            });
        
    });
    //////////222
    
    
    var myNewTaskForm = $("#sort-by-high-price")
    
  myNewTaskForm.submit(function (event) {
      event.preventDefault();

    //  var newName = newNameInput.val();
      var newDescription = "Hardik";
      var newContent = $("#restaurants");

     
          var requestConfig = {
              method: "POST",
              url: "/restaurants/highprice",
              contentType: 'application/json',
              data: JSON.stringify({
                  
                  description: newDescription,
                  testField: 12,
                  testBool: true
              })
          };

          $.ajax(requestConfig).then(function (responseMessage) {
              let str=""
              console.log( responseMessage.message[0].name);
              /*<div data-role="page" id="pageone">
<div  data-role="main" class="ui-content">
  
  <ul data-role="listview" data-inset="true">
    <li>
      <a href="/restaurants/{{this.id}}">
      <img src={{this.image_url}} style="height: 250px; width : 33%">
      <h2>{{this.name}}</h2>
      </a>
   <br>
    </li>
  </ul>
</div>
</div> 
  */
              for(let i=0;i<responseMessage.message.length;i++)
                  {
                str=str+"<div data-role=\"page\" id=\"pageone\">"
                str=str+ "<div  data-role=\"main\" class=\"ui-content\">"
                str=str+"<ul data-role=\"listview\" data-inset=\"true\">"
                str=str+" <li>"
                str=str+"<a href=\"/restaurants/"+responseMessage.message[i].id+"\">"
                str=str+"<img src="+responseMessage.message[i].image_url+ " style=\"height: 250px; width : 33%\">"
                str=str+ "<h2>"+responseMessage.message[i].name+"</h2></a><br></li></ul></div></div>"
                  }
                //console.log(responseMessage.message[i])  
              newContent.html(str);
              //                alert("Data Saved: " + msg);
          });
      
  });
  ////3333
  var myNewTaskForm = $("#sort-by-medium-price")
  
myNewTaskForm.submit(function (event) {
    event.preventDefault();

  //  var newName = newNameInput.val();
    var newDescription = "Hardik";
    var newContent = $("#restaurants");

   
        var requestConfig = {
            method: "POST",
            url: "/restaurants/mediumprice",
            contentType: 'application/json',
            data: JSON.stringify({
                
                description: newDescription,
                testField: 12,
                testBool: true
            })
        };

        $.ajax(requestConfig).then(function (responseMessage) {
            let str=""
            console.log( responseMessage.message[0].name);
           
            for(let i=0;i<responseMessage.message.length;i++)
                {
              str=str+"<div data-role=\"page\" id=\"pageone\">"
              str=str+ "<div  data-role=\"main\" class=\"ui-content\">"
              str=str+"<ul data-role=\"listview\" data-inset=\"true\">"
              str=str+" <li>"
              str=str+"<a href=\"/restaurants/"+responseMessage.message[i].id+"\">"
              str=str+"<img src="+responseMessage.message[i].image_url+ " style=\"height: 250px; width : 33%\">"
              str=str+ "<h2>"+responseMessage.message[i].name+"</h2></a><br></li></ul></div></div>"
                }
              //console.log(responseMessage.message[i])  
            newContent.html(str);
            //                alert("Data Saved: " + msg);
        });
    
});
////444
var myNewTaskForm = $("#sort-by-low-price")

myNewTaskForm.submit(function (event) {
  event.preventDefault();

//  var newName = newNameInput.val();
  var newDescription = "Hardik";
  var newContent = $("#restaurants");

 
      var requestConfig = {
          method: "POST",
          url: "/restaurants/lowprice",
          contentType: 'application/json',
          data: JSON.stringify({
              
              description: newDescription,
              testField: 12,
              testBool: true
          })
      };

      $.ajax(requestConfig).then(function (responseMessage) {
          let str=""
          console.log( responseMessage.message[0].name);
         
          for(let i=0;i<responseMessage.message.length;i++)
              {
            str=str+"<div data-role=\"page\" id=\"pageone\">"
            str=str+ "<div  data-role=\"main\" class=\"ui-content\">"
            str=str+"<ul data-role=\"listview\" data-inset=\"true\">"
            str=str+" <li>"
            str=str+"<a href=\"/restaurants/"+responseMessage.message[i].id+"\">"
            str=str+"<img src="+responseMessage.message[i].image_url+ " style=\"height: 250px; width : 33%\">"
            str=str+ "<h2>"+responseMessage.message[i].name+"</h2></a><br></li></ul></div></div>"
              }
            //console.log(responseMessage.message[i])  
          newContent.html(str);
          //                alert("Data Saved: " + msg);
      });
  
});
})(window.jQuery);