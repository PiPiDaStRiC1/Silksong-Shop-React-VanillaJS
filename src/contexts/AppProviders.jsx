import {CartProvider} from './CartProvider';
import {DataProvider} from './DataProvider';
import {UserProvider} from './UserProvider';
import {OrderProvider} from './OrderProvider';
import {WishListProvider} from './WishListProvider';

export const AppProviders = ({children}) => {
    return (
        <DataProvider>
            <CartProvider>
                <WishListProvider> 
                    <UserProvider>
                        <OrderProvider>
                            {children}
                        </OrderProvider>
                    </UserProvider>
                </WishListProvider>
            </CartProvider>
        </DataProvider> 
    )
}