import {CartProvider} from './CartProvider';
import {DataProvider} from './DataProvider';
import {UserProvider} from './UserProvider';
import {OrderProvider} from './OrderProvider';
import {WishListProvider} from './WishListProvider';

export const AppProviders = ({children}) => {
    return (
        <UserProvider>
            <DataProvider>
                <CartProvider>
                    <OrderProvider>
                        <WishListProvider> 
                            {children}
                        </WishListProvider>
                    </OrderProvider>
                </CartProvider>
            </DataProvider>
        </UserProvider>  
    )
}