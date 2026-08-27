import { useState } from 'react'
import { ProductList} from './components/productList'
import { BasketList } from './components/basketList'
import type { Basket, Product } from './helpers/types'
import { Toaster, toast } from 'react-hot-toast';
import './App.css'

function App() {
  const [products] = useState<Product[]>([
    {id : 101, name : "iPhone 17 Pro", price : 1099, picture : "https://www.apple.com/v/iphone/home/cj/images/overview/select/iphone_17pro__t1j902iw6kya_large.jpg"},
    {id : 102, name : "iPhone Air", price : 999, picture : "https://www.apple.com/v/iphone/home/cj/images/overview/select/iphone_air__b5qmgl05ojyq_large.jpg"},
    {id : 103, name : "iPhone 17", price : 799, picture : "https://www.apple.com/v/iphone/home/cj/images/overview/select/iphone_17__fb1277oq3eaa_large.jpg"},
    {id : 104, name : "iPhone 17e", price : 599, picture : "https://www.apple.com/v/iphone/home/cj/images/overview/select/iphone_17e__cq5ygzct314y_large.jpg"},
    {id : 105, name : "iPhone 16", price : 699, picture: "https://www.apple.com/v/iphone/home/cj/images/overview/select/iphone_16__b6tkv86m2gc2_large.jpg"},
    {id : 106, name : "iPad Pro", price : 1199, picture: "https://www.apple.com/assets-www/en_WW/ipad/03_product_tile/large/ipad_pro_b15908d8a.png"},
    {id : 107, name : "iPad Air", price : 749, picture: "https://www.apple.com/assets-www/en_WW/ipad/03_product_tile/large/ipad_air_000dd2f9c.png"},
    {id : 108, name : "iPad", price : 449, picture : "https://www.apple.com/assets-www/en_WW/ipad/03_product_tile/large/ipad_07e11a653.png"},
    {id : 109, name : 'iPad mini', price : 599, picture : "https://www.apple.com/assets-www/en_WW/ipad/03_product_tile/large/ipad_mini_cde3db6eb.png"},
    {id : 110, name : "MacBook Pro", price : 1999, picture : "https://www.apple.com/assets-www/en_WW/mac/04_product_tile/large/mbp_14_16_fa5e3a2b2.jpg"},
    {id : 111, name : "MacBook Air", price : 1299, picture : "https://www.apple.com/assets-www/en_WW/mac/04_product_tile/large/mba_13_15_e733a3435.jpg"},
    {id : 112, name : "MacBook Neo", price : 699, picture : "https://www.apple.com/assets-www/en_WW/mac/04_product_tile/large/mbn_37b3fdaaf.jpg"}
    ]);

  const [basket, setBasket] = useState<Basket[]>([]); 
  
  const [showBasket, setShowBasket] = useState(false);

  const moveToBasket = (product: Product):void => {
    const productExist = basket.find(item => item.id === product.id);
    if (productExist) {
      productExist.quantity++;
      toast.success(`Product ${productExist.name} successfully added to Basket`)
      setBasket([...basket]);
    } else {
      toast.success(`Product ${product.name} Successfully added to Basket`);
      setBasket([...basket, {...product, quantity : 1}])
    }
  }

  const deleteFromBasket = (id : number): void => {
    const item = basket.find(item => item.id === id);

    setBasket(basket.filter(item => item.id !== id));

    if (item) {
      toast.success(`${item.name} was removed from your cart.`);
    }
  }

  const quantityUp = (id : number) => {
    const productExist = basket.find(item => item.id ===id);
    if (productExist) {
      productExist.quantity++;
      toast.success(`You added 1 more ${productExist.name} to your cart.`)
      setBasket([...basket]);
    } else {
      return basket;
    }
  }

  const quantityDown = (id : number) => {
    const productExist = basket.find(item => item.id === id);
    if (productExist && productExist.quantity > 1) {
        productExist.quantity--;

        toast.success(`You removed 1 ${productExist.name} from your cart.`);

        setBasket([...basket]);
    }
  }

  const checkout = () => {
    toast.success(`Checkout logic will be soon`);
  }
  
  return (
    <div> 
      <Toaster />
      <h1>iTech Store</h1>
      <button type="button" onClick={() => setShowBasket(!showBasket)}>
        {showBasket ? 'Show products' : `Show Basket`}
      </button>

      {showBasket ? (
        <BasketList 
        items={basket}
        deleteElement={deleteFromBasket}
        productUp={quantityUp}
        productDown={quantityDown}
        onCheckout={checkout}
        />
      ) : (
        <ProductList
        products={products}
        onMove={moveToBasket}
        />
      )}
    </div>
  )
}


export default App