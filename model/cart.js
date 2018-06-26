module.exports=function Cart(oldCart){
    this.items = oldCart.items || {};
    
   

    this.add = function(item, id){
        
        var storedItem = this.items[id]; 
        
        if(!storedItem){
            storedItem = this.items[id] = {item: item, qty: 0, price: 0};
            //console.log(storedItem);
        };
        storedItem.qty++;
        if(storedItem.item.saleOff) {
            storedItem.price = storedItem.item.saleOff * storedItem.qty;
        }else {
            storedItem.price = storedItem.item.price * storedItem.qty;
        }
        
        
        
        //console.log(storedItem);
        //this.totalPrice+=storedItem.item.price;

    };
    this.update=function(id , soluong){
        var storedItem = this.items[id];
        storedItem.qty= soluong;
        if(storedItem.item.saleOff) {
            storedItem.price = storedItem.item.saleOff * storedItem.qty;
        }else {
            storedItem.price = storedItem.item.price * storedItem.qty;
        }
        
        //this.totalPrice += storedItem.price
        
    }
    this.remove=function(id){
        this.totalPrice -= this.items[id].price;  
        delete this.items[id];
    }
    
    this.generateArray=function(){
        var arr=[];
        for(var id in this.items){
            arr.push(this.items[id]);
        }
        return arr;
    }
}