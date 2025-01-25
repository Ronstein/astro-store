import { itemsInCart } from '@/store';
import { CartCookiesClient } from '@/utils';
import { useStore } from '@nanostores/react';
import { useEffect } from 'react';

export const CartCounter = () => {

    const $itemsInCart = useStore(itemsInCart);

    useEffect(() => {
        const cart = CartCookiesClient.getCart();
        itemsInCart.set(cart.length);
    }, [])


    return (
        <a href="/cart" className="relative inline-block">
            {
                ($itemsInCart > 0) && (
                    <span className="absolute -top-2 -right-2 flex justify-center items-center bg-blue-600 text-white text-xs rounded-full w-5 h-5">
                        {$itemsInCart}
                    </span>
                )
            }
            <svg
                xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><g fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}><path d="M4 19a2 2 0 1 0 4 0a2 2 0 0 0-4 0"></path><path d="M12.5 17H6V3H4"></path><path d="m6 5l14 1l-.86 6.017M16.5 13H6m10 6h6m-3-3v6"></path></g>
            </svg>
        </a>
    )
}
